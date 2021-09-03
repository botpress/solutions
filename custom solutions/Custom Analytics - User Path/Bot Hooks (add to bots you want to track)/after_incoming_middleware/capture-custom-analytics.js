function hook(bp: typeof sdk, event: sdk.IO.IncomingEvent) {
  /** Your code starts below */

  const sendData = async (transition, threadId, generatedSessionId) => {
    const axios = require("axios");
    const axiosConfig = await bp.http.getAxiosConfigForBot(event.botId);
    return await axios.post(
      "/mod/custom-analytics/capture",
      {
        userId: event.target,
        transition,
        threadId,
        generatedSessionId,
      },
      axiosConfig
    );
  };

  const getTransition = () => {
    if (event.nlu && event.nlu.intent && (event.nlu.intent.name || "").includes("__qna__")) {
      return event.nlu.intent.name;
    }
    if (
      event.state &&
      event.state.context &&
      event.state.context.jumpPoints &&
      event.state.context.jumpPoints.length
    ) {
      const { jumpPoints } = event.state.context;

      const { flow, node } = jumpPoints[jumpPoints.length - 1];
      return `${flow}:${node}`;
    }
    return null;
  };
  const transition = getTransition();

  if (transition) {
    sendData(
      transition,
      event.threadId,
      event.state && event.state.session && event.state.session.generatedSessionId
    )
      .then((resp) => bp.logger.forBot(event.botId).debug(`analytics response: `, resp.data))
      .catch((err) => bp.logger.error(`Unable to send data to anayltics endpoint: `, err.message));
  }

  /** Your code ends here */
}
