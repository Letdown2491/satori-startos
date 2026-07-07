import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.6.1 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.6.2 fixes are client-side connection handling only.
export const v0_6_1 = VersionInfo.of({
  version: '0.6.1:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.6.1: article timelines are ordered by publish date ' +
      'again. Long-form posts (articles, wikis, custom NIPs) were sorting by last-edit ' +
      'time, so re-saved or re-broadcast old posts jumped to the top of the feed while ' +
      'still showing their original dates; feeds and profiles now sort them by publish ' +
      'date. Regular notes are unaffected.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
