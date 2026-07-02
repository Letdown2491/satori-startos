import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.4.2:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.4.2: relay latency profiling (records per-relay ' +
      'response times additively under /app/.data), the Commons trending timeline is ' +
      'removed, the header title becomes a navigation dropdown on every page, plus ' +
      'article-rendering and draft-syncing fixes. No packaging changes — same env, ' +
      'port, volume, and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.4.2 adds no new on-disk data shape; the relay-latency
    // profile (.data/relay-latency.json) is additive under /app/.data and covered by
    // backups. The removed Commons timeline drops cached pages, not persisted user data.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
