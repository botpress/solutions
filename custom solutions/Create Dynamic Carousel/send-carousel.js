  /**
   * Renders a carousel of random numbers
   * @title Dynamic Carousel Example
   * @category Solutions
   * @author Botpress
   * @param quantity - the number of cards to render in a carousel. Maximum of 10
   */
  const axios = require('axios')

  // A carousel is nothing but an array of cards, this helper function will create a card from a given set of parameters
  function makeCard(num, buttonTitle) {
    if (!num || !buttonTitle) return
    bp.logger.info(`Making a card with title ${num} and string ${buttonTitle}`)
    let title
    let subtitle
    const isEven = num % 2 == 0
    if (event.channel === 'web') {
      title = `${num}`
      subtitle = `Is ${num} even? ${isEven}`
    } else {
      title = `${num}`
      subtitle = `Is ${num} even? ${isEven}`
    }
    //bp.experimental.render can also render action buttons and postback buttons
    // see docs in the SDK here: https://botpress.com/reference/modules/_botpress_sdk_.experimental.render.html
    const button = bp.experimental.render.buttonUrl(buttonTitle, 'https://en.wikipedia.org/wiki/Special:Random')
    return bp.experimental.render.card(
      title,
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dice_2005.jpg/238px-Dice_2005.jpg',
      subtitle,
      button
    )
  }

  const sendCarousel = async quantity => {
    if (!quantity) {
      return bp.logger.forBot(event.botId).warn('Please specify a quantity of cards to render')
    }
    if (parseInt(quantity) > 10) {
      return bp.logger.forBot(event.botId).warn('The maximum number of cards to render is 10')
    } else {
      var numResponse = await axios.get(
        `https://www.random.org/integers/?num=${quantity}&min=1&max=100&col=1&base=10&format=plain&rnd=new`
      )
      var strResponse = await axios.get(
        `https://www.random.org/strings/?num=${quantity}&len=8&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain&rnd=new`
      )
      var numbers = numResponse.data.split('\n')
      var strings = strResponse.data.split('\n')
      let cards = new Array()
      numbers.forEach((num, i) => {
        cards.push(makeCard(num, strings[i]))
      })
      cards = cards.filter(n => n) //removing any null objects in the array
      const carousel = bp.experimental.render.carousel(...cards)
      return bp.events.replyToEvent(event, [carousel])
    }
  }
  return sendCarousel(args.quantity)
