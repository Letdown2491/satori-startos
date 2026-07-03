import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.5.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.5.0: custom timelines for any content type via the ' +
      'header switcher, per-post relay targeting in the Poll/Article/Picture composers, ' +
      'scheduled picture posts, and faster Following-feed painting with adaptive ' +
      'per-relay timeouts. Security hardening: /metrics is now owner-only (uses the ' +
      'existing SATORI_OWNER), zap receipts are signature-verified, nsec references are ' +
      'redacted, and logout isolates per-account caches. No packaging changes — same ' +
      'env, port, volume, and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.5.0 adds no new on-disk data shape. New features (custom
    // timelines, per-post relay targeting, scheduled pictures, the feedRecovery metric)
    // read/write additively under /app/.data and are covered by backups. The owner-only
    // /metrics gate reuses the already-wired SATORI_OWNER env — no new config.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
