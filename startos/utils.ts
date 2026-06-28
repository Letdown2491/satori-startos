// Constants/functions shared across the package.

// Satori's HTTP daemon listens here (its PORT default is 8787; see src/server.ts).
// This is the container-internal port StartOS binds its interface to — NOT the LAN
// proxy port the browser ends up using.
export const uiPort = 8787
