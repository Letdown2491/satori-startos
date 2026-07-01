# Changelog

All notable changes to the Satori StartOS package are documented here. This project
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

Changes for the next release accumulate here.

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

[Unreleased]: https://github.com/Letdown2491/satori-startos/compare/v0.4.1...HEAD
[0.4.1]: https://github.com/Letdown2491/satori-startos/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/Letdown2491/satori-startos/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/Letdown2491/satori-startos/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/Letdown2491/satori-startos/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Letdown2491/satori-startos/releases/tag/v0.2.0
