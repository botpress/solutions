  const text = event.payload.text
  const cmd = text && text.startsWith('[cmd]') && text.substring(5)

  if (cmd) {
    const args = cmd.split(':')
    const [cmdName, flowName, nodeName] = args

    if (cmdName == 'sendTo') {
      if (flowName && nodeName) {
        const { messageId, botId, channel, target, threadId } = event
        const internalEvent = bp.IO.Event({
          messageId,
          botId,
          channel,
          direction: 'incoming',
          payload: { flowName, nodeName },
          target,
          threadId,
          type: 'sendTo'
        })
        // Send internal incoming event to register desire to jump
        bp.events.sendEvent(internalEvent)
      }
    }
    // prevent command outgoing event from being sent to the user
    event.channel = 'invalid'
    event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true)
    event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    event.setFlag(bp.IO.WellKnownFlags.SKIP_NATIVE_NLU, true)
    event.setFlag(bp.IO.WellKnownFlags.SKIP_QNA_PROCESSING, true)
  }