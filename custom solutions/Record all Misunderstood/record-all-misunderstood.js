
//CHECKSUM:c77a04abd238a1807bfc4654b5ad506d91e9f37af6ae2eb5af7b5b542d285e5c
const axios = require('axios')
const _ = require('lodash')

const { currentFlow, currentNode } = event.state.context

const matchesQuickReply = async flow => {
  if (currentFlow.startsWith('skills/choice')) {
    const preview = event.preview.toLowerCase()
    const kw = _.chain(flow.skillData.keywords)
      .values()
      .flatten()
      .find(kw => kw.toLowerCase() === preview.toLowerCase())
      .value()

    if (kw) {
      return true
    }
  }

  return false
}

const inWaitNode = async flow => {
  const node = _.find(flow.nodes, node => node.name === currentNode)
  return node && node.onReceive != null
}

const isMisunderstood = async () => {
    return (event.type === 'text' && event.nlu.intent.name === 'none') 
  }

const flag = async () => {
  if (!(await isMisunderstood())) {
    return
  }

  const language = [event.nlu.language, event.nlu.detectedLanguage, event.state.user.language].filter(
    l => l && l !== 'n/a'
  )[0]

  if (!language) {
    return
  }

  const data = {
    eventId: event.id,
    botId: event.botId,
    language,
    preview: event.preview,
    reason: 'auto_hook'
  }

  const axiosConfig = await bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })
  await axios.post('/mod/misunderstood/events', data, axiosConfig)
}

return flag()
