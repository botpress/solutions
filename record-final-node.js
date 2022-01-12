  bp.logger.info('attempting data insert...')
  try {
    bp.database.insertAndRetrieve('last_nodes', {
      session_id: event.threadId,
      last_flow: event.state.context.currentFlow,
      last_node: event.state.context.currentNode
    })
    bp.logger.info('Last node insert successful')
  } catch (error) {
    bp.logger.info(error)
  }