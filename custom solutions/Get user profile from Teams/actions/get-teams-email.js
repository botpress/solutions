const axios = require('axios')
​
  /**
   * Extract user informations from Microsoft Teams
   * @title Extract user name and email
   * @category Teams
   */
  const extractInfo = async () => {
    const config = await bp.bots.getBotById(event.botId)
    const channels = config.messaging.channels
​
    if (event.channel !== 'teams' || !channels || !channels.teams) {
      return
    }
​
    const { appId, appPassword, serviceUrl } = channels.teams
​
    const getTeamsMessagingInfo = async () => {
      const getName = async query => {
        const result = await bp.database.raw(query)
        return result.rows ? result.rows[0].name : result[0].name
      }
​
      const userId = await getName(
        `SELECT name FROM msg_senders s, msg_usermap m WHERE s.id = m.senderId AND m.userId = '${event.target}'`
      )
​
      const convId = await getName(
        `SELECT name FROM msg_threads s, msg_convmap m WHERE s.id = m.threadId AND m.conversationId = '${event.threadId}'`
      )
​
      return { userId, convId }
    }
​
    const getToken = async () => {
      const body = `grant_type=client_credentials&client_id=${appId}&client_secret=${appPassword}&scope=https://api.botframework.com/.default`
      const { data } = await axios.post('https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token', body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      return data.access_token
    }
​
    const getUserInfo = async (userId, convId) => {
      const url = `${serviceUrl || 'https://smba.trafficmanager.net/in/'}v3/conversations/${convId}/members/${userId}`
​
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      return data
    }
​
    try {
      const { userId, convId } = await getTeamsMessagingInfo()
      if (!userId || !convId) {
        bp.logger.warn("Couldn't get the user' teams identity from messaging", { target: event.target, userId, convId })
        return
      }
​
      const info = await getUserInfo(userId, convId)
​
      user.email = info.email
      user.fullName = info.name
    } catch (err) {
      bp.logger.attachError(err).error(`Error while fetching details for user`, { target: event.target })
    }
  }
​
  return extractInfo()