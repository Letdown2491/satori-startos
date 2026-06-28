import { sdk } from '../sdk'
import { settingsFile } from '../fileModels/settings'
import { TIMEZONES } from '../tz'

const { InputSpec, Value } = sdk

// Timezone — StartOS can't bind the host's /etc/localtime into the container, so set
// the TZ here. It only matters for scheduled posts, which Satori parses/formats against
// the local zone. Pick from the full IANA list (rendered as a searchable radio list).
// Changing this restarts Satori.
export const setTimezone = sdk.Action.withInput(
  'set-timezone',

  async ({ effects }) => ({
    name: 'Timezone',
    description:
      'The timezone Satori uses to interpret scheduled-post times. Pick your IANA ' +
      'timezone; defaults to UTC. Changing this restarts Satori.',
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  InputSpec.of({
    tz: Value.select({
      name: 'Timezone',
      description: 'Your IANA timezone (e.g. America/New York). Defaults to UTC.',
      default: 'UTC',
      values: TIMEZONES,
    }),
  }),

  async ({ effects }) => {
    const s = await settingsFile.read().const(effects)
    // Only prefill a stored value that's still a valid option, else let the default stand.
    const tz = s?.tz && s.tz in TIMEZONES ? s.tz : 'UTC'
    return { tz }
  },

  async ({ effects, input }) => {
    await settingsFile.merge(effects, { tz: input.tz || 'UTC' })
  },
)
