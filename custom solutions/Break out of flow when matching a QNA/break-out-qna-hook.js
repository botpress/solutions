function hook(
  bp: typeof sdk,
  sessionId: string,
  event: sdk.IO.IncomingEvent,
  suggestions: sdk.IO.Suggestion[]
) {
  /** Your code starts below */

  const _ = require("lodash");

  async function findLastNode() {
    const jumpPoints = event.state && event.state.context && event.state.context.jumpPoints;
    const prevJumpPoint = _.findLast(jumpPoints, (j) => !j.used);
    return prevJumpPoint || {};
  }

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
        // and we are making the bot move into the main flow after answering the question
        let doAfter = { type: "redirect", flow: "main.flow.json", node: "entry" };
        // In case you don`t want to go back to the previous node and execute it again,
        // comment the line below
        doAfter = { ...doAfter, ...(await findLastNode()) };
        suggestion.payloads = [...suggestion.payloads, doAfter];
      }
    }
  }
  return hook();

  /** Your code ends here */
}
