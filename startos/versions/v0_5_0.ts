import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.5.0 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.6.0 additions land additively under /app/.data.
export const v0_5_0 = VersionInfo.of({
  version: '0.5.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.5.0: custom timelines for any content type via the ' +
      'header switcher, per-post relay targeting in the Poll/Article/Picture composers, ' +
      'scheduled picture posts, and faster Following-feed painting with adaptive ' +
      'per-relay timeouts. Security hardening: /metrics is now owner-only (uses the ' +
      'existing SATORI_OWNER), zap receipts are signature-verified, nsec references are ' +
      'redacted, and logout isolates per-account caches.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
