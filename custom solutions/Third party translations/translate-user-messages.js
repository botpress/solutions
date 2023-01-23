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
   *    - Only XXX languages available
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
          bp.logger.forBot(event.botId).info(`Huggingface translated user text to: ${translatedText}`)
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
          bp.kvs.forBot(event.botId).set('lang', response.data.translations[0].detected_source_language)
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
          bp.logger.info(`Google response:\n ${JSON.stringify(response.data.data)}`)
          translatedText = response.data.data.translations[0].translatedText
          bp.kvs.forBot(event.botId).set('lang', response.data.data.translations[0].detectedSourceLanguage)
          bp.logger.forBot(event.botId).info(`Google translation: ${translatedText}`)
        }
      })
      .catch(error => {
        bp.logger.forBot(event.botId).error(`Error translating user text:\n${error}`)
      })
    return translatedText
  }

  // Main function
  const translateUserText = async () => {
    if (event.type === 'text') {
      let config = await getConfig('google') // Change this when changing translation service!
      let userText = event.payload.text
      /** Modify the next line to use your translation service of choice
       * DeepL-
       *  await translateDeepL(userText, config.endpoint, config.token, config.defaultLanguage)
       * HuggingFace model-
       *  await translateHuggingface(userText, config.endpoint, config.token)
       * Google Translate-
       *  await translateGoogle(userText, config.endpoint, config.token, config.defaultLanguage)
       */

      await translateGoogle(userText, config.endpoint, config.token, config.defaultLanguage).then(translatedText => {
        event.payload.text = translatedText ? decodeURIComponent(translatedText) : event.payload.text
      })

      // event.preview = translatedText !== undefined ? translatedText : event.preview
    }
  }
  return translateUserText()
