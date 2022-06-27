const _ = require('lodash')

/**
 * Send an event back to the main bot so it knows to end delegation.
 * @End Delegation
 * @category Custom
 */
const myAction = async () => {
  if (event.channel === 'api') {
    await bp.events.sendEvent(
      bp.IO.Event({
        ..._.pick(event, ['channel', 'target', 'threadId', 'botId']),
        type: 'custom',
        direction: 'outgoing',
        payload: {
          type: 'end_delegation'
        }
      })
    )
  }
}

return myAction()
