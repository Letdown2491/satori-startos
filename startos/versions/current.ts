import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.3.1:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.3.1: custom NIPs (kind 30817) render as full ' +
      'articles, and engagement state (replies, reposts, likes) is now correct on ' +
      'every addressable event kind. No packaging changes — same env, port, volume, ' +
      'and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.3.1 is feature-only upstream and adds no new on-disk
    // data shape; anything new lands additively under /app/.data and is covered by backups.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
