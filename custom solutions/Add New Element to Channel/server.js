const axios = require('axios')

const forwardToPrevious = async request => {
  const bpConfig = await bp.config.getBotpressConfig()
  try {
    // const axiosConfig = await bp.http.getAxiosConfigForBot(botId)
    const axiosResponse = await axios({
      url: bpConfig.httpServer.externalUrl + '/api/v1/messaging/webhooks/' + botId + '/slack/interactive',
      headers: request.headers,
      body: request.body,
      method: 'post'
    })
    return axiosResponse.body
  } catch (error) {
    bp.logger.forBot(botId).info('could not forwards', error.message)
    bp.logger.forBot(botId).info(JSON.stringify(error))
  }
}

const getUserIdsFromSlackId = async slackId => {
  const getUserIds = async query => {
    const result = await bp.database.raw(query)
    return result ? result.map(a => a.userId) : []
  }

  const userIds = await getUserIds(
    `SELECT m.userId FROM msg_usermap m, msg_senders s WHERE s.id = m.senderId AND s.name = '${slackId}'`
  )
  return userIds
}

const savePayload = async payload => {
  const formValues = {}

  for (const key in payload.state.values) {
    const formInput = Object.values(payload.state.values[key])[0]

    const formInputId = Object.keys(payload.state.values[key])[0]

    if (formInput.type === 'plain_text_input') {
      formValues[formInputId] = formInput.value
    } else if (formInput.type === 'static_select' && formInput.selected_option) {
      formValues[formInputId] = formInput.selected_option.text.text
    }
  }

  const slackUserId = payload.user.id

  const userIds = await getUserIdsFromSlackId(slackUserId)

  for (const userId of userIds) {
    await bp.users.updateAttributes('slack', userId, { sendToTemp: { formValues } })
  }
}

//initialize api
const router = bp.http.createRouterForBot('slack', { checkAuthentication: false })
router.post('/interaction', async (request, response) => {
  const payload = JSON.parse(request.body.payload)
  // bp.logger.forBot(botId).info('payload', request.body.payload)

  if (payload.type === 'block_actions') {
    // save data to variables
    try {
      await savePayload(payload)
    } catch (e) {
      bp.logger.forBot(botId).info('error', e.message)
    }
    response.send({ success: true })
  }

  // you can choose to run this or not every time
  const body = await forwardToPrevious(request)
  response.send(body)
})
