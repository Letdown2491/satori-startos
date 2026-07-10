import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.6.3:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.6.3: a performance-focused release that makes pages ' +
      'load faster and lighter with no new features. Pages and partial updates are now ' +
      'gzip-compressed on the wire, single-note lookups return on the first relay to ' +
      'answer instead of waiting for all of them, and notifications and search start up ' +
      'faster via parallel relay lookups. Quoted articles and wiki pages now cache like ' +
      'quoted notes, and styles and scripts revalidate cheaply with ETags. Also fixes ' +
      'Tor sidecar connectivity, avatar-cache growth, NIP-40 expiration handling, and ' +
      'NIP-37 draft relay encryption. No packaging changes — same env, port, volume, ' +
      'and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.6.3 is a performance/caching release with no on-disk data
    // shape change. It reads/renders existing /app/.data content the same way — nothing
    // to migrate.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
