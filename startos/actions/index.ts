import { sdk } from '../sdk'
import { setAccess } from './access'
import { setTimezone } from './timezone'

export const actions = sdk.Actions.of().addAction(setAccess).addAction(setTimezone)
