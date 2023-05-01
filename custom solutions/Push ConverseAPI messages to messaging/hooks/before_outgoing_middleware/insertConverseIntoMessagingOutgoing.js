  const run = async () => {
    try {
      if (event.channel == 'api') {
        //Get mapped messaging conversation and user id
        let { userId, conversationId } = await getConverseMapping(event.botId, event.target)
        const converseUserId = event.target

        const messaging = bp.messaging.forBot(event.botId)

        let user, conversation
        if (!conversationId) {
          // No messaging user or conversation generated yet, create
          user = await messaging.createUser()
          conversation = await messaging.createConversation(user.id)
          await saveConverseMapping(event.botId, converseUserId, user.id, conversation.id)
        } else {
          user = await messaging.getUser(userId)
          conversation = await messaging.getConversation(conversationId)
        }

        if (!user || !conversation) {
          throw new Error('Failed to get mapped messaging user or conversation')
        }

        // This and the error string is the only difference
        // between the incoming and outgoing scripts
        await messaging.createMessage(conversation.id, undefined, event.payload)
      }
    } catch (e) {
      console.log(e)
      bp.logger.error('Failed to insert outgoing message into messaging: ' + e.message)
    }
  }

  const getConverseMapping = async (botId, converseUserId) => {
    const cached = bp.converseMappingCache.get(`${botId}_${converseUserId}`)
    if (cached) {
      return cached
    }

    let mapping = {}

    try {
      const rows = await bp.database('converse_user_map').where({ botId, converseUserId })
      if (rows.length) {
        mapping = rows[0]
        bp.converseMappingCache.set(`${botId}_${converseUserId}`, mapping)
      }
    } catch (err) {
      bp.logger.error('An error occurred while fetching the converse user mapping.', err)
    }
    return mapping
  }

  const saveConverseMapping = async (botId, converseUserId, userId, conversationId) => {
    const mapping = { botId, converseUserId, userId, conversationId }

    try {
      await bp.database('converse_user_map').insert(mapping)
      bp.converseMappingCache.set(`${botId}_${converseUserId}`, mapping)
      return mapping
    } catch (err) {
      bp.logger.error('An error occurred while creating a user mapping.', err)

      return undefined
    }
  }

  return run()