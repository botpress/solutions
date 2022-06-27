import React from 'react'
import './Composer.css'

import VoiceRecorder from './Recorder/VoiceRecorder'

const Composer = props => {
  return (
    <div className="bpw-recorder-container">
      <VoiceRecorder
        onDone={async buff => {
          const blob = new Blob([buff], { type: 'audio/wav' })
          const fd = new FormData()
          fd.append('file', blob, 'audio.wav')
          fd.append('webSessionId', props.store.api.baseUserPayload.webSessionId)
          fd.append('conversationId', props.store.currentConversationId)

          await props.store.bp.axios.post('/mod/riva/sendAudio', fd)
        }}
      ></VoiceRecorder>
    </div>
  )
}

export default Composer
