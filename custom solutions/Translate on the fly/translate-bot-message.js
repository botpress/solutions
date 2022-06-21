  const axios = require('axios')
  // First get the language and API info from bot.config.json. Ignore type errors.
  async function getConfig(service) {
    const data = await bp.ghost.forBot(event.botId).readFileAsObject('.', 'bot.config.json')
    if (data.defaultLanguage && data.languages && data.translation[service]) {
      let { defaultLanguage, languages } = data
      let { endpoint, token } = data.translation[service]
      return {
        defaultLanguage: defaultLanguage,
        additionalLanguages: languages,
        endpoint: endpoint,
        token: token
      }
    } else return undefined
  }

  /** Translate text using a model from https://huggingface.co/
   * Pros:
   *    - Models are free to use, no credit card needed
   *    - Models are fast and translate well
   *    - POST request hides & protects your data
   * Cons:
   *    - Free tier is limited to 30,000 chars per month
   *    - Language availbility varies by model
   *    - Additional model needed for language detection
   */

  async function translateHuggingface(text, endpoint, token) {
    let translatedText = undefined
    await axios({
      url: endpoint,
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        inputs: [text]
      }
    })
      .then(response => {
        if (response.status === 200) {
          translatedText = response.data[0].translation_text
          bp.logger.forBot(event.botId).info(`Huggingface translated bot text to: ${translatedText}`)
        }
      })
      .catch(error => {
        bp.logger.forBot(event.botId).error(`Error translating user text:\n${error}`)
      })
    return translatedText
  }

  /** Translate text using https://deepl.com
   * Pros:
   *    - Free tier allows up to 500,000 chars/month
   *    - Translations are fast and accurate
   *    - Auto language detection
   * Cons:
   *    - Credit card required even for free tier
   *    - GET request makes your data public
   *    - DeepL only supports about 30 languages
   */
  async function translateDeepL(text, endpoint, token, lang) {
    let translatedText = undefined
    await axios({
      url: endpoint + `?auth_key=${token}&text=${encodeURIComponent(text)}&target_lang=${lang}`,
      method: 'get'
    })
      .then(response => {
        if (response.status === 200) {
          translatedText = response.data.translations[0].text
          bp.logger.forBot(event.botId).info(`DeepL translation: ${translatedText}`)
        }
      })
      .catch(error => {
        bp.logger.forBot(event.botId).error(`Error translating user text:\n${error}`)
      })
    return translatedText
  }

  /** Translate text using Google Translate
   * Pros:
   *    - $300 credit when you register a new account
   *    - Auto-detects languages
   *    - Largest language availability
   * Cons:
   *    - Credit card required
   *    - No free tier
   */
  async function translateGoogle(text, endpoint, token, lang) {
    let translatedText = undefined
    await axios({
      url: endpoint + `?key=${token}`,
      method: 'post',
      data: {
        q: text,
        target: lang
      }
    })
      .then(response => {
        if (response.status === 200) {
          translatedText = response.data.data.translations[0].translatedText
          bp.logger.forBot(event.botId).info(`Google translation: ${translatedText}`)
        }
      })
      .catch(error => {
        bp.logger.forBot(event.botId).error(`Error translating user text:\n${error}`)
      })
    return translatedText
  }

  const translateBotMessage = async () => {
    bp.logger.info(event.payload)
    let config = await getConfig('google') //Change this when changing translation service!
    let lang = ''
    let sourceArr = []
    if (event.payload.text) {
      sourceArr.push(event.payload.text)
    }
    if (event.payload.title) {
      sourceArr.push(event.payload.title)
    }
    if (event.payload.subtitle) {
      sourceArr.push(event.payload.subtitle)
    }
    if (event.payload.actions) {
      event.payload.actions.forEach(action => {
        sourceArr.push(action.title)
      })
    }
    if (event.payload.choices) {
      event.payload.choices.forEach(choice => {
        sourceArr.push(choice.title)
      })
    }
    if (bp.kvs.forBot(event.botId).exists('lang')) {
      lang = await bp.kvs.forBot(event.botId).get('lang')
      bp.logger.info(`Language is ${lang}`)
    }
    /** Modify the next line to use your translation service of choice
     * DeepL-
     *  await translateDeepL(userText, config.endpoint, config.token, lang)
     * HuggingFace model-
     *  await translateHuggingface(userText, config.endpoint, config.token)
     * Google Translate-
     *  await translateGoogle(userText, config.endpoint, config.token, lang)
     */
    await translateGoogle(sourceArr.join('+?'), config.endpoint, config.token, lang).then(translatedText => {
      bp.logger.info(translatedText)
      let translatedArr = decodeURIComponent(translatedText).split('+?') ? translatedText.split('+?') : [translatedText]
      if (event.payload.text && translatedArr.length > 0) {
        event.payload.text = translatedArr.shift()
      }
      if (event.payload.title && translatedArr.length > 0) {
        event.payload.title = translatedArr.shift()
      }
      if (event.payload.subtitle && translatedArr.length > 0) {
        event.payload.subtitle = translatedArr.shift()
      }
      if (event.payload.actions && translatedArr.length > 0) {
        event.payload.actions.forEach(action => {
          action.title = translatedArr.shift()
        })
      }
      if (event.payload.choices && translatedArr.length > 0) {
        event.payload.choices.forEach(choice => {
          choice.title = translatedArr.shift()
        })
      }
    })
  }
  return translateBotMessage()
