import { sdk } from './sdk'

// Satori keeps everything it stores in the 'main' volume (mounted at /app/.data):
// the session store, the owner claim, the relay/profile/avatar/engagement caches,
// drafts, scheduled posts, DM read-state and privacy settings. Backing up 'main'
// therefore captures the full app state. Satori never persists your nostr secret
// key (it signs via NIP-46 bunker / NIP-07), so no signing key is in the backup.
export const { createBackup, restoreInit } = sdk.setupBackups(
  async ({ effects }) => sdk.Backups.ofVolumes('main'),
)
