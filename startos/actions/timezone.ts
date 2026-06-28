import { sdk } from '../sdk'
import { settingsFile } from '../fileModels/settings'

const { InputSpec, Value } = sdk

// Timezone — StartOS can't bind the host's /etc/localtime into the container, so set
// the TZ here. It only matters for scheduled posts, which Satori parses/formats against
// the local zone. Use an IANA name (e.g. America/New_York). Changing this restarts Satori.
export const setTimezone = sdk.Action.withInput(
  'set-timezone',

  async ({ effects }) => ({
    name: 'Timezone',
    description:
      'Set the timezone Satori uses to interpret scheduled-post times. Use an IANA name ' +
      'like America/New_York or Europe/Berlin. Changing this restarts Satori.',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  InputSpec.of({
    tz: Value.text({
      name: 'Timezone',
      description: 'An IANA timezone name. Defaults to UTC.',
      required: true,
      default: 'UTC',
      placeholder: 'UTC',
    }),
  }),

  async ({ effects }) => {
    const s = await settingsFile.read().const(effects)
    return { tz: s?.tz ?? 'UTC' }
  },

  async ({ effects, input }) => {
    await settingsFile.merge(effects, { tz: input.tz?.trim() || 'UTC' })
  },
)
