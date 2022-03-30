/**
 * Operation between or using two variables, any operation from lodash (https://lodash.com/docs/4.17.15)
 * @title Operation
 * @category Flow-Utils
 * @author David
 * @param {string} resultVariableType - temp/session/user
 * @param {string} resultVariableName - Variable Name to save the result
 * @param {string} operation - Pick between: add, get, ceil, divide, floor, max, min, round, subtract, sum, etc (https://lodash.com/docs/4.17.15)
 * @param {any} variable1 - First variable to be used, suports numbers, strings, arrays, objects. It's also possible point to other variable using ${scope.variable}
 * @param {any} variable2 - Second variable to be used, suports numbers, strings, arrays, objects. It's also possible point to other variable using ${scope.variable}
 */

var he = require('he')
const _ = require('lodash')

const myAction = async (resultVariableType, resultVariableName, operation, variable1, variable2) => {
  const context = {
    event,
    user: event.state.user,
    temp: event.state.temp,
    session: event.state.session
  }

  try {
    if (variable1.trim().match(/^\${.*}$/g)) {
      variable1 = _.get(context, variable1.replace(/\${|}/g, ''))
    } else {
      variable1 = he.decode(variable1)
    }
    variable1 = JSON.parse(variable1)
  } catch (e) {}

  try {
    if (variable2.trim().match(/^\${.*}$/g)) {
      variable2 = _.get(context, variable2.replace(/\${|}/g, ''))
    } else {
      variable2 = he.decode(variable2)
    }

    variable2 = JSON.parse(variable2)
  } catch (e) {}

  const result = _[operation](variable1, variable2)

  _.set(event.state, `${resultVariableType}.${resultVariableName}`, result)
}
return myAction(args.resultVariableType, args.resultVariableName, args.operation, args.variable1, args.variable2)
