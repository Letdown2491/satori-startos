import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.4.1 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.4.2 additions land additively under /app/.data.
export const v0_4_1 = VersionInfo.of({
  version: '0.4.1:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.4.1: a maintenance fix that restores the "Picture" ' +
      'composer tab (NIP-68) on the Article screen by rendering all four compose tabs ' +
      'from a single shared helper.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
