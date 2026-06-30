import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.3.0 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.3.1 features only add files under /app/.data, which is additive.
export const v0_3_0 = VersionInfo.of({
  version: '0.3.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.3.0: NIP-22 comments, per-post relay targeting, ' +
      'relay timelines, and scheduling for articles and quote reposts.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
