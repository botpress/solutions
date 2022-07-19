const moment = require('moment')
  const _ = require('lodash')

  const HANDOFF_TABLE_NAME = 'handoffs'

  const getHandoffsForConversation = async conversationId => {
    return bp
      .database(HANDOFF_TABLE_NAME)
      .select('*')
      .where({ userThreadId: conversationId })
  }

  const getConversation = async (conversationId, botId, listMessages) => {
    const handoffs = await getHandoffsForConversation(conversationId)
    const messaging = bp.messaging.forBot(botId)
    const messages = listMessages ? _.reverse(await messaging.listMessages(conversationId)) : undefined
    let isTalkingWithAgent = false
    let isAwatingForAgent = false

    for (const handoff of handoffs) {
      if (handoff.status == 'assigned') {
        isTalkingWithAgent = true
      }

      if (handoff.status == 'pending') {
        isAwatingForAgent = true
      }

      if (listMessages) {
        const assignedAt = moment(handoff.assignedAt).toDate()
        const resolvedAt = moment(handoff.resolvedAt).toDate()
        if (messages) {
          for (const message of messages) {
            delete message.conversationId
            const sentOn = moment(message.sentOn).toDate()
            if (sentOn > assignedAt && (handoff.resolvedAt == null || sentOn < resolvedAt)) {
              if (message.authorId == null) {
                message.isFromAgent = true
              }
              message.hitl = {
                agentId: handoff.agentId,
                handoffId: handoff.id
              }
            }
          }
        }
      }
    }
    return { conversationId, handoffs, messages, isTalkingWithAgent, isAwatingForAgent }
  }

  const router = bp.http.createRouterForBot('hitl-custom', { checkAuthentication: true })
  router.get('/conversation', async (req, res) => {
    try {
      const { conversationId, userId, botId, listMessages } = req.query

      const response = {
        conversations: [],
        isTalkingWithAgent: false,
        isAwatingForAgent: false
      }

      const messaging = bp.messaging.forBot(botId)

      const convIds = userId
        ? (await messaging.listConversations(userId)).map(conversation => conversation.id)
        : [conversationId]

      for (const id of convIds) {
        const { isTalkingWithAgent, isAwatingForAgent, ...rest } = await getConversation(id, botId, listMessages)
        response.conversations.push({ isTalkingWithAgent, isAwatingForAgent, ...rest })
        if (isTalkingWithAgent) response.isTalkingWithAgent = true
        if (isAwatingForAgent) response.isAwatingForAgent = true
      }

      res.json(response)
    } catch (e) {
      res.send('Error, unable to get a valid conversation, check the conversationId or userId again')
    }
  })