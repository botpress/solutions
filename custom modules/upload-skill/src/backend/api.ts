import aws from 'aws-sdk'
import * as sdk from 'botpress/sdk'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import { asyncMiddleware as asyncMw, BPRequest } from 'common/http'
import { Request, Response, NextFunction } from 'express'
import { asBytes } from './utils'
import _ from 'lodash'
import fileUpload from 'express-fileupload'
import Db from './db'

import { Config } from '../config'

type ChatRequest = BPRequest & {
  visitorId: string
  userId: string
  botId: string
  conversationId: string
}

export default async (bp: typeof sdk, db: Db) => {
  const asyncMiddleware = asyncMw(bp.logger)
  const globalConfig = (await bp.config.getModuleConfig('upload-skill')) as Config
  const maxFileSize = globalConfig.maxFileSize && asBytes(globalConfig.maxFileSize)

  const router = bp.http.createRouterForBot('upload-skill', { checkAuthentication: true, enableJsonBodyParser: true })
  const publicRouter = bp.http.createRouterForBot('upload-skill-public', {
    checkAuthentication: false,
    enableJsonBodyParser: true
  })

  router.post(
    '/upload',
    fileUpload({
      limits: { fileSize: maxFileSize }
    }),
    asyncMiddleware(async (req: ChatRequest & any, res: Response) => {
      const { file } = req.files
      const { threadId, botId } = req.body

      if (!file && !threadId && !botId) {
        return res.status(400).send('Missing required parameters')
      }

      const mediaFile = {
        id: uuidv4(),
        threadId,
        botId,
        name: `${Date.now()}_${file.name}`,
        created_at: moment(),
        ..._.pick(file, ['size', 'data', 'mimetype']),
        url: undefined
      }

      try {
        if (globalConfig.uploadsUseS3) {
          const awsConfig = {
            region: globalConfig.uploadsS3Region,
            credentials: {
              accessKeyId: globalConfig.uploadsS3AWSAccessKey,
              secretAccessKey: globalConfig.uploadsS3AWSAccessSecret
            }
          }

          if (!awsConfig.credentials.accessKeyId && !awsConfig.credentials.secretAccessKey) {
            delete awsConfig.credentials
          }

          if (!awsConfig.region) {
            delete awsConfig.region
          }

          const s3 = new aws.S3(awsConfig)
          const res = await s3
            .putObject({
              Bucket: globalConfig.uploadsS3Bucket,
              Key: mediaFile.name,
              Body: mediaFile.data,
              ContentType: mediaFile.mimetype,
              ACL: 'public-read'
            })
            .promise()

          const s3Url = `https://${globalConfig.uploadsS3Bucket}.s3.amazonaws.com/${mediaFile.name}`
          mediaFile.url = s3Url
        } else {
          await db.insertMediaFile(_.omit(mediaFile, ['url']))
        }
        return res.status(200).send(_.omit(mediaFile, ['data', 'botId', 'threadId']))
      } catch (error) {
        return res.status(400).send('Error inserting media file')
      }
    })
  )

  router.post(
    '/clear',
    asyncMiddleware(async (req: ChatRequest & any, res: Response) => {
      const { threadId } = req.body

      if (!threadId) {
        return res.status(400).send('Missing required paramenters')
      }
      try {
        await db.clearFiles(threadId)
        return res.sendStatus(200)
      } catch (error) {
        return res.status(400).send('error clearing media db.')
      }
    })
  )

  publicRouter.get(
    '/media/:id',
    asyncMiddleware(async (req: ChatRequest & any, res: Response) => {
      const { id } = req.params
      if (!id) {
        return res.status(404).end()
      }
      const file = await db.getMediaFile(id)

      if (!file) {
        return res.status(404).end()
      }

      return res.end(file.data)
    })
  )
}
