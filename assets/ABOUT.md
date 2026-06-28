# About Satori

Satori is a server-rendered hypermedia (HATEOAS) nostr client. The server sends HTML
and you navigate with links and forms — the only client code is two small libraries
(helm.js and hext.js). It never handles your nostr key: signing happens in a NIP-46
bunker or a NIP-07 extension, and the server only sees the signed event.

Upstream: https://github.com/Letdown2491/satori
