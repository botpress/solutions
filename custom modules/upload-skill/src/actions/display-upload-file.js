/**
 * Loads a file and stores it in temporary memory in base64 format.
 * @title Upload Skill
 * @category Custom
 * @author Your_Name
 * @param {string} description - Description message
 * @param {string} buttonText - Text of the file input button
 * @param {string} message - Message to leave after submit
 * @param {string} reference - Reference variable in the temp memory where the result will be stored
 */

const myAction = async (contentElement, reference) => {
  const config = await bp.config.getModuleConfigForBot('upload-skill', event.botId)
  const allowedMimeTypes = config.allowedMimeTypes.join(',')
  if (event.channel === 'messenger') {
    const message = {
      type: 'text',
      text: `veuillez utiliser la fonction de téléchargement de Facebook pour télécharger une image ou un fichier vidéo décrivant votre problème.`,
      // Markdown enables rich content, for example links or bold text. Otherwise, content will be displayed as-is
      markdown: true
    }
    event.state.temp.uploadKey = reference
    // Send the message to the user (note the array, since you can send multiple payloads in the same reply)
    return bp.events.replyToEvent(event, [message])
  }
  const upel = await bp.cms.renderElement(
    `#!${contentElement}`,
    { reference, botId: event.botId, threadId: event.threadId, target: event.target, allowedMimeTypes },
    event
  )
  bp.events.replyToEvent(event, upel, event.id)
}

return myAction(args.contentElement, args.reference)
