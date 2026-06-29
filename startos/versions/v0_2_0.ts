import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.2.0 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the new 0.3.0 features only add files under /app/.data, which is additive.
export const v0_2_0 = VersionInfo.of({
  version: '0.2.0:0',
  releaseNotes: {
    en_US: 'Initial StartOS packaging of Satori (tracks upstream v0.2.0).',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
