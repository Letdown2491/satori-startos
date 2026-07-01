import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.3.1 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.4.0 features only add files under /app/.data, which is additive.
export const v0_3_1 = VersionInfo.of({
  version: '0.3.1:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.3.1: custom NIPs (kind 30817) render as full ' +
      'articles, and engagement state (replies, reposts, likes) is now correct on ' +
      'every addressable event kind.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
