  /**
   * Create and show a single choice element with advanced configuration options
   * @title Advanced Dynamic Choice
   * @category Custom
   * @author Botpress
   * @param {int} quantity - How many choices to render
   * @param {string} variableName - Name of the variable to store choice information
   */

  const axios = require('axios')

  //This helper function will define the synonym for each possible random number so that the user can click on "1" or type "one"
  // and the bot will still understand
  function intToWord(num) {
    const map = {
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten'
    }
    return map[num] ? map[num] : num
  }

  const myAction = async (quantity, variableName) => {
    // Get the random number & create the choice array
    var numResponse = await axios.get(
      `https://www.random.org/integers/?num=${quantity}&min=1&max=10&col=1&base=10&format=plain&rnd=new`
    )
    var nums = numResponse.data.split('\n')
    let choices = []
    nums.forEach(num => {
      num ? choices.push({ title: num, value: num, synonyms: [intToWord(num)] }) : undefined
    })
    choices = choices.filter(n => n)

    //These options will appear to the user. This time we make sure free text is enabled
    const payloads = await bp.cms.renderElement(
      'builtin_single-choice',
      {
        text: 'Pick a number!',
        typing: true,
        choices: choices,
        disableFreeText: false
      },
      event
    )

    // Create temporary variables for the choices(all)
    if (!temp.choice) {
      temp.choice = {}
    }
    // Create temporary variables for our choice
    if (!temp.choice[variableName]) {
      temp.choice[variableName] = {}
    }

    // In order to validate that the user's input is a valid choice, we need to save the choices in flow memory
    temp.choice[variableName].choices = choices

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

  return myAction(args.quantity, args.variableName)
