import { FileHelper, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

// StartOS-managed settings for the few knobs that have to be set from the StartOS
// UI rather than inside Satori. Everything else Satori can configure (relays, DM
// relays, media servers, theme, Privacy Mode, content prefs, search) lives in
// Satori's own in-app Settings and is written into the data volume by the app — we
// deliberately don't duplicate those here.
//
//   owner   - SATORI_OWNER: the npub allowed to sign in (locks ownership before the
//             .onion is reachable, instead of relying on first-sign-in-claims).
//   allowed - SATORI_ALLOWED_PUBKEYS: additional comma-separated npubs/hex allowed in.
//   tz      - TZ: the container timezone. StartOS can't bind the host's /etc/localtime,
//             so without this the box is UTC; Satori parses scheduled-post local times
//             against this zone.
//
// The two access fields are optional (undefined → first sign-in claims ownership, the
// upstream default). tz defaults to UTC. These are read in main.ts and injected as env;
// the input Actions (startos/actions) write this file, and the reactive read in main.ts
// restarts the daemon so changes take effect.
const shape = z.object({
  owner: z.string().optional().catch(undefined),
  allowed: z.string().optional().catch(undefined),
  tz: z.string().catch('UTC'),
})

export type Settings = z.infer<typeof shape>

export const settingsFile = FileHelper.json(
  { base: sdk.volumes.main, subpath: './startos-settings.json' },
  shape,
)
