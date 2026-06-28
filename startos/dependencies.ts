import { sdk } from './sdk'

// Satori has no service dependencies (see manifest/index.ts for why inbound/outbound
// Tor are not modeled as deps).
export const setDependencies = sdk.setupDependencies(
  async ({ effects }) => ({}),
)
