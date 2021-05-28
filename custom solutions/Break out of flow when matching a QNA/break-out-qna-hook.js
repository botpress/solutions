function hook(
  bp: typeof sdk,
  sessionId: string,
  event: sdk.IO.IncomingEvent,
  suggestions: sdk.IO.Suggestion[]
) {
  /** Your code starts below */

  async function hook() {
    if (!suggestions.length || !suggestions[0].decision) {
      return;
    }
    const suggestion = suggestions[0];
    // maybe you don't want this triggering in every flow, or on every skill
    if (!event.state.context.currentFlow.startsWith("skills/SFLiveAgent")) {
      const decision = suggestion.decision;
      if (
        decision.status === "dropped" &&
        decision.reason.includes("already in the middle of a flow") &&
        suggestions[0].confidence > 0.5
      ) {
        // We're changing the election results
        // The QnA will be answered to the user instead of continuing the flow
        decision.status = "elected";
        decision.reason = "Direct Q&A question detected - calling up answer.";
        // and we are making the bot move into an action right after answering the
        // users questions
        suggestion.payloads = [
          ...suggestion.payloads,
          { type: "redirect", flow: "main.flow.json", node: "entry" },
        ];
      }
    }
  }
  return hook();

  /** Your code ends here */
}
