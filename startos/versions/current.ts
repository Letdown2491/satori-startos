import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// StartOS version = <upstream semver>:<package revision>. Bump the revision for
// packaging-only changes; bump the semver to track an upstream Satori release.
export const current = VersionInfo.of({
  version: '0.6.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.6.0: private relay support (point Satori at one ' +
      'personal ws://, wss://, or .onion relay via Settings > Relays, with NIP-42 auth ' +
      'and Add/Only routing modes), Following feeds that route around dead relays, a ' +
      'restructured two-pane Relays settings hub (Search relays moved under Relays > ' +
      'Search), and a Pictures timeline on by default. Bookmarks and pins now remember ' +
      "each note's author and where it was seen so they survive notes leaving their " +
      'relays. No packaging changes — same env, port, volume, and Tor dependency.',
  },
  migrations: {
    // No data migration: v0.6.0 adds no new on-disk data shape. New features (private
    // relay config, the Pictures timeline, richer bookmark/pin metadata) read/write
    // additively under /app/.data and are covered by backups. Bookmarks saved before
    // this release stored only the note id, so upstream may not resolve all of them —
    // that is client/relay-side, not something the package can migrate.
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
