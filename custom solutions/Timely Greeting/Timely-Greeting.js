/**
   * Greets the user with either a monrning, afternoon, or evening greeting as appropriate. It can take greetings as parameters, or refrence content elements by ID, or use default greetings.
   * @title Timely Greeting
   * @category Custom
   * @author Botpress
   * @param {string} morning_greeting - the message to send in the morning
   * @param {string} afternoon_greeting - the message to send in the afternoon
   * @param {string} evening_greeting - the message to send in the evening
   */
  const moment = require('moment')
  const _ = require('lodash')
  const myAction = async (morning, afternoon, evening) => {
    // Default greetings. To use existing content elements, uncomment the bp.cms and add the element ID
    if (!morning) morning = 'Good morning ' //await bp.cms.getContentElement(event.botId, 'Your Content ID')
    if (!afternoon) afternoon ='Good afternoon' // await bp.cms.getContentElement(event.botId, 'builtin_text-oDDwIp')
    if (!evening) evening = 'Good evening' //await bp.cms.getContentElement(event.botId, "Your Content ID")
    var message = 'Hello'
    //gets the user's hour as an int from 0 to 23
    const currentTime = parseInt(
      moment()
        .zone(user.timezone.toString())
        .format('HH')
    )
    //Modify these numbers to control when exactly morning, afternoon, and evening are
    if (currentTime >= 0 && currentTime <= 11) {
      message = morning
    }
    if (currentTime >= 12 && currentTime <= 16) {
      message = afternoon
    }
    if (currentTime >= 17 && currentTime <= 23) {
      message = evening
    }
    // Create the text content element
    if (message.formData) {
      const allTexts = _.concat(message.formData.variations$en, message.formData.text$en)
      var selectedText = _.sample(allTexts)
      var payload = await bp.cms.renderElement('builtin_text', { text: selectedText, event }, event)
    } else {
      var payload = await bp.cms.renderElement('builtin_text', { text: message, event }, event)
    }
    // Send it!
    bp.events.replyToEvent(event, payload)
  }
  return myAction(args.morning_greeting, args.afternoon_greeting, args.evening_greeting)
