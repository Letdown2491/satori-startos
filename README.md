# satori-startos

StartOS (0.4.0) package for [Satori](https://github.com/Letdown2491/satori) — a
single-user, server-rendered nostr client that never sees your key.

## What this package does

- **Inbound over Tor, for free.** StartOS provisions the `.onion` (and LAN-HTTPS) for
  Satori's Web UI; there is no bundled Tor daemon. Access is gated by Satori's own login
  wall and owner lock.
- **Outbound over Tor.** Satori's `.onion` relay support and Privacy Mode route through
  the host Tor SOCKS proxy (`socks5h://tor.startos:9050`), set in `startos/main.ts`.
- **Persistent state** lives in the `main` volume, mounted at `/app/.data`.
- **Two StartOS actions** — *Access Control* (owner / allowed npubs) and *Timezone*.
  Everything else is configured inside Satori's own Settings page.

## Build

```bash
make            # builds x86_64 + aarch64 .s9pk (needs start-cli, node, npm)
make x86        # single arch
make install    # sideload to the server in ~/.startos/config.yaml
```

The image is built by `./Dockerfile`, which clones upstream Satori at `ARG SATORI_REF`
(default `main`). **Pin `SATORI_REF` to a tag or commit for reproducible release builds.**
The upstream repo must be public for the unauthenticated clone to succeed.

## Layout

```
startos/
  manifest/      package id, title, image (dockerBuild), no dependencies
  interfaces.ts  one 'ui' interface on port 8787
  main.ts        daemon: env (HOST/PORT/TOR_SOCKS/TZ/owner), volume mount, health check
  actions/       set-access, set-timezone (input actions → settings file)
  fileModels/    settings.json (owner / allowed / tz)
  backups.ts     backs up the 'main' volume
  versions/      version graph
icon.svg         the app's ensō, on paper
Dockerfile       clones + installs upstream Satori (node:24-alpine, no build step)
```

## Verify on a real box

Outbound Tor reachability (`tor.startos:9050` from inside the service container) is the
one thing to confirm on an actual 0.4.0 install: sign in, add an `.onion` relay or enable
Privacy Mode, and check it connects.
