  /**
   * Create and send a basic dynamic single-choice element
   * @title Basic Dynamic Choice
   * @category Custom
   * @author Botpress
   * @param {int} quantity - how many choices to render
   */

  const axios = require('axios')

  const dynamicSingleChoice = async quantity => {
    var numResponse = await axios.get(
      `https://www.random.org/integers/?num=${quantity}&min=1&max=100&col=1&base=10&format=plain&rnd=new`
    )
    var nums = numResponse.data.split('\n')
    let choices = []
    nums.forEach(num => {
      bp.logger.info(num)
      choices.push({ title: num, value: num })
    })
    choices = choices.filter(n => n)
    const payloads = await bp.cms.renderElement(
      'builtin_single-choice',
      {
        text: 'Pick a number!',
        typing: true,
        choices: choices
      },
      event
    )

    bp.events.replyToEvent(
      {
        botId: event.botId,
        channel: event.channel,
        target: event.target,
        threadId: event.threadId
      },
      payloads,
      event.id
    )
  }

  return dynamicSingleChoice(args.quantity)
