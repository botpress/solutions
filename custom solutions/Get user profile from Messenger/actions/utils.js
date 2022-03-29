const getUserIdFromTarget = async (eventTarget, bp) => {
  const getName = async query => {
    const result = await bp.database.raw(query)
    return result.rows ? result.rows[0].name : result[0].name
  }

  const userId = await getName(
    `SELECT name FROM msg_senders s, msg_usermap m WHERE s.id = m."senderId" AND m."userId" = '${eventTarget}'`
  )

  return userId
}

const getMessengerConfig = async (botId, bp) => {
  const config = await bp.bots.getBotById(botId)
  const channels = config.messaging.channels

  if (!channels || !channels.messenger) {
    return bp.logger.warn(`Messenger channel is not configured properly`)
  }

  const { accessToken } = channels.messenger
  return { accessToken }
}

module.exports = { getUserIdFromTarget, getMessengerConfig }
