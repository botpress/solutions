const axios = require('axios')
const _ = require('lodash')
const yn = require('yn')

/**
 * This action will send the QnA answers to the user.
 * Tip: set the value of a choice/dropdown to the ID of a qna, then set qnaId to {{event.payload.payload}}
 * @title Send a specific QnA to a user
 * @category Hotel Manager
 * @author Botpress
 * @param {string} qnaId The ID of the QNA to send to the user
 * @param {boolean} [collectFeedback=true] Whether or not to include thumbs up/down (true or false)
 * @param {boolean} [followRedirect=false] Whether or not follow the qna redirection (true or false)
 */
const sendQna = async (id, collectFeedback, followRedirect) => {
  bp.logger.info('SendQna', id)

  event.suggestions.forEach(s => {
    s.decision.status = 'dropped'
    s.decision.reason = 'Sending a custom QNA, ignoring resolution'
  })

  const qnaId = id.startsWith('__qna__') ? id : `__qna__${id}`

  const config = await bp.http.getAxiosConfigForBot(event.botId, { localUrl: true })
  const { data } = await axios.post('qna/intentActions', { intentName: qnaId, event }, config)

  const content = data.filter(x => x.action === 'send')
  const payloads = _.flatMap(content, x => x.data.payloads)
  payloads.forEach(x => (x.collectFeedback = yn(collectFeedback)))

  await bp.events.replyToEvent(event, payloads, event.id)

  if (yn(followRedirect)) {
    const redirect = data.find(x => x.action === 'redirect')

    if (redirect && redirect.data) {
      const { flow, node } = redirect.data
      await bp.dialog.jumpTo(bp.dialog.createId(event), event, flow, node)
      return
    }
  }

  event.setFlag(bp.IO.WellKnownFlags.SKIP_DIALOG_ENGINE, true)
}

return sendQna(args.qnaId.toLowerCase().trim(), args.collectFeedback, args.followRedirect)
