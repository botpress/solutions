/**
 * @hidden true
 */

const _ = require('lodash')

const rawReply = async (contentType, payload) => {
  const context = {
    event,
    user: event.state.user,
    temp: event.state.temp,
    session: event.state.session
  }
  try {
    _.forEach(payload, (value, key) => {
      try {
        if (value.trim().match(/^\${.*}$/g)) {
          // bp.cms.renderTemplate will use mustache, which is not good to assign complex values
          payload[key] = _.get(context, value.replace(/\${|}/g, ''))
        } else if (value.match(/{{|}}/g)) {
          // only use it if the string has lots of variables to fiil
          payload[key] = bp.cms.renderTemplate(value, context)
        }
        payload[key] = JSON.parse(payload[key])
      } catch (e) {}
    })
    const payloads = await bp.cms.renderElement(contentType, payload, event)
    bp.events.replyToEvent(
      {
        botId: event.botId,
        channel: event.channel,
        target: event.target,
        threadId: event.threadId
      },
      payloads,
      event.id
    )
  } catch (e) {
    bp.logger.attachError(e).error('[Reply] Error')
  }
}

return rawReply(args.contentType, args.payload)
