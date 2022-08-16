  // We just care if the event comes from web and has the type custom-inject-variable
  if (event.channel == 'web' && event.type == 'custom-inject-variable') {
    // We add this to prevent the bot from being triggered
    event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)

    // We add this in order save state variables when SKIP_DIALOG_ENGINE is set
    event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true)

    // if we don't have a payload in the event, prevent further
    // execution
    if (!event.payload.payload || !event.payload.payload.payload) {
      return
    }

    // We save a temporary variable for each property from the payload object
    for (const key of Object.keys(event.payload.payload.payload)) {
      event.state.temp[key] = event.payload.payload.payload[key]
    }
  }