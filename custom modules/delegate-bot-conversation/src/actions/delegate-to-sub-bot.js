const axios = require('axios')
const _ = require('lodash')

const findResponses = axiosData => {
  const responses = []
  if (axiosData && axiosData.responses) {
    for (let response of axiosData.responses) {
      if (response.type != 'custom' || event.channel != 'telegram') {
        if (response.type === 'end_delegation') {
          temp.endDelegation = true
        } else {
          responses.push(response)
        }
      } else if (response.component == 'QuickReplies') {
        // This will fix the issue caused by an outgoing hook from channel-web
        responses.push({
          ...response.wrapped,
          quick_replies: response.quick_replies
        })
      }
    }
  }

  return responses
}

const postConverse = async (userId, text, axiosConfig) => {
  const { data } = await axios
    .post(
      `/converse/${userId}/secured`,
      {
        type: 'text',
        text: text || event.preview,
        userIdentity: user.identity || {},
        includedContexts: ['global']
      },
      { ...axiosConfig, params: { include: 'nlu' } }
    )
    .catch(() => ({ data: {} /* We don't want the error to crash the master bot */ }))

  return data
}

/**
 * Delegate conversation to another bot
 * @title Delegate Bot Conversation
 * @category Delegation
 * @author Botpress
 * @param {string} bots - Comma separated list of Bot Ids. If only 1 bot Id is suppled, this will be a point to point communication and confidence will be ignored. IF there are multiple bots, only bots with a detected intent other than "none" will be considered
 * @param {string} text - If set, Text to be used as the first message when initiating a session with a sub bot rather than using event.preview
 * @param {string} intent - Intent to force end delegation
 */
const exec = async (bots, text, intent) => {
  // If the user types something with the intent of exiting the conversation with bot 2
  // We dont execute the function and just return, this intent can be changed
  if (event.nlu.intent.name == intent) {
    return
  }

  if (!session.delegation) {
    session.delegation = {}
  }

  let delegation = session.delegation

  // Create a session with the target bot, if we don’t have it yet
  if (!delegation.uniqueUserId || !delegation.axiosConfig) {
    const random = Math.random()
      .toString()
      .substr(3, 8)
    const uniqueUserId = `delegate_${event.target}_${random}`

    const botIds = bots
      .split(',')
      .map(x => x.trim())
      .filter(x => x.length)

    const matches = []

    for (let botId of botIds) {
      const axiosConfig = await bp.http.getAxiosConfigForBot(botId, { localUrl: true })
      const data = await postConverse(uniqueUserId, text || event.preview, axiosConfig)

      // if botIds length is > 1 this is a broadcast and we want confident score on relevant intents
      // if botIds === 1, then its a point to point communication and intent score is irrelevant
      if (botIds.length === 1 || data.nlu.intent.name !== 'none') {
        matches.push({
          confidence: data.nlu.intent.confidence,
          botId,
          uniqueUserId,
          axiosConfig,
          responses: findResponses(data)
        })
      }
    }
    //TODO: ADD VALIDATION IF NO SUB BOT MATCHS
    const orderedMatches = _.orderBy(matches, 'confidence', 'desc')
    delegation = orderedMatches[0]
    session.delegation = delegation
  } else {
    const data = await postConverse(delegation.uniqueUserId, event.preview, delegation.axiosConfig)

    delegation.responses = findResponses(data)
    session.delegation = delegation
  }

  // Sends to the user what the target bot responded
  bp.events.replyToEvent(
    {
      botId: event.botId,
      channel: event.channel,
      target: event.target,
      threadId: event.threadId
    },
    delegation.responses,
    event.id
  )
}

return exec(args.bots, args.text, args.intent).catch(e => (temp.errorDelegation = true))
