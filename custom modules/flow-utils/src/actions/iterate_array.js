/**
 * @hidden true
 */

const _ = require('lodash')

const iterate = async (variableArrayName, variableArrayScope, indexVariableName, variableItemName) => {
  event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true)
  // We clean the stacktrace so we don't trigger the infinite loop exception
  const bkp = event.state.__stacktrace
  event.state.__stacktrace = []
  try {
    const array = _.get(event.state, `${variableArrayScope}.${variableArrayName}`)

    let indexControl = temp[indexVariableName]
    if (!indexControl) {
      indexControl = {
        index: 0
      }
    } else {
      indexControl.index++
    }

    if (!Array.isArray(array) && !(typeof array === 'object')) {
      temp[variableItemName] = Symbol.for('NOT_ITERABLE')
      temp[indexVariableName] = undefined
      event.state.__stacktrace = bkp
      return
    }

    indexControl.currentKey = typeof array === 'object' && Object.keys(array)[indexControl.index]

    const length = Array.isArray(array) ? array.length : Object.keys(array).length

    if (indexControl.index >= length) {
      temp[variableItemName] = Symbol.for('END')
      temp[indexVariableName] = undefined
      return
    }

    temp[variableItemName] = Array.isArray(array) ? array[indexControl.index] : array[indexControl.currentKey]
    temp[indexVariableName] = indexControl
  } catch (e) {
    bp.logger.error('Error iterating: ' + JSON.stringify(e.message))
    temp[variableItemName] = Symbol.for('ERROR')
  }
}

return iterate(args.variableName, args.variableScope, args.indexVariableName, args.variableItemName)
