export const short = {
  en_US: 'Server-rendered, key-safe nostr client',
}

export const long = {
  en_US:
    'Satori is a single-user nostr client that runs on your server instead of in your ' +
    'browser: the server renders HTML and you navigate with links and forms, so almost no ' +
    'application JavaScript ships to the browser. It never sees your nostr key — you sign with ' +
    'a NIP-46 bunker or a NIP-07 extension and the server only handles the signed result. It ' +
    'covers feeds, threads, profiles, long-form articles, polls, private DMs, search, zaps, ' +
    'notifications, drafts, bookmarks, follows and mutes. On StartOS it is reachable privately ' +
    "over Tor, and its outbound traffic (.onion relays and Privacy Mode) routes through your " +
    "server's Tor.",
}
