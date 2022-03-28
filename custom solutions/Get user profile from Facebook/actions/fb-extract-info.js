const axios = require('axios')
const utils = require('./utils')
/**
 * This action tries to fetch the user's information from Facebook.
 * It will set user.language, user.timezone and user.fullName
 * @title Fetch user profile
 * @category Messenger
 * @author Botpress
 */
const extractInfo = async () => {
  if (event.channel !== 'messenger') {
    return
  }

  const config = await utils.getMessengerConfig(event.botId, bp)
  if (!config || !config.accessToken) {
    bp.logger.warn('Messenger channel is not configured properly')
    return
  }

  const getProfile = async (userId) => {
    const fields = 'fields=first_name,last_name,profile_pic,locale,timezone,gender'

    const { data } = await axios.get(
      `https://graph.facebook.com/${userId}?${fields}&access_token=${config.accessToken}`
    )
    return data
  }

  try {
    const userId = await utils.getUserIdFromTarget(event.target, bp)
    if (!userId) {
      bp.logger.warn("Couldn't get the user' messaging identity from messaging", {
        target: event.target,
        userId
      })
      return
    }

    const cleanLanguageCode = (str) => str.split('_')[0]
    const info = await getProfile(userId)

    user.fullName = `${info.first_name} ${info.last_name}`
    user.timezone = info.timezone
    user.language = cleanLanguageCode(info.locale)
  } catch (err) {
    bp.logger.attachError(err).error(`Error while fetching details for user`, { target: event.target })
  }
}

return extractInfo()
