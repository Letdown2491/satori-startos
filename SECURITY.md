# Security Policy

This repository packages [Satori](https://github.com/Letdown2491/satori) for StartOS.
The security-sensitive code (the nostr client, session handling, signing flows, CSP,
and the SSRF/Tor proxying) lives **upstream** in the Satori repository.

## Where to report

- **Client, session, signing, CSP, or privacy issues** → report to the upstream
  Satori repository: <https://github.com/Letdown2491/satori/security>
- **Packaging issues specific to this repo** → report here. This covers the s9pk
  build, environment configuration (`HOST`/`PORT`/`TOR_SOCKS`/`TZ`/`SATORI_OWNER`),
  the `/app/.data` data mount, and the StartOS manifest / interfaces / actions /
  backups.

**Please do not open a public issue for security vulnerabilities.** Use GitHub's
private vulnerability reporting:

1. Open the **Security** tab of this repository.
2. Click **Report a vulnerability**.
3. Describe the issue with steps to reproduce.

If that channel is unavailable, open a minimal, non-sensitive issue asking how to reach
the maintainers privately, but **do not include vulnerability details** in a public
issue.

## Supported versions

This package tracks Satori releases; only the latest packaged version (currently
`0.2.0`) receives fixes.

## Scope notes

Satori on StartOS is a single-user daemon reached over StartOS's authenticated
interface (Tor / LAN), behind Satori's own login wall and owner lock. It never holds
your nostr secret key — signing happens in a NIP-46 bunker or a NIP-07 extension — so
"the server could spend/leak my key" is out of scope by design. See the upstream
threat model for details.
