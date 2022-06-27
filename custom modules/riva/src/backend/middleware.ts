import * as sdk from 'botpress/sdk'

import { sendToUser } from './service'

export default async (bp: typeof sdk) => {
  bp.events.registerMiddleware({
    name: 'riva.outgoing',
    direction: 'outgoing',
    handler: async (event, next) => {
      if (event.channel !== 'riva') {
        return next(undefined, undefined, true)
      }

      await sendToUser(event, bp)

      return next(undefined, true)
    },
    order: 5,
    description: 'Send audio messages'
  })
}
