  const moment = require('moment')
  const _ = require('lodash')

  const crypto = require('crypto')

  const getMessageContent = (message, type) => {
    const { payload } = message

    if (type === 'file') {
      return (payload && payload.url) || message.message_data.url
    }

    const wrappedText = _.get(payload, 'wrapped.text')
    return (payload && payload.text) || message.message_text || wrappedText || `Event (${type})`
  }

  const convertToTxtFile = async (botId, conversation) => {
    const { messages } = conversation
    const { result: user } = await bp.users.getOrCreateUser('web', conversation.userId)
    const timeFormat = 'MM/DD/YY HH:mm'
    const fullName = `${user.attributes['first_name'] || ''} ${user.attributes['last_name'] || ''}`
    const metadata = `Conversation Id: ${conversation.id}\r\nCreated on: ${moment(conversation.createdOn).format(
      timeFormat
    )}\r\nUser: ${fullName}\r\n-----------------\r\n`

    const messagesAsTxt = messages.map(message => {
      const type = message.payload.type
      if (type === 'session_reset') {
        return ''
      }
      return `[${moment(message.sentOn).format(timeFormat)}] ${message.authorId ? 'User' : botId}: ${getMessageContent(
        message,
        type
      )}\r\n`
    })

    return [metadata, ...messagesAsTxt].join('')
  }

  const router = bp.http.createRouterForBot('conv', { checkAuthentication: false })
  router.get('/', async (req, res) => {
    try {
      const appSecret = (await bp.config.getBotpressConfig()).appSecret
      const data = req.query.data

      const decodedData = Buffer.from(data, 'base64').toString('ascii')

      const decipher = crypto.createDecipheriv('aes-256-ctr', appSecret.substring(0, 32), appSecret.substring(0, 16))
      let decryptedData = decipher.update(decodedData, 'base64', 'utf8')
      decryptedData += decipher.final('utf8')

      const conversationId = decryptedData
      const botId = req.params.botId

      const messaging = bp.messaging.forBot(botId)
      const conversation = await messaging.getConversation(conversationId)
      const messages = await messaging.listMessages(conversationId)

      const txt = await convertToTxtFile(botId, { ...conversation, messages })

      const fileName = 'transcript_conversation_conversationId.txt'
      const fileType = 'text/plain'

      res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': fileType
      })

      const download = Buffer.from(txt, 'utf8')
      res.end(download)
    } catch (e) {
      bp.logger.attachError(e).error('Error getting the conversation transcript')
      res.send('Error, unable to get a valid conversation, request a new link and try again.')
    }
  })