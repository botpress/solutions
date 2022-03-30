/**
 * @hidden true
 */

const _ = require('lodash')
var he = require('he')

const add_to_array = async (variableArrayName, variableArrayScope, value) => {
  const context = {
    event,
    user: event.state.user,
    temp: event.state.temp,
    session: event.state.session
  }

  if (value.trim().match(/^\${.*}$/g)) {
    // bp.cms.renderTemplate will use mustache, which is not good to assign complex values
    value = _.get(context, value.replace(/\${|}/g, ''))
  } else {
    value = he.decode(value)
  }

  try {
    value = JSON.parse(value)
  } catch (e) {
    bp.logger.attachError(e).error('[AddToArray] Error parsing item')
  }

  const scope = event.state[variableArrayScope]
  const array = _.get(event.state, `${variableArrayScope}.${variableArrayName}`)
  if (!scope || !array || !Array.isArray(array)) {
    throw new Error(`Array with variableName ${variableArrayName} and scope ${variableArrayScope} doesn't exist`)
  }

  array.push(value)
}

return add_to_array(args.variableName, args.variableScope, args.value)
