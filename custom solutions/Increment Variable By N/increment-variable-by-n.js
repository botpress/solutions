  /**
   * Increments a variable by a specific amount. Creates a variable with a value of 0 if none exists.
   * @title Increment variable by n
   * @category Custom
   * @author Botpress
   * @param {string} scope - user, session, temp, or bot
   * @param {string} name - the variable name
   * @param {int} n - the amount to increment by
   */
  const myAction = async (scope, name, n) => {
    if (scope === 'bot') {
      const original = await bp.kvs.forBot(event.botId).get('global')
      if (original == undefined) {
        await bp.kvs.forBot(event.botId).set('global', { ...original, [name]: 0 })
      } else {
        const value = original[name] ? parseInt(original[name]) + n : 0
        await bp.kvs.forBot(event.botId).set('global', { ...original, [name]: value })
      }
      bp.logger.info(await bp.kvs.forBot(event.botId).get('global'))
    } else if (scope != undefined && scope != '') {
      event.state[scope][name] = event.state[scope][name] ? parseInt(event.state[scope][name]) + n : 0
    } else bp.logger.forBot(event.botId).warn(`Please specify a variable scope`)
  }

  return myAction(args.scope, args.name, parseInt(args.n))
