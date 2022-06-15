import * as sdk from 'botpress/sdk'

import { RivaService } from './riva-service'
import { getMessaging, getVisitorId } from './utils'

const makePlayerPayload = (text: string, autoPlay?: boolean) => {
  return { type: 'custom', module: 'riva', component: 'Player', text, autoPlay }
}

// Temporary fix for greater compatibility
const getMessagingClient = (bp: typeof sdk, botId: string) => {
  if (bp['messaging']) {
    return bp['messaging'].forBot(botId)
  }

  return getMessaging(bp, botId)
}

export const receiveFromUser = async (
  audioBuffer: Buffer,
  visitorId: string,
  eventDestination: Omit<sdk.IO.EventDestination, 'channel'>,
  bp: typeof sdk
) => {
  const { target, threadId, botId } = eventDestination
  const config = await bp.config.getModuleConfig('riva')

  const rivaService = new RivaService(config)
  const transcript = (await rivaService.speechToText(audioBuffer)) || '* no transcript recognized *'

  const payload = makePlayerPayload(transcript)

  const messaging = await getMessagingClient(bp, botId)
  const message = await messaging.createMessage(threadId, target, payload)

  /** We don't store the audio message, so we just append it before sending to the socket */
  message.payload.audio = audioBuffer.toString('base64')
  bp.realtime.sendPayload(bp.RealTimePayload.forVisitor(visitorId, 'webchat.message', message))

  /** The event is processed on a special channel so we can handle outputs easily */
  const event = bp.IO.Event({
    ...eventDestination,
    messageId: message.id,
    channel: 'riva',
    direction: 'incoming',
    payload,
    type: payload.type
  })

  await bp.events.sendEvent(event)

  return transcript
}

const sendToUser = async (event: sdk.IO.OutgoingEvent, bp: typeof sdk) => {
  const config = await bp.config.getModuleConfig('riva')

  const service = new RivaService(config)
  const payload = makePlayerPayload(event.preview, true)

  const messaging = await getMessagingClient(bp, event.botId)
  const message = await messaging.createMessage(event.threadId, undefined, payload)

  const toAudio = await service.textToSpeech(event.preview)
  message.payload.audio = Buffer.from(toAudio).toString('base64')

  const visitorId = await getVisitorId(event.botId, event.target, bp)
  bp.realtime.sendPayload(bp.RealTimePayload.forVisitor(visitorId, 'webchat.message', message))
}

export { sendToUser }
