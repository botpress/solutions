/**
 * Hide/Show Composer
 * @title Hide or shows the text input field (composer)
 * @category Hide Chat
 * @author David Vitora
 * @param {boolean} hide - 'true' or 'false'
 */

const yn = require('yn')
const hideChat = async hide => {
  const payload = [
    {
      type: 'custom',
      module: 'hide-chat',
      component: 'HideChat',
      hidden: yn(hide),
      noBubble: true
    }
  ]
  await bp.events.replyToEvent(
    {
      botId: event.botId,
      channel: event.channel,
      target: event.target,
      threadId: event.threadId
    },
    payload,
    event.id
  )
}

return hideChat(args.hide)
