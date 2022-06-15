import { FileInput } from '@blueprintjs/core'
import React from 'react'

const FileUploader = props => {
  const handleFileUpload = async event => {
    if (!event.target.files) {
      return
    }

    const fd = new FormData()
    fd.append('file', event.target.files[0], 'audio.wav')
    fd.append('webSessionId', props.store.api.baseUserPayload.webSessionId)
    fd.append('conversationId', props.store.currentConversationId)

    await props.store.bp.axios.post('/mod/riva/sendAudio', fd)
  }

  return <FileInput onChange={handleFileUpload} />
}

export default FileUploader
