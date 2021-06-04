/**
 *
 * @title Send Download Transcript Button
 * @category Module Download Transcription Button
 * @author Botpress, Inc.
 */
const sendDownloadTranscriptButton = async () => {
  if (event.channel != 'web') {
    return
  }

  const postbackEvent = bp.IO.Event({
    type: 'custom',
    channel: 'web',
    direction: 'outgoing',
    target: event.target,
    botId: event.botId,
    payload: { type: 'custom', component: 'DownloadTranscriptButton', module: 'download-transcript-button' }
  })

  await bp.events.sendEvent(postbackEvent)
}

return sendDownloadTranscriptButton()
