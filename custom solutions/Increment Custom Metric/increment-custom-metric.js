  /**
   * Increments a metric in the bot_analytics table
   * @title Increment Metric in bot_analytics
   * @category Custom
   * @author Botpress
   * @param metric {string} the name of the metric to increment
   * @param n {int} how much to increment it
   */

  async function getNewLeads(botId, date, metric) {
    var new_leads = await bp.database.raw(
      `SELECT * FROM bot_analytics WHERE 
     botId='${botId}' AND
     date = '${date}' AND
     channel = '${event.channel}' AND
     metric = '${metric}' AND
     subMetric = 'n/a'`
    )
    try {
      return new_leads[0]
    } catch (error) {
      return undefined
    }
  }

  const myAction = async (metric, n) => {
    let date = event.createdOn.toISOString().split('T')[0]
    bp.logger.info(date)

    var new_leads = await getNewLeads(event.botId, date, metric)
    if (new_leads) {
      new_leads = { ...new_leads, value: new_leads.value + n } // Increment the value
      await bp.database.raw(
        //Update the database
        `UPDATE bot_analytics
      SET value = ${new_leads.value}
      WHERE botId='${event.botId}' AND
      date = '${date}' AND
      channel = '${event.channel}' AND
      metric = '${metric}' AND
      subMetric = 'n/a'`
      )
    } else {
      await bp.database.insertAndRetrieve('bot_analytics', {
        botId: event.botId,
        date: date,
        channel: event.channel,
        metric: 'new_leads',
        subMetric: 'n/a',
        value: 1
      })
    }
  }

  return myAction(args.metric, parseInt(args.n))
