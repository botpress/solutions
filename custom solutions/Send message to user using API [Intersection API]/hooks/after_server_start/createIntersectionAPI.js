  const router = bp.http.createRouterForBot('intersection', { checkAuthentication: true, enableJsonBodyParser: true })
  router.post('/', async (req, res) => {
    try {
      const { botId, target, threadId, payload, channel, type } = req.body

      if (!botId) {
        res.send('botId required')
        return
      }

      if (!target) {
        res.send('target required')
        return
      }

      if (!threadId) {
        res.send('threadId required')
        return
      }

      if (!payload) {
        res.send('payload required')
        return
      }

      if (!channel) {
        res.send('channel required')
        return
      }

      if (!type) {
        res.send('type required')
        return
      }

      const event = bp.IO.Event({
        direction: 'outgoing',
        channel: channel,
        botId,
        target,
        type,
        payload
      })

      await bp.events.sendEvent(event)

      res.json(event)
    } catch (e) {
      res.send('Error sending message: ' + e.message)
    }
  })