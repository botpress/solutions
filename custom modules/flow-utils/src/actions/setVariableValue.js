/**
 * Set user, session, temp variables with real values instead of strings like the vanilla implementation, also supports nested properties and decode HTML characters
 *
 * @title Set Value Variable
 * @category Flow-Utils
 * @author David
 * @param {string} type - Pick between: user, session, temp
 * @param {string} name - The name of the variable, it can also be nested properties, example: variable1.variable2
 * @param {any} value - Set the value of the variable. use any primitives like numbers, null, strings, objects, arrays. It's also possible point to other variable using ${scope.variable}
 */

const _ = require('lodash')
var he = require('he')

const setVariable = async (type, name, value) => {
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
  } catch (e) {}
  _.set(event.state, `${type}.${name}`, value)
}

return setVariable(args.type, args.name, args.value)
