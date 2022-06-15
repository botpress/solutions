import * as sdk from 'botpress/sdk'
import { asyncMiddleware as asyncMw } from 'common/http'
import multer from 'multer'

import { receiveFromUser } from './service'
import { asBytes, getUserId } from './utils'

export default async (bp: typeof sdk) => {
  const asyncMiddleware = asyncMw(bp.logger)

  const memStorage = multer.memoryStorage()
  const upload = multer({
    storage: memStorage,
    limits: {
      files: 1,
      fileSize: asBytes('10mb')
    }
  })

  const router = bp.http.createRouterForBot('riva', { checkAuthentication: false })
  router.post(
    '/sendAudio',
    upload.single('file'),
    asyncMiddleware(async (req, res) => {
      const { botId } = req.params
      const { conversationId, webSessionId } = req.body

      const visitorId = await bp.realtime.getVisitorIdFromGuestSocketId(webSessionId)
      const target = await getUserId(req.params.botId, visitorId, bp)

      if (!conversationId || !visitorId || !target || !req.file.buffer) {
        return res.status(400).send('One parameter is missing.')
      }

      const eventDestination = { target, threadId: conversationId, botId }
      const transcript = await receiveFromUser(req.file.buffer, visitorId, eventDestination, bp)

      res.send(transcript)
    })
  )
}
