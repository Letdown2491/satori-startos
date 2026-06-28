# Satori

Satori is a single-user nostr client that runs on your server and renders in plain
HTML — almost no application JavaScript ships to your browser. It never sees your nostr
key: you sign with a NIP-46 bunker or a NIP-07 browser extension, and the server only
ever handles the signed result. Open the **Web UI** to begin.

## First run

1. Open the **Web UI** interface (over Tor or LAN). You'll land on a login wall —
   everything except login requires a session, so a stranger who finds the address
   sees a wall, not your data.
2. Sign in with a `bunker://` connection string (NIP-46) or a NIP-07 extension
   (Alby, nos2x, and friends). Satori only handles the signed result; your key never
   reaches the server.
3. **The first key to sign in claims the instance.** If you'd rather lock ownership
   before anyone can reach the address, set it ahead of time under
   **Actions → Access Control**.

## Configuration

Most of Satori's settings — relays, DM relays, media servers, theme, Privacy Mode,
content preferences and search — live inside Satori's own **Settings** page in the Web
UI. Only two knobs are set from StartOS, under **Actions**:

- **Access Control** — set the owner npub (and optionally additional allowed npubs) to
  restrict who can sign in. Leave blank to let the first sign-in claim ownership.
- **Timezone** — StartOS can't pass the host clock's zone into the service, so set an
  IANA timezone (e.g. `America/New_York`) here. This only affects how scheduled posts
  interpret local times; the default is UTC.

Changing either restarts Satori so the new value takes effect.

## Tor

- **Reaching Satori** uses StartOS's own Tor: the `.onion` address for the Web UI is
  provisioned by StartOS, not by Satori. Access is gated by Satori's login wall.
- **Satori's outbound traffic** — connecting to `.onion` relays and routing fetches
  through Tor in Privacy Mode — uses your server's Tor SOCKS proxy automatically. No
  configuration is required.

## Backups

The StartOS backup captures everything Satori stores: your session, the owner claim,
the relay/profile/avatar caches, drafts, scheduled posts, DM read-state and privacy
settings. Your nostr secret key is **never** written to disk — Satori signs through your
bunker or extension — so it is not in the backup. Keep your key backed up separately;
that is what actually controls your identity.

## Security model

Satori is a single-user daemon. It assumes one trusted owner reaching it over StartOS's
authenticated interface (Tor / LAN), plus its own login wall and owner lock. It is not a
multi-user or public-web service.
