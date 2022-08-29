  /**
   * Increments a variable by a specific amount. Creates a variable with a value of 0 if none exists.
   * @title Increment variable by n
   * @category Custom
   * @author Botpress
   * @param {string} scope - user, session, temp, or bot
   * @param {string} name - the variable name
   * @param {int} n - the amount to increment by
   */
  const DEFAULT_VALUE = 0
  const myAction = async (scope, name, n) => {
    if (scope === 'bot') {
      const original = await bp.kvs.forBot(event.botId).get('global')
      if (original == undefined) {
        await bp.kvs.forBot(event.botId).set('global', { ...original, [name]: DEFAULT_VALUE })
      } else {
        const value = original[name] ? parseInt(original[name]) + n : DEFAULT_VALUE
        await bp.kvs.forBot(event.botId).set('global', { ...original, [name]: value })
      }
      bp.logger.info(await bp.kvs.forBot(event.botId).get('global'))
    } else if (scope != undefined && scope != '') {
      event.state[scope][name] =
        typeof event.state[scope][name] != 'undefined'
          ? parseInt(JSON.stringify(event.state[scope][name])) + n
          : DEFAULT_VALUE
      bp.logger.info(`${scope}, ${name}, ${n}, ${JSON.stringify(Boolean(event.state[scope][name]))} `)
    } else bp.logger.forBot(event.botId).warn(`Please specify a variable scope`)
  }
  return myAction(args.scope, args.name, parseInt(args.n))
