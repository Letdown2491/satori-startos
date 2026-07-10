# Changelog

All notable changes to the Satori StartOS package are documented here. This project
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

Changes for the next release accumulate here.

## [0.6.3] - 2026-07-09

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.6.3`. This is an
upstream performance-focused release; the StartOS packaging is unchanged (same env, port
`8787`, `/app/.data` volume, and `tor` dependency). Existing installs upgrade in place —
the changes are performance and caching optimizations with no on-disk data shape change,
so no migration is needed.

### Changed
- Bumped the bundled Satori source to `v0.6.3` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.6.3)
- **Pages load faster and lighter.** Pages and partial updates are now gzip-compressed on
  the wire, cutting feed and thread HTML significantly. Styles and scripts revalidate
  cheaply with ETags, and quoted articles and wiki pages now cache like quoted notes.
- **Relay lookups return sooner.** Single-note lookups return on the first relay to answer
  instead of waiting for all of them, and notifications and search start up faster via
  parallel relay lookups. Users without a published relay list no longer cause slowdowns —
  the "asked, found none" result is cached for an hour.
- **Fixes.** Tor sidecar connectivity restoration, avatar-cache growth containment, relay
  rejection logging, a rendering freeze, cache write durability, NIP-40 expiration
  handling, and NIP-37 draft relay encryption compliance.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.6.3/CHANGELOG.md)
for the full list.

## [0.6.2] - 2026-07-07

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.6.2`. This is an
upstream bug-fix release; the StartOS packaging is unchanged (same env, port `8787`,
`/app/.data` volume, and `tor` dependency). Existing installs upgrade in place — the fixes
are client-side connection handling with no on-disk data shape change, so no migration is
needed.

### Changed
- Bumped the bundled Satori source to `v0.6.2` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.6.2)
- **The feed no longer comes back empty after your computer sleeps.** When a laptop
  suspends, its connections to relays die quietly, and Satori kept trying to use those
  dead connections after waking, so pages loaded blank and Private relay's Fetch missing
  pulled nothing from your normal relays. Satori now notices the gap and reopens fresh
  connections as soon as you're back, so the feed fills in like usual.
- **Private relay in Only mode with Fetch missing on now fills every gap in a batch.**
  Opening a set of bookmarks would stop short if your private relay held even one of them,
  leaving the rest blank. It now fetches whichever ones your private relay is missing from
  your normal relays.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.6.2/CHANGELOG.md)
for the full list.

## [0.6.1] - 2026-07-06

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.6.1`. This is an
upstream bug-fix release; the StartOS packaging is unchanged (same env, port `8787`,
`/app/.data` volume, and `tor` dependency). Existing installs upgrade in place — the fix
is a client-side sort change with no on-disk data shape change, so no migration is needed.

### Changed
- Bumped the bundled Satori source to `v0.6.1` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.6.1)
- **Article timelines sort by publish date again** — long-form posts (articles, wikis,
  custom NIPs) carry both a first-published date and a last-edited date. The timeline was
  sorting by last edit, so when someone re-saved or re-broadcast a batch of old articles
  those posts jumped to the top of the feed while still showing their original dates.
  Feeds and profiles now sort long-form posts by their publish date, so they land where
  their dates say they should. Regular notes are unaffected.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.6.1/CHANGELOG.md)
for the full list.

## [0.6.0] - 2026-07-06

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.6.0`. This is an
upstream feature-and-reliability release; the StartOS packaging is unchanged (same env,
port `8787`, `/app/.data` volume, and `tor` dependency). Existing installs upgrade in
place — the new features read and write additively under `/app/.data`, so no migration is
needed.

### Changed
- Bumped the bundled Satori source to `v0.6.0` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.6.0)
- **Private relay** — in Settings > Relays you can point Satori at one personal relay of
  your own (an aggregator, outbox, or blaster) by `ws://`, `wss://`, or `.onion` URL, with
  a live reachability status line. Read/Write each toggle between `Add` (use it alongside
  your normal relays) and `Only` (route exclusively through it, skipping the outbox and
  your NIP-65 relays). It stays private and is never published to your relay list. NIP-42
  auth works on both signing families (bunker authenticates itself; a browser extension
  prompts an `Authenticate` click). In `Only` mode an off-by-default `Fetch missing` toggle
  fills gaps (profiles, quoted notes, reply avatars) from your normal relays.
- **Following feeds route around dead relays** — Satori now uses its record of which of
  your follows' relays actually return notes when choosing where to read, so an always-empty
  relay loses its place to one that delivers and crowded-out follows are read from their own
  relays. Fewer missing notes, less time waiting on relays with nothing for you.
- **Restructured Relays settings** — the Relays tab is now a two-pane hub (General, DMs,
  Search, Private) with one URL each (e.g. `/settings/relays/dm`). Search relays moved into
  Relays > Search, so the standalone Search settings tab is gone (its old URL redirects).
- **Pictures timeline on by default** — the header switcher gains a Pictures entry (picture
  posts from people you follow), keeping pictures out of the main feed while still browsing
  them in one place. Toggle it off in Settings > Content.
- **Removed the Followers timeline** — the header switcher now lists Following plus your
  promoted content-type timelines; the "who follows you" view has been dropped from it.
- **Fixes** — bookmarks and pins now remember a note's author and where it was seen (not
  just its id), so they still load after the note leaves the relays you saw it on; the
  Bookmarks count reflects what actually loads. (Bookmarks saved before this update stored
  only the id, so some may no longer load.) Picture posts that also carry the image URL in
  their caption no longer show the image twice. Relay trust-score chips in Settings load
  reliably again, including while a private relay is routing reads.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.6.0/CHANGELOG.md)
for the full list.

## [0.5.0] - 2026-07-03

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.5.0`. This is an
upstream feature-and-hardening release; the StartOS packaging is unchanged (same env,
port `8787`, `/app/.data` volume, and `tor` dependency). Existing installs upgrade in
place — the new features read and write additively under `/app/.data`, so no migration is
needed.

### Changed
- Bumped the bundled Satori source to `v0.5.0` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.5.0)
- **Custom timelines** — any content type can be designated as its own timeline via the
  header switcher (e.g. a Pictures-only feed, or a custom-NIPs feed); articles are now one
  of these customizable timelines rather than a separate Longform tab.
- **Per-post relay targeting** — the Poll, Article, and Picture composers gain the relay
  picker already in the Notes composer: a globe icon reveals write relays as toggleable
  chips plus a manual `wss://…` field; empty selection defaults to all write relays.
- **Scheduled picture posts** — picture posts can be scheduled for future publication and
  are broadcast by the daemon even when the browser is closed, using the same mechanism as
  scheduled notes and articles.
- **Faster Following feed** — the landing paints on a tight deadline from fast-relay
  results while off-feed polling uses adaptive per-relay timeouts learned from actual
  response patterns; slow-relay notes are buffered and counted by the "N new notes"
  indicator. A `feedRecovery` counter is added at `GET /metrics`.
- **Videos inline by default** — "Load nostr videos inline" now defaults ON (still
  suppressed under Strict privacy mode and toggleable in Settings).
- **Security hardening** — `GET /metrics` is now restricted to the instance owner (reuses
  the existing `SATORI_OWNER` env, already wired by the package); zap receipts (kind:9735)
  are signature-verified against the embedded request to block forged notifications;
  `nostr:nsec…` references are redacted rather than linkified; logout clears only the
  active account's cached data; and pending undo tokens are session-bound.
- **Fixes** — kind 54 renders as a podcast only with an actual audio track; addressable
  events (edited articles) deduplicate by `(kind, author, d)`; trailing URL punctuation is
  no longer swallowed into links; extensionless Blossom media renders via NIP-92 `imeta`;
  and NIP-23 article topics show as clickable hashtag chips.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.5.0/CHANGELOG.md)
for the full list.

## [0.4.2] - 2026-07-02

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.4.2`. This is an
upstream feature-and-maintenance release; the StartOS packaging is unchanged (same env,
port `8787`, `/app/.data` volume, and `tor` dependency). Existing installs upgrade in
place — the new relay-latency profile is additive under `/app/.data`, so no migration is
needed.

### Changed
- Bumped the bundled Satori source to `v0.4.2` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.4.2)
- **Relay latency profiling** — per-relay query response times are now recorded to
  `.data/relay-latency.json` (path configurable via `SATORI_RELAY_LATENCY_FILE`; set
  `SATORI_REQ_LOG=1` to log per-relay timings). Preparatory work for adaptive timeouts.
  The file lands under `/app/.data`, so it is covered by StartOS backups.
- **Commons timeline removed** — the curated trending feed backed by a single hardcoded
  relay was dropped as architecturally misaligned, along with its `/commons` route, data
  fetching, cached pages, and UI. This removes cached content, not persisted user data.
- **Header navigation dropdown** — the header title now acts as a dropdown on every page
  (not just timelines), for quick jumps between feeds and relay browsing from anywhere.
- **Fixes** — nip07 draft syncing is anchored to a user gesture so it works correctly;
  literal `<br>` tags and Setext-style headings now render in articles; draft deletion
  gains inline confirmation and a collapse animation; and bookmark/mute list management
  gets live header counts and proper empty states.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.4.2/CHANGELOG.md)
for the full list.

## [0.4.1] - 2026-07-01

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.4.1`. This is an
upstream maintenance release; the StartOS packaging is unchanged (same env, port `8787`,
`/app/.data` volume, and `tor` dependency). Existing installs upgrade in place — the fix
is UI-only with no new on-disk data shape, so no migration is needed.

### Changed
- Bumped the bundled Satori source to `v0.4.1` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.4.1)
- **Composer tab consistency** — the "Picture" compose mode (NIP-68) had become
  inaccessible from the Article screen, whose tab list had drifted to only Note, Poll, and
  Article. All four compose tabs now render from a single shared helper, preventing the
  tab sets from diverging again.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.4.1/CHANGELOG.md)
for the full list.

## [0.4.0] - 2026-07-01

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.4.0`. This is an
upstream feature release; the StartOS packaging is unchanged (same env, port `8787`,
`/app/.data` volume, and `tor` dependency). Existing installs upgrade in place — nothing
new lands with a distinct on-disk shape (the persisted relay-discovery cache is additive
under `/app/.data`), so no migration is needed.

### Changed
- Bumped the bundled Satori source to `v0.4.0` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.4.0)
- **Picture events (NIP-68)** — a new "Picture" composer mode posts kind-20 picture events
  with titles, captions, and multiple images, including content-warning toggles and pixel
  dimensions (NIP-92).
- **Git repositories (NIP-34)** now render as a first-class addressable card with detail
  pages, clone URLs, topics, and maintainers (read-only; issues and patches come later).
- **Wiki articles (NIP-54)** render as full articles with AsciiDoc support (headings,
  lists, links, code blocks, and in-app wikilinks), reusing the escaped, no-`innerHTML`
  pipeline of the Markdown reader.
- **Relay-discovery learning** — Satori remembers relays where an author's events are
  found and reuses them for future fetches, persisting across restarts.
- Reader-side relay widening now extends to addressable events, bare hex IDs in URLs
  redirect to canonical bech32, and single-relay browsing shows all renderable kinds.
- Security: private relay hints are screened against loopback/link-local addresses before
  storage, and NIP-17 private DMs publish only to recipient relays, never public indexers.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.4.0/CHANGELOG.md)
for the full list.

## [0.3.1] - 2026-06-30

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.3.1`. This is an
upstream feature release; the StartOS packaging is unchanged (same env, port `8787`,
`/app/.data` volume, and `tor` dependency). Existing installs upgrade in place — there is
no new on-disk data shape, so no migration is needed.

### Changed
- Bumped the bundled Satori source to `v0.3.1` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.3.1)
- **Custom NIPs (kind 30817)** now render as full articles — a Markdown body with a title
  and an optional list of the event kinds the NIP defines — instead of unsupported
  content, with comments, likes, zaps, and bookmarks.
- **Engagement state** (replies, reposts, likes) now reflects correctly on every
  addressable event kind, extending beyond articles to calendar events, classifieds, and
  videos.

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.3.1/CHANGELOG.md)
for the full list.

## [0.3.0] - 2026-06-29

Tracks upstream [Satori](https://github.com/Letdown2491/satori) `v0.3.0`. This is an
upstream feature release; the StartOS packaging is unchanged (same env, port `8787`,
`/app/.data` volume, and `tor` dependency). Existing installs upgrade in place — the new
relay-favorites file lands additively under `/app/.data` and needs no migration.

### Changed
- Bumped the bundled Satori source to `v0.3.0` (`SATORI_REF` in `./Dockerfile`).

### Upstream highlights (from Satori v0.3.0)
- **NIP-22 comments (kind 1111)** render as proper comment cards and fold into note,
  picture, and video threads; replies follow NIP-22 on the write side (a reply to a
  comment/picture/video now posts a kind:1111 comment), and comments show in timelines,
  profiles, and notifications.
- **Per-post relay targeting** — a "Relays" picker in the note composer to post a single
  note to a chosen subset of your NIP-65 write relays (or a one-off `wss://…`).
- **Relay timelines** — browse any relay's feed at `/relay?r=…` and star favorites
  (stored on this server only). Private/loopback hosts are rejected.
- **Scheduling** now also covers articles and quote reposts, not just notes.
- Security fix: the Messages screen no longer mixes conversations across accounts on the
  NIP-07 signing path (decrypted-DM cache is now scoped to the active account).

See the [upstream changelog](https://github.com/Letdown2491/satori/blob/v0.3.0/CHANGELOG.md)
for the full list.

## [0.2.0] - 2026-06-27

Initial StartOS package for [Satori](https://github.com/Letdown2491/satori),
tracking upstream `v0.2.0`.

> **This is an early release.** Expect rough edges. The outbound-Tor path
> (`.onion` relays and Privacy Mode via `tor.startos:9050`) should be verified on
> your own server.

### Added
- Run [Satori](https://github.com/Letdown2491/satori), a server-rendered, key-safe
  nostr client, on your Start9 server, with its web interface available through the
  StartOS UI.
- **Tor required** (dependency on the `tor` service). StartOS publishes the Web UI's
  `.onion` through Tor — the package bundles no Tor daemon — and Satori routes its own
  outbound `.onion` relay / Privacy Mode traffic through Tor's SOCKS proxy
  (`socks5h://tor.startos:9050`). Access is gated by Satori's own login wall and owner lock.
- **Access Control** action — set the owner npub (and optional additional allowed
  npubs) to restrict sign-in; leave blank to let the first sign-in claim ownership.
- **Timezone** action — set the container timezone (IANA name) used to interpret
  scheduled-post local times; defaults to UTC.
- Full backups: the entire Satori data directory (`/app/.data`) is included in
  StartOS backups. Your nostr key is never on disk — Satori signs via NIP-46 bunker
  or NIP-07 — so it is not in the backup.

[Unreleased]: https://github.com/Letdown2491/satori-startos/compare/v0.6.3...HEAD
[0.6.3]: https://github.com/Letdown2491/satori-startos/compare/v0.6.2...v0.6.3
[0.6.2]: https://github.com/Letdown2491/satori-startos/compare/v0.6.1...v0.6.2
[0.6.1]: https://github.com/Letdown2491/satori-startos/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/Letdown2491/satori-startos/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/Letdown2491/satori-startos/compare/v0.4.2...v0.5.0
[0.4.2]: https://github.com/Letdown2491/satori-startos/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/Letdown2491/satori-startos/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/Letdown2491/satori-startos/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/Letdown2491/satori-startos/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/Letdown2491/satori-startos/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Letdown2491/satori-startos/releases/tag/v0.2.0
