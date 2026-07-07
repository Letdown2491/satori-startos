import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.6.1:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.6.1: article timelines are ordered by publish date ' +
      'again. Long-form posts (articles, wikis, custom NIPs) were sorting by last-edit ' +
      'time, so re-saved or re-broadcast old posts jumped to the top of the feed while ' +
      'still showing their original dates; feeds and profiles now sort them by publish ' +
      'date. Regular notes are unaffected. No packaging changes — same env, port, ' +
      'volume, and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.6.1 is a client-side sort fix with no on-disk data shape
    // change. It reads/renders existing /app/.data content the same way — nothing to
    // migrate.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
