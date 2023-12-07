  /**
   * Increments a metric
   * @title Increment Metric
   * @category Custom
   * @author Botpress
   * @param metric {string} the name of the metric to increment
   * @param n {int} how much to increment it
   */

  async function getNewLeads(botId, date, metric) {
    let new_leads = await bp.database
      .select('*')
      .from('bot_analytics')
      .where({
        botId: botId,
        date: date,
        channel: event.channel,
        metric: metric,
        subMetric: 'n/a'
      })

    try {
      bp.logger.info('New leads: ' + new_leads[0])
      return new_leads[0]
    } catch (error) {
      bp.logger.error('Something happened! ' + error)
      return undefined
    }
  }

  const incrementMetric = async (metric, n) => {
    let date = event.createdOn.toISOString().split('T')[0]

    var new_leads = await getNewLeads(event.botId, date, metric)
    if (new_leads) {
      new_leads = { ...new_leads, value: new_leads.value + n } // Increment the value

      await bp
        .database('bot_analytics')
        .where({
          botId: event.botId,
          date: date,
          channel: event.channel,
          metric: metric,
          subMetric: 'n/a'
        })
        .update({
          value: new_leads.value
        })
    } else {
      await bp.database
        .insert({
          botId: event.botId,
          date: date,
          channel: event.channel,
          metric: metric,
          subMetric: 'n/a',
          value: 1
        })
        .into('bot_analytics')
    }
  }

  return incrementMetric(args.metric, parseInt(args.n))
