import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.4.2 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.5.0 additions land additively under /app/.data.
export const v0_4_2 = VersionInfo.of({
  version: '0.4.2:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.4.2: relay latency profiling (records per-relay ' +
      'response times additively under /app/.data), the Commons trending timeline is ' +
      'removed, the header title becomes a navigation dropdown on every page, plus ' +
      'article-rendering and draft-syncing fixes.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
