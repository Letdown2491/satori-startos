import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.6.2 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.6.3 changes are performance optimizations only.
export const v0_6_2 = VersionInfo.of({
  version: '0.6.2:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.6.2: the feed no longer comes back empty after your ' +
      'computer sleeps. When a laptop suspends, its relay connections die quietly, and ' +
      'Satori kept using those dead connections on wake, so pages loaded blank and ' +
      "Private relay's Fetch missing pulled nothing; Satori now notices the gap and " +
      'reopens fresh connections as soon as you are back. Private relay in Only mode ' +
      'with Fetch missing on also now fills every gap in a batch instead of stopping ' +
      'short when the private relay holds only some of the notes.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
