  async function hook() {
    if (event.nlu.intent.confidence < 0.75) {
      bp.logger.info('Confidence too low, overriding...')
      if (suggestions.length > 0) {
        const suggestion = suggestions[0]
        const decision = suggestion.decision
        decision.status = 'dropped'
        decision.reason = 'Overridden due to low confidence'
      }
      event.nlu.intent = { //This will throw a read-only error, but you can still set the property
        name: 'none',
        confidence: 1,
        context: 'global'
      }
    }
  }
  return hook()
