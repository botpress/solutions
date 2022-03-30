/**
 * @hidden true
 */

const _ = require('lodash')

const create_array = async (variableArrayName, variableArrayScope, value) => {
  try {
    value = JSON.parse(value)
  } catch (e) {
    value = undefined
    bp.logger.attachError(e).error('[CreateArray] Error parsing array')
  }

  if (!event.state[variableArrayScope]) {
    throw new Error(`Invalid scope ${variableArrayScope}`)
  }

  _.set(event.state, `${variableArrayScope}.${variableArrayName}`, value || [])
}

return create_array(args.variableName, args.variableScope, args.value)
