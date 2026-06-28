import { sdk } from '../sdk'
import { settingsFile } from '../fileModels/settings'

const { InputSpec, Value } = sdk

// Access Control — who may sign in. Optional: leave both blank and the first npub to
// sign in claims the instance (the upstream default). Set the owner to lock ownership
// before the .onion is reachable. Writing this restarts Satori so SATORI_OWNER /
// SATORI_ALLOWED_PUBKEYS (read in main.ts) take effect.
export const setAccess = sdk.Action.withInput(
  'set-access',

  async ({ effects }) => ({
    name: 'Access Control',
    description:
      'Restrict who can sign in. Leave the owner blank to let the first sign-in claim ' +
      'the instance. Changing this restarts Satori.',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  InputSpec.of({
    owner: Value.text({
      name: 'Owner',
      description:
        'The npub (or hex pubkey) that owns this instance. If set, only this key may sign in. ' +
        'Leave blank to let the first sign-in claim ownership.',
      required: false,
      default: null,
      placeholder: 'npub1…',
    }),
    allowed: Value.text({
      name: 'Additional allowed keys',
      description:
        'Optional. Comma-separated extra npubs/hex pubkeys allowed to sign in, in addition to the owner.',
      required: false,
      default: null,
      placeholder: 'npub1…, npub1…',
    }),
  }),

  async ({ effects }) => {
    const s = await settingsFile.read().const(effects)
    return { owner: s?.owner ?? null, allowed: s?.allowed ?? null }
  },

  async ({ effects, input }) => {
    await settingsFile.merge(effects, {
      owner: input.owner?.trim() || undefined,
      allowed: input.allowed?.trim() || undefined,
    })
  },
)
