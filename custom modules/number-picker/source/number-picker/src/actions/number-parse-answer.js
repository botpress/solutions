const _ = require('lodash')

/**
 * @hidden true
 */

const getNumberEntity = () => {
  const nbEntities = (event.nlu.entities || []).filter(x => x.type === 'system.number')
  return nbEntities.length === 0 ? undefined : nbEntities[0].data.value
}

const getTextNumber = () => {
  const textExtract = _.get(event.preview && event.preview.match(/([\d.?]+)/), '[1]')
  return textExtract ? Number(textExtract) : undefined
}

// Extracted from common/action
const extractEventCommonArgs = incomingEvent => {
  return {
    event: incomingEvent,
    user: incomingEvent.state.user || {},
    session: incomingEvent.state.session || {},
    temp: incomingEvent.state.temp || {},
    bot: incomingEvent.state.bot || {}
  }
}

const getNumber = val => {
  if (typeof val === 'number') {
    return val
  }

  const context = extractEventCommonArgs(event)
  const parsed = Number(bp.experimental.render.template(val, context))

  return isNaN(parsed) ? undefined : parsed
}

const validateChoice = async data => {
  const { varName, randomId, roundOutput } = data

  const minValue = getNumber(data.minValue)
  const maxValue = getNumber(data.maxValue)

  const keySuffix = randomId ? `-${randomId}` : ''
  const validKey = `skill-number-picker-valid${keySuffix}`

  const textExtract = getTextNumber()
  const nluExtracted = getNumberEntity()

  const fixNumber = val => (roundOutput ? _.round(val) : val)
  const input = fixNumber(nluExtracted === undefined ? textExtract : nluExtracted)

  bp.logger.info('Parsing', { textExtract, nluExtracted, input, minValue, maxValue, roundOutput, tst: typeof minValue })

  if ((minValue !== undefined && input < minValue) || (maxValue !== undefined && input > maxValue) || isNaN(input)) {
    temp[validKey] = false
  } else {
    temp[validKey] = true
    temp[varName] = input
  }
}

return validateChoice(args)
