  // Jump to specified flow/node if any
  async function send() {
    const { sendTo } = event.state.session
    if (sendTo) {
      const { flowName, nodeName } = sendTo
      event.state.session.sendTo = undefined
      await bp.dialog.jumpTo(event.threadId, event, flowName, nodeName)
      event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true)
    }
  }

  // resolved event from HITL-Next
  if (event.type == 'hitlnext' && event.payload.exitType == 'handoffResolved') {
    return send()
  }

  // Internal event to register the sendTo action
  else if (event.type == 'sendTo') {
    const { flowName, nodeName } = event.payload
    if (flowName) {
      event.state.session.sendTo = { flowName, nodeName }
    }
    event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true)
    event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
    event.setFlag(bp.IO.WellKnownFlags.SKIP_NATIVE_NLU, true)
    event.setFlag(bp.IO.WellKnownFlags.SKIP_QNA_PROCESSING, true)
  }
