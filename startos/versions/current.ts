import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.4.1:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.4.1: a maintenance fix that restores the "Picture" ' +
      'composer tab (NIP-68) on the Article screen by rendering all four compose tabs ' +
      'from a single shared helper. No packaging changes — same env, port, volume, and ' +
      'Tor dependency.',
  },
  migrations: {
    // No data migration: v0.4.1 is a UI-only upstream fix with no new on-disk data shape.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
