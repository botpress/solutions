const axios = require('axios')

/**
 * Extract user information from Slack
 * @title Extract slack user information
 * @category Slack
 */
const extractInfo = async () => {
  const config = await bp.bots.getBotById(event.botId)
  const channels = config.messaging.channels

  if (event.channel !== 'slack' || !channels || !channels.teams) {
    return
  }
  
  const getMessagingInfo = async () => {
    const getName = async query => {
      const result = await bp.database.raw(query)
      return result.rows ? result.rows[0].name : result[0].name
    }

    const userId = await getName(
      `SELECT name FROM msg_senders s, msg_usermap m WHERE s.id = m.senderId AND m.userId = '${event.target}'`
    )

    //Uncomment if you use it (conversation Id)
    /*const convId = await getName(
      `SELECT name FROM msg_threads s, msg_convmap m WHERE s.id = m.threadId AND m.conversationId = '${event.threadId}'`
    )*/

    return { userId }
  }

  const { userId } = await getMessagingInfo()
  const botToken = (await bp.bots.getBotById(event.botId)).messaging.channels.slack.botToken;
  
  const userInfoUrl = 'https://slack.com/api/users.profile.get?user=' + userId

  // Query Slack API
  const { data: userInfo } = await axios({
    method: 'get',
    url: userInfoUrl,
    headers: {
      Authorization: 'Bearer ' + botToken
    }
  })

  user.slackUser = userInfo
}

return extractInfo()
