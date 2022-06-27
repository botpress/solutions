import { MessagingClient } from '@botpress/messaging-client'
import * as sdk from 'botpress/sdk'

export const streamToBuffer = (stream): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const _buf: any = []

    stream.on('data', chunk => _buf.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(_buf)))
    stream.on('error', err => reject(err))
  })
}

export const getMessaging = async (bp, botId) => {
  const { messaging } = await bp.bots.getBotById(botId)

  const botClient = new MessagingClient({
    url: process.core_env.MESSAGING_ENDPOINT
      ? process.core_env.MESSAGING_ENDPOINT
      : `http://localhost:${process.MESSAGING_PORT}`,
    clientId: messaging.id,
    clientToken: messaging.token,
    axios: { headers: { password: process.INTERNAL_PASSWORD }, proxy: false }
  })

  return botClient
}

export const getUserId = async (botId: string, visitorId: string, bp: typeof sdk): Promise<string> => {
  const rows = await bp.database('web_user_map').where({ botId, visitorId })

  if (rows?.length) {
    return rows[0].userId
  }
}

export const getVisitorId = async (botId: string, userId: string, bp: typeof sdk): Promise<string> => {
  const rows = await bp.database('web_user_map').where({ botId, userId })

  if (rows?.length) {
    return rows[0].visitorId
  }
}

export const asBytes = (size: string) => {
  if (typeof size === 'number') {
    return size
  }

  size = typeof size === 'string' ? size : '0'

  const matches = size
    .replace(',', '.')
    .toLowerCase()
    .match(/(\d+\.?\d{0,})\s{0,}(mb|gb|pt|kb|b)?/i)

  if (!matches || !matches.length) {
    return 0
  }

  /**/ if (matches[2] === 'b') {
    return Number(matches[1]) * Math.pow(1024, 0)
  } else if (matches[2] === 'kb') {
    return Number(matches[1]) * Math.pow(1024, 1)
  } else if (matches[2] === 'mb') {
    return Number(matches[1]) * Math.pow(1024, 2)
  } else if (matches[2] === 'gb') {
    return Number(matches[1]) * Math.pow(1024, 3)
  } else if (matches[2] === 'tb') {
    return Number(matches[1]) * Math.pow(1024, 4)
  }

  return Number(matches[1])
}
