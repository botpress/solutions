import * as sdk from 'botpress/sdk'
import { asyncMiddleware as asyncMw, BPRequest } from 'common/http'
import { MODULE_NAME } from '.'

export default async (bp: typeof sdk) => {
  const asyncMiddleware = asyncMw(bp.logger)

  const router = bp.http.createRouterForBot(MODULE_NAME, { checkAuthentication: false })

  router.post(
    '/messenger',
    asyncMiddleware(async (req, res) => {
      const { botId } = req.params

      const moduleConfig = await bp.config.getModuleConfigForBot(MODULE_NAME, botId)
      if (!moduleConfig.enabled) {
        bp.logger.warn('Module is not enabled for bot')
        return res.sendStatus(200)
      }

      const { userId, conversationId, payload } = req.body
      await bp.users.getOrCreateUser('messenger', userId, botId)

      const event = bp.IO.Event({
        botId,
        channel: 'messenger',
        direction: 'incoming',
        target: userId,
        threadId: conversationId.toString(),
        type: payload?.type,
        payload
      })

      await bp.events.sendEvent(event)
      res.sendStatus(200)
    })
  )
}
