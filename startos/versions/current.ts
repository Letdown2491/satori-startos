import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.6.2:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.6.2: the feed no longer comes back empty after your ' +
      'computer sleeps. When a laptop suspends, its relay connections die quietly, and ' +
      'Satori kept using those dead connections on wake, so pages loaded blank and ' +
      "Private relay's Fetch missing pulled nothing; Satori now notices the gap and " +
      'reopens fresh connections as soon as you are back. Private relay in Only mode ' +
      'with Fetch missing on also now fills every gap in a batch instead of stopping ' +
      'short when the private relay holds only some of the notes. No packaging changes ' +
      '— same env, port, volume, and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.6.2 is a client-side connection-handling fix with no on-disk
    // data shape change. It reads/renders existing /app/.data content the same way —
    // nothing to migrate.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
