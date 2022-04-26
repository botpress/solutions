const _ = require('lodash')

const disabledForFlows = [
  // Disable for a whole flow or for a specific node
  { flow: 'skills/SFLiveAgent', node: undefined }
]

async function findLastNode() {
  const jumpPoints = event.state && event.state.context && event.state.context.jumpPoints
  const prevJumpPoint = _.findLast(jumpPoints, (j) => !j.used)
  return prevJumpPoint || {}
}

const shouldIgnoreHook = () => {
  const currentFlow = event.state.context.currentFlow || ''
  const currentNode = event.state.context.currentNode || ''

  const disabledFlow =
    currentFlow &&
    disabledForFlows.find((x) => currentFlow.startsWith(x.flow) && (x.node === undefined || x.node === currentNode))

  return !!disabledFlow
}

async function hook() {
  if (!suggestions.length || !suggestions[0].decision || event.type !== 'text') {
    return
  }

  if (shouldIgnoreHook()) {
    return bp.logger.info('Flow/Node in the send-qna-while-flow ignore list')
  }

  const suggestion = suggestions[0]
  const decision = suggestion.decision

  if (
    decision.status === 'dropped' &&
    decision.reason.includes('already in the middle of a flow') &&
    suggestions[0].confidence > 0.5
  ) {
    // We're changing the election results
    // The QnA will be answered to the user instead of continuing the flow
    decision.status = 'elected'
    decision.reason = 'Direct Q&A question detected - calling up answer.'
    // and we are making the bot move into the main flow after answering the question
    let doAfter = { type: 'redirect', flow: 'main.flow.json', node: 'entry' }
    // In case you don`t want to go back to the previous node and execute it again,
    // comment the line below
    doAfter = { ...doAfter, ...(await findLastNode()) }
    suggestion.payloads = [...suggestion.payloads, doAfter]
  }
}
return hook()
