import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.3.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.3.0: NIP-22 comments, per-post relay targeting, ' +
      'relay timelines, and scheduling for articles and quote reposts. No packaging ' +
      'changes — same env, port, volume, and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.3.0 only adds files under /app/.data (e.g. relay-feeds.json),
    // which is additive and already covered by backups.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
