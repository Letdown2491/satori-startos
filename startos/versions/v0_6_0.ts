import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

// Prior release, kept in the version graph (versions/index.ts `other`) so an installed
// 0.6.0 has a declared edge to the current version. No data shape changed, so its `up`
// is a no-op; the v0.6.1 fix is client-side only and lands additively under /app/.data.
export const v0_6_0 = VersionInfo.of({
  version: '0.6.0:0',
  releaseNotes: {
    en_US:
      'Tracks upstream Satori v0.6.0: private relay support (point Satori at one ' +
      'personal ws://, wss://, or .onion relay via Settings > Relays, with NIP-42 auth ' +
      'and Add/Only routing modes), Following feeds that route around dead relays, a ' +
      'restructured two-pane Relays settings hub (Search relays moved under Relays > ' +
      'Search), and a Pictures timeline on by default. Bookmarks and pins now remember ' +
      "each note's author and where it was seen so they survive notes leaving their " +
      'relays.',
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
