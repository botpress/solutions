import { Button, Icon } from '@blueprintjs/core'
import React, { FC, useCallback, useState, useEffect, useRef } from 'react'
import 'bluebird-global'

import Microphone from './Microphone'
import Timer from './Timer'
import { audioBufferToWav } from './webToWav'

interface Props {
  onDone: (voice: Buffer) => Promise<void>
  onStart?: () => void
  onNotAvailable?: () => void
  className?: string
}

const VoiceRecorder: FC<Props> = (props: Props) => {
  const [isRecording, setIsRecording] = useState(false)
  const [canRecord, setCanRecord] = useState(true)

  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const mediaChunks = useRef<Blob[]>([])
  const mediaStream = useRef<MediaStream | null>(null)
  const isCancelled = useRef<boolean>(false)

  const getMediaStream = useCallback(async () => {
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        audio: { advanced: [{ channelCount: 1 }] },
        video: false
      })

      mediaStream.current = stream
    } catch (err) {
      console.error('[VoiceRecorder] - Error while creating MediaStream', err)

      props.onNotAvailable?.()
    }
  }, [])

  useEffect(() => {
    return () => {
      mediaRecorder.current?.removeEventListener('dataavailable', onResult)
      props.onStart && mediaRecorder.current?.removeEventListener('start', props.onStart)
      mediaRecorder.current?.removeEventListener('stop', onStop)
      mediaRecorder.current?.removeEventListener('error', onError as any)
    }
  }, [])

  const onError = (ev: MediaRecorderErrorEvent) => {
    console.error(
      `[VoiceRecorder] - Error while recording audio: ${ev.error.name} (${ev.error.code}) - ${ev.error.message}`
    )

    props.onNotAvailable?.()
  }

  const onResult = (e: BlobEvent) => {
    if (e.data.size > 0) {
      mediaChunks.current.push(e.data)
    }
  }

  const onStop = async () => {
    if (isCancelled.current) {
      isCancelled.current = false
      return
    }

    try {
      if (mediaChunks.current.length) {
        const blob = new Blob(mediaChunks.current)
        const arrayBuffer = await blob.arrayBuffer()

        const audioContext = new AudioContext()
        const rawBuffer = await audioContext.decodeAudioData(arrayBuffer)
        const buffer = Buffer.from(audioBufferToWav(rawBuffer))

        await props.onDone(buffer)
      }

      mediaChunks.current = []
    } catch (err) {
      console.error('[VoiceRecorder] - Error converting the audio blob into a buffer', err)
    } finally {
      setIsRecording(false)
      setCanRecord(true)
    }
  }

  const stopRecording = () => {
    setTimeout(() => {
      if (mediaRecorder.current?.state !== 'inactive') {
        mediaRecorder.current?.stop()
        mediaStream.current && mediaStream.current.getTracks().forEach(track => track.stop())

        setIsRecording(false)
        setCanRecord(false)
      }
    }, 200)
  }

  const cancelRecording = () => {
    isCancelled.current = true
    stopRecording()
    setCanRecord(true)
  }

  const startRecording = async () => {
    if (!mediaStream.current || mediaStream.current.getTracks().some(track => track.readyState === 'ended')) {
      await getMediaStream()
    }

    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(mediaStream.current)

      mediaRecorder.current.addEventListener('dataavailable', onResult)
      props.onStart && mediaRecorder.current.addEventListener('start', props.onStart)
      mediaRecorder.current.addEventListener('stop', onStop)
      mediaRecorder.current.addEventListener('error', onError as any)

      mediaRecorder.current.start()
      setIsRecording(true)
      setCanRecord(true)
    }
  }

  if (!window.MediaRecorder) {
    props.onNotAvailable?.()
    return null
  }

  return (
    <div className="bpw-recorder-button-layout">
      {isRecording && (
        <div className="bpw-recorder-button-cancel">
          <Button
            icon="cross"
            onClick={cancelRecording}
            onMouseUp={() => {
              cancelRecording()
            }}
          ></Button>
        </div>
      )}
      {isRecording && (
        <span className="bpw-recorder-button-recording">
          <Icon icon="record" color="red"></Icon> <Timer isRecording={isRecording}></Timer>
        </span>
      )}
      <Button
        className="bpw-recorder-button-record"
        icon={<Microphone fill={isRecording ? 'red' : 'black'} />}
        id="recorder"
        disabled={!canRecord}
        onMouseDown={async () => {
          if (!isRecording) {
            await startRecording()
          } else {
            stopRecording()
          }
        }}
        onMouseUp={e => {
          e.stopPropagation()
          stopRecording()
        }}
      />
    </div>
  )
}

export default VoiceRecorder
