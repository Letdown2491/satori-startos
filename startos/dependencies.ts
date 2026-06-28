import { sdk } from './sdk'

// Runtime dependency requirements. The declarable set + required/optional split lives in
// manifest/index.ts; this returns the actual requirement for the required ones.
//
// Tor (required, running): Satori is reached over its StartOS-provisioned .onion and
// routes outbound .onion-relay / Privacy Mode traffic through Tor's SOCKS proxy at
// tor.startos:9050 (see main.ts). Wildcard version range — any Tor version works.
export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  return {
    tor: {
      kind: 'running',
      versionRange: '*',
      healthChecks: [],
    },
  }
})
