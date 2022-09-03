  const _ = require('lodash')

  //Leave it empty if you want it to be allowed always
  //or you can add a folder name to allow it to all flows under a folder 'Common/'
  //or you can allow it to all nodes of specific type 'skills/choice'
  const allowed_whitelist = ['main']

  //if the question has a redirection, it should be ignored completely
  const ignore_redirection_questions = false

  //remove only the redirection part of the question
  const remove_redirectionPart_questions = true

  //the accepted confidence for the QnA
  const qna_accepted_confidence = 0.7

  //ignore QnA when the bot is expecting the user to reply back
  const ignore_when_waitNode = false

  //ignore when what the user said is exact to one of the choice field answers
  const ignore_when_choiceAnswer = true

  let { currentFlow, currentNode } = event.state.context
  async function hook() {
    //if there is no choosen QNA, then don't continue
    if (!suggestions.length || !suggestions[0].decision) {
      return
    }

    const suggestion = suggestions[0]

    //get the decision for the highest selected QnA
    const decision = suggestion.decision

    if (
      decision.status === 'dropped' &&
      decision.reason.includes('already in the middle of a flow') &&
      suggestion.confidence > qna_accepted_confidence
    ) {
      //if it is not allowed node/flow then don't continue
      if (!checkAllowedItemRule()) {
        return
      }

      if (!checkRedirectionRule(suggestion)) {
        return
      }

      const flow = currentFlow && (await bp.ghost.forBot(event.botId).readFileAsObject('flows', currentFlow))
      if (flow && ((await matchesQuickReply(flow)) || (await inWaitNode(flow)))) {
        return
      }

      // We're changing the election results
      // The QnA will be answered to the user instead of continuing the flow
      decision.status = 'elected'
      decision.reason = 'Direct Q&A question detected - calling up answer.'

      if (currentFlow.startsWith('skills/choice')) {
        currentFlow = event.state.context.previousFlow
        currentNode = event.state.context.previousNode
      }

      if (remove_redirectionPart_questions) {
        // and we are making the bot moving back to the previous flow right after answering the
        // users questions but removing the redirections of the QnA itself
        suggestion.payloads = [
          suggestion.payloads[0],
          {
            type: 'redirect',
            flow: currentFlow,
            node: currentNode
          }
        ]
      } else {
        suggestion.payloads = [
          ...suggestion.payloads,
          {
            type: 'redirect',
            flow: currentFlow,
            node: currentNode
          }
        ]
      }
    }
  }

  const checkAllowedItemRule = async () => {
    //check if context and currentFlow are not empty
    if (event.state.context && currentFlow && allowed_whitelist.length > 0) {
      //Is the current flow start with one of the allowed items?
      return (
        allowed_whitelist.filter(allowed_item => {
          currentFlow.startsWith(allowed_item) ||
            //This needs revise
            event.state.context.previousFlow.startsWith(allowed_item)
        }).length > 0
      )
    } else if (allowed_whitelist.length == 0) {
      return true
    }

    return false
  }

  const checkRedirectionRule = async suggestion => {
    if (ignore_redirection_questions) {
      let redirectIndx = _.findIndex(suggestion.payloads, function(o) {
        return o.type == 'redirect'
      })

      // exit if the current the QnA has a redirection.
      if (redirectIndx > -1) {
        return false
      }
    }

    return true
  }

  const matchesQuickReply = async flow => {
    if (ignore_when_choiceAnswer) {
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
    }

    return false
  }

  const inWaitNode = async flow => {
    if (ignore_when_waitNode) {
      const node = _.find(flow.nodes, node => node.name === currentNode)
      return node && node.onReceive != null
    }

    return false
  }

  return hook()