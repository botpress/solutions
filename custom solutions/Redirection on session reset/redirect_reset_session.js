  async function redirect() {
    if (event.type === 'session_reset') {
      const sessionId = bp.dialog.createId(event)
      await bp.dialog.jumpTo(sessionId, event, 'main.flow.json', 'entry')

      const newEvent = bp.IO.Event({
        type: 'any',
        payload: {},
        direction: event.direction,
        channel: event.channel,
        target: event.target,
        botId: event.botId,
        threadId: event.threadId
      })

      newEvent.debugger = true
      await bp.events.sendEvent(newEvent)
    }
  }

  return redirect()