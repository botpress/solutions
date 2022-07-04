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

  const upel = await bp.cms.renderElement(
    `#!${contentElement}`,
    { reference, botId: event.botId, threadId: event.threadId, allowedMimeTypes },
    event
  )
  bp.events.replyToEvent(event, upel, event.id)
}

return myAction(args.contentElement, args.reference)
