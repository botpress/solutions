/**
   * Send transcript of the conversation as a download link
   * @title Send Conversation Transcript
   * @category Custom
   * @author David Vitora
   */

 const crypto = require('crypto')

 const getConverseMapping = async (botId, converseUserId) => {
   const TABLE_NAME = 'converse_user_map'

   let mapping = {}

   if (await bp.database.schema.hasTable(TABLE_NAME)) {
     try {
       const rows = await bp.database(TABLE_NAME).where({ botId, converseUserId })
       if (rows.length) {
         mapping = rows[0]
       }
     } catch (err) {
       bp.logger.error('An error occurred while fetching the converse user mapping.', err)
     }
   }
   return mapping
 }

 const sendTranscriptDownloadLink = async () => {
   let conversationId
   if (event.threadId) {
     conversationId = event.threadId
   } else {
     //Get mapped messaging conversation for converse API users
     conversationId = (await getConverseMapping(event.botId, event.target)).conversationId
   }
   const config = await bp.config.getBotpressConfig()

   const { baseURL } = await bp.http.getAxiosConfigForBot(event.botId, {})

   let payloads = []
   if (conversationId) {
     // This will generate an enconded conversationId string
     const cipher = crypto.createDecipheriv(
       'aes-256-ctr',
       config.appSecret.substring(0, 32),
       config.appSecret.substring(0, 16)
     )
     let encryptedData = cipher.update(conversationId, 'utf8', 'base64')
     encryptedData += cipher.final('base64')
     const encoded = Buffer.from(encryptedData).toString('base64')
     //

     payloads = await bp.cms.renderElement(
       'builtin_text',
       {
         text: `<a href="${baseURL}/mod/conv/?data=${encoded}" target="_blank">Download Conversation Transcript</a>`,
         typing: true,
         markdown: true
       },
       event
     )
   }

   await bp.events.replyToEvent(
     {
       botId: event.botId,
       channel: event.channel,
       target: event.target,
       threadId: event.threadId
     },
     payloads,
     event.id
   )
 }

 return sendTranscriptDownloadLink()
