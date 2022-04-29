  // Define the flow and node to redirect to after the Q&A is answered
  const nextNode = {
    type: 'redirect',
    flow: 'main.flow.json',
    node: 'entry'
  }

  async function hook() {
    if (!suggestions.length || !suggestions[0].decision || event.type !== 'text') {
      return
    }

    const suggestion = suggestions[0]
    const decision = suggestion.decision

    if (decision.status === 'elected' && suggestion.source === 'qna') {
      bp.logger.info('adding redirect....')
      suggestion.payloads = [...suggestion.payloads, nextNode]
    }
  }
  return hook()
