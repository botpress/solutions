function hook(bp: typeof sdk, botId: string) {
  /** Your code starts below */

  const DATABASE_TABLE = "custom-analytics";

  const router = bp.http.createRouterForBot("custom-analytics", { checkAuthentication: true });

  bp.database.createTableIfNotExists(DATABASE_TABLE, (table) => {
    table.increments("id").unsigned().primary();
    table.string("botId").notNullable();
    table.string("userId").notNullable();
    table.string("threadId").notNullable();
    table.string("generatedSessionId").notNullable();
    table.string("transition").notNullable();
    table.timestamp("time").defaultTo(bp.database.fn.now());
  });

  const handleError = async (res, err) => {
    res.status(500).send({ success: false, error: err.message });
    bp.logger.forBot(botId).error(`Custom Analytics error: `, err.message);
    bp.logger.forBot(botId).attachError(err);
  };

  router.post("/capture", async (req, res) => {
    try {
      const { botId } = req.params;
      const { userId, transition, threadId, generatedSessionId } = req.body;
      if (!userId || !transition || !botId) {
        bp.logger.forBot(botId).info("userId, botId and transition is required to capture the event");
        res
          .status(400)
          .json({ success: false, error: "userId, botId and transition is required to capture the event" });
        return;
      }
      await bp.database(DATABASE_TABLE).insert({ botId, userId, transition, threadId, generatedSessionId });
      res.status(200).send({ success: true });
    } catch (err) {
      handleError(res, err);
    }
  });

  router.get("/aggregate", async (req, res) => {
    try {
      const data = await bp.database.raw(
        `SELECT "userId", array_to_string(array_agg("transition"), ',') as transitions FROM "${DATABASE_TABLE}" WHERE "botId" = '${botId}' GROUP BY "userId"`
      );
      res.status(200).json({ success: true, rows: data.rows });
    } catch (err) {
      handleError(res, err);
    }
  });

  router.get("/", async (req, res) => {
    try {
      const { botId } = req.params;
      const rows = await bp.database(DATABASE_TABLE).select().where({ botId });
      res.json({ success: true, rows });
    } catch (err) {
      handleError(res, err);
    }
  });

  bp.config
    .getBotpressConfig()
    .then((config) => {
      const { externalUrl, host, port } = config.httpServer;
      bp.logger
        .forBot(botId)
        .info(
          `Custom Analytics endpoint: ${
            externalUrl || host + ":" + port
          }/api/v1/bots/${botId}/mod/custom-analytics/`
        );
    })
    .catch((err) => bp.logger.forBot(botId).error(`Could not retrieve botpress config`, err.message));

  /** Your code ends here */
}
