const axios = require('axios')
const qs = require('query-string')

const sendPicker = async (isDateRange, isMinToday, configJson) => {
  const { botId, channel, target, threadId, state } = event
  const locale = state.user.language

  if (channel === 'web') {
    const payload = [
      {
        type: 'custom',
        module: 'date-picker',
        component: 'WebPicker',
        locale,
        isDateRange,
        isMinToday,
        configJson,
        noBubble: true,
        typing: true
      }
    ]

    await bp.events.replyToEvent(event, payload, event.id)
  } else if (channel === 'messenger') {
    const config = await bp.bots.getBotById(botId)
    const channels = config.messaging.channels

    if (!channels || !channels.messenger) {
      return
    }

    const getPageId = async () => {
      const { data } = await axios.get(
        `https://graph.facebook.com/v3.2/me?access_token=${channels.messenger.accessToken}`
      )
      return data.id
    }

    const getMessagingInfo = async () => {
      const getName = async query => {
        const result = await bp.database.raw(query)
        return result.rows ? result.rows[0].name : result[0].name
      }

      const userId = await getName(
        `SELECT name FROM msg_senders s, msg_usermap m WHERE s.id = m."senderId" AND m."userId" = '${event.target}'`
      )

      return { userId }
    }

    const sendPickerToUser = async fbRealId => {
      const modConfig = await bp.config.getModuleConfigForBot('date-picker', event.botId)
      const serverUrl = modConfig.messenger.customUrl || process.EXTERNAL_URL

      const params = qs.stringify({ target, botId, threadId, locale, isDateRange, isMinToday, configJson })

      const payload = {
        recipient: { id: fbRealId },
        message: {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: '.',
              buttons: [
                {
                  type: 'web_url',
                  url: `${serverUrl}/lite/${botId}/?m=date-picker&v=MessengerPicker&${params}`,
                  title: 'Select date',
                  webview_height_ratio: 'compact',
                  messenger_extensions: true
                }
              ]
            }
          }
        }
      }

      const { data } = await axios.post(
        `https://graph.facebook.com/v12.0/me/messages?access_token=${channels.messenger.accessToken}`,
        payload
      )

      return data
    }

    try {
      const { userId } = await getMessagingInfo()
      if (!userId) {
        bp.logger.warn("Couldn't send message", { target, userId })
        return
      }

      const pageId = await getPageId()
      await sendPickerToUser(userId, pageId)
    } catch (err) {
      bp.logger.attachError(err).error(`Error while fetching details for user`, { target })
    }
  }
}

return sendPicker(args.isDateRange, args.isMinToday, args.configJson)
