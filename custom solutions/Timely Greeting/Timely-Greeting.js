  /**
   * Greets the user with either a monrning, afternoon, or evening greeting as appropriate
   * Params can be:
   *
   * 1. Plain text /"Good Morning"/
   *
   * 2. Text content element Ids /"builting_text-wofnSd"/
   *
   * 3. Blank (Default value of /"Good ______"/ will apply)
   * @title Timely Greeting
   * @category Custom
   * @author Botpress
   * @param {string} morning_greeting - the message to send in the morning
   * @param {string} afternoon_greeting - the message to send in the afternoon
   * @param {string} evening_greeting - the message to send in the evening
   */
  const moment = require('moment')
  const _ = require('lodash')
  const isElement = /^builtin_text-[\S]{6}$/m
  // Define default greetings here
  const defaultGreetings = ['Good morning', 'Good afternoon', 'Good evening']
  // This is the default if something goes wrong
  var message = 'Hello'
  //Customize when each period starts or ends here.
  const schedule = {
    morningStart: 5,
    morningEnd: 11,
    afternoonEnd: 16
  }
  const myAction = async (morning, afternoon, evening) => {
    // Go through each parameter and, if it is a contentID, fetch the content element
    var messages = [morning, afternoon, evening]
    for (var i = 0; i < 3; i++) {
      var m = messages[i]
      if (!m) {
        messages[i] = defaultGreetings[i]
        bp.logger.info('Param is blank')
      }
      if (isElement.test(m)) {
        bp.logger.info('Param is a contentId')
        try {
          messages[i] = await bp.cms.getContentElement(event.botId, messages[i], user.language)
        } catch {
          bp.logger.forBot(event.botId).error(`Timely Greeting Error: contentID ${m} does not exist`)
        }
      } else continue
    }
    //gets the user's hour as an int from 0 to 23
    const currentTime = parseInt(moment().format('HH')) + parseInt(user.timezone)
    if (currentTime >= schedule.morningStart && currentTime <= schedule.morningEnd) {
      message = messages[0]
    } else if (currentTime > schedule.morningEnd && currentTime <= schedule.afternoonEnd) {
      message = messages[1]
    } else if (currentTime > schedule.afternoonEnd || currentTime <= schedule.morningStart) {
      message = messages[2]
    }
    // Create the text content element
    // Variations aren't randomly selected when content elements are sent via action
    // so we have to choose one manually
    if (message.formData) {
      const allTexts = _.concat(message.formData.text, message.formData.variations)
      message = _.sample(allTexts)
    }
    // We also need to isolate & evaluate any variables in {{double braces}}
    let textArr = []
    message.split(' ').forEach(word => {
      if (/^\{\{\S+\}\}$/.test(word)) {
        word = eval(word.substring(2, word.length - 2))
      }
      textArr.push(word)
    })
    var payload = await bp.cms.renderElement(
      'builtin_text',
      { type: 'text', text: textArr.join(' '), markdown: true, typing: true },
      event
    )
    // Send it!
    bp.events.replyToEvent(event, payload)
  }
  return myAction(args.morning_greeting, args.afternoon_greeting, args.evening_greeting)
