import * as sdk from 'botpress/sdk'
import BotKitTool from './migrate'

export default async (bp: typeof sdk) => {
  /**
   * This is an example route to get you started.
   * Your API will be available at `http://localhost:3000/api/v1/bots/BOT_NAME/mod/botkit-migration-tool`
   * Just replace BOT_NAME by your bot ID
   */
  const router = bp.http.createRouterForBot('botkit-migration-tool', { checkAuthentication: false })

  const authMdw = async (req, res, next) => {
    const botId = req.params.botId
    const token = req.query.token
    const { secret } = await bp.config.getModuleConfigForBot('botkit-migration-tool', botId)
    if (!token) {
      res.status(401).json({
        error: 'auth token missing'
      })
    } else if (!token === secret) {
      res.status(401).json({
        error: 'auth token not valid'
      })
    } else {
      next()
    }
  }

  // Link to access this route: http://localhost:3000/api/v1/bots/BOT_NAME/mod/botkit-migration-tool/migrate
  router.get('/migrate', authMdw, async (req, res) => {
    // Since the bot ID is required to access your module,
    const botId = req.params.botId
    const lang = req.query.lang
    const flow = req.query.flow

    if (!flow || !lang) {
      return res.status(400).json({
        error: 'Missing required query parameters'
      })
    }

    const botKitTool = new BotKitTool(bp, botId)

    // list flows availaible
    const flows = await botKitTool.listFlows()
    const flowFile = `${flow}.flow.json`
    // check if flows availaible includes requested flow
    if (!flows.includes(flowFile)) {
      return res.status(400).json({
        error: 'flow not found'
      })
    }
    // load bot.config languages
    const botConfig = await botKitTool.getBotConfig()

    if (!botConfig) {
      return res.status(400).json({
        error: 'botConfig not found'
      })
    }
    // check if available languages includes lang
    const languages = botConfig.languages || []
    if (!languages.includes(lang.toLowerCase())) {
      return res.status(400).json({
        error: 'language not available'
      })
    }

    // trigger migration function passing selected flow and language
    const botKitFlow = await botKitTool.migrateFlow(flowFile, lang.toLowerCase())

    if (!botKitFlow) {
      return res.status(400).json({
        error: 'something went wrong'
      })
    }

    return res.status(200).json({
      data: botKitFlow
    })
  })
}
