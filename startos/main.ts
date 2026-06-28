import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'
import { settingsFile } from './fileModels/settings'

export const main = sdk.setupMain(async ({ effects }) => {
  console.info(i18n('Starting Satori!'))

  // Seed the StartOS-managed settings file with defaults on first boot, then read it
  // reactively. Changing Access Control / Timezone (the input actions) rewrites this
  // file, which re-runs setupMain and restarts the daemon so the new env takes effect.
  await settingsFile.merge(effects, {}).catch(() => {})
  const settings = await settingsFile.read().const(effects)
  const tz = settings?.tz?.trim() || 'UTC'
  const owner = settings?.owner?.trim()
  const allowed = settings?.allowed?.trim()

  const accessEnv: Record<string, string> = {}
  if (owner) accessEnv.SATORI_OWNER = owner
  if (allowed) accessEnv.SATORI_ALLOWED_PUBKEYS = allowed

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'satori' },
      // Satori writes all its state under <cwd>/.data; the command below pins cwd to
      // /app, so that's /app/.data. Mount the volume there to persist sessions, the
      // owner claim, caches, drafts and scheduled posts. Writes are plain writeFileSync
      // (no cross-mount rename), so mounting at the data dir itself is safe.
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/app/.data',
        readonly: false,
      }),
      'satori-sub',
    ),
    // Pin cwd to /app via `sh -c` (matching the upstream Dockerfile's WORKDIR) so
    // Satori's cwd-relative .data path is deterministic regardless of the subcontainer
    // default working directory. `exec` replaces the shell so signals reach Node.
    exec: {
      command: [
        'sh',
        '-c',
        'cd /app && exec node --experimental-strip-types src/server.ts',
      ],
      env: {
        HOST: '0.0.0.0',
        PORT: String(uiPort),
        // StartOS provides the inbound .onion automatically. This is Satori's OUTBOUND
        // Tor — .onion relays and Privacy Mode — routed through the host Tor SOCKS proxy.
        TOR_SOCKS: 'socks5h://tor.startos:9050',
        TZ: tz,
        ...accessEnv,
      },
    },
    ready: {
      display: i18n('Web Interface'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: i18n('The web interface is ready'),
          errorMessage: i18n('The web interface is not ready'),
        }),
    },
    requires: [],
  })
})
