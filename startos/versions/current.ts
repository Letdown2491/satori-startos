import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.4.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.4.0: picture events (NIP-68), read-only git ' +
      'repositories (NIP-34), and wiki articles (NIP-54) now render as first-class ' +
      'content, plus relay-discovery learning that persists across restarts and NIP ' +
      'compliance fixes. No packaging changes — same env, port, volume, and Tor ' +
      'dependency.',
  },
  migrations: {
    // No data migration: v0.4.0 is feature-only upstream and adds no new on-disk data
    // shape; anything new (e.g. the persisted relay-discovery cache) lands additively
    // under /app/.data and is covered by backups.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
