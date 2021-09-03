function hook(bp: typeof sdk, event: sdk.IO.IncomingEvent) {
  /** Your code starts below */

  const uuid = require("uuid");

  if (event.state && event.state.context && event.state.context.currentFlow == undefined) {
    const generated = uuid.v4();
    event.state.session.generatedSessionId = generated.substring(0, generated.indexOf("-"));
    event.setFlag(bp.IO.WellKnownFlags.FORCE_PERSIST_STATE, true);
  }

  /** Your code ends here */
}
