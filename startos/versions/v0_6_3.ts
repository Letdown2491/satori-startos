import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.6.3 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; v0.7.0 adds new on-disk state (deletion tombstones) but only additively.
export const v0_6_3 = VersionInfo.of({
  version: '0.6.3:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.6.3: a performance-focused release that makes pages ' +
      'load faster and lighter with no new features. Pages and partial updates are now ' +
      'gzip-compressed on the wire, single-note lookups return on the first relay to ' +
      'answer instead of waiting for all of them, and notifications and search start up ' +
      'faster via parallel relay lookups. Quoted articles and wiki pages now cache like ' +
      'quoted notes, and styles and scripts revalidate cheaply with ETags. Also fixes ' +
      'Tor sidecar connectivity, avatar-cache growth, NIP-40 expiration handling, and ' +
      'NIP-37 draft relay encryption.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
