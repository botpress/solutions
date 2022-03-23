/**
 * Increments a variable by an amount
 * @title Increment Variable
 * @category Flow-Utils
 * @author David
 * @param {string} variableType - temp/session/user
 * @param {string} variableName - Variable Name
 * @param {number} amountToIncrement - Amount to Increment in the number variable
 */

const _ = require('lodash')

const myAction = async (variableType, variableName, amountToIncrement) => {
  _.set(
    event.state,
    `${variableType}.${variableName}`,
    (Number.parseFloat(_.get(event.state, `${variableType}.${variableName}`)) || 0) +
      Number.parseFloat(amountToIncrement)
  )
}
return myAction(args.variableType, args.variableName, args.amountToIncrement)
