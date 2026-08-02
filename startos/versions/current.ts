import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.7.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.7.0 (and picks up v0.6.4). You can now delete your ' +
      'own posts (NIP-09): every post of yours carries a trash glyph with an inline ' +
      'confirm, and deletion requests from others are honored when reading, so deleted ' +
      'events stop rendering forever from caches. Relays introduce themselves ' +
      '(NIP-11) — settings rows, the browse picker, and relay timelines show each ' +
      "relay's own name and description, with auth/paid chips and a search capability " +
      'gate. Unknown event kinds show their alt text (NIP-31). Write-only blast relays ' +
      'are detected and routed around instead of silently eating reads. Also fixes ' +
      'NIP-54 wiki slugs for non-Latin titles, poll-vote inflation, sealed-DM seal ' +
      'verification, and a bug where a timed-out list read could let a follow or ' +
      'bookmark toggle wipe the whole list. No packaging changes — same env, port, ' +
      'volume, and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.7.0 adds on-disk state (persisted deletion tombstones)
    // additively — it reads existing /app/.data content the same way and creates the
    // new files itself. Nothing to migrate.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
