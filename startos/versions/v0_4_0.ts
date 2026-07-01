import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.4.0 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.4.1 fix is UI-only upstream and adds no new on-disk data.
export const v0_4_0 = VersionInfo.of({
  version: '0.4.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.4.0: picture events (NIP-68), read-only git ' +
      'repositories (NIP-34), and wiki articles (NIP-54) now render as first-class ' +
      'content, plus relay-discovery learning that persists across restarts and NIP ' +
      'compliance fixes.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
