# Changelog

All notable changes to the Satori StartOS package are documented here. This project
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

Changes for the next release accumulate here.

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

[Unreleased]: https://github.com/Letdown2491/satori-startos/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Letdown2491/satori-startos/releases/tag/v0.2.0
