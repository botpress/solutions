import { Button } from '@blueprintjs/core'
import React, { useEffect, useState, useRef } from 'react'

const Player = props => {
  const [isPlaying, setPlaying] = useState(false)
  const audioRef = useRef(new Audio(`data:audio/wav;base64,${props.audio}`))

  useEffect(() => {
    if (props.audio) {
      if (props.autoPlay) {
        void startPlayback()
      }

      audioRef.current.addEventListener(
        'ended',
        () => {
          setPlaying(false)
        },
        false
      )
    }
  }, [])

  const processQueue = async () => {
    if (!props.store.voiceQueue?.length) {
      return
    }

    const next = props.store.voiceQueue[0]
    next.isPlaying = true

    const audio = new Audio(next.src)
    audio.addEventListener(
      'ended',
      () => {
        props.store.voiceQueue.shift()
        if (props.store.voiceQueue.length > 0) {
          return processQueue()
        }
      },
      false
    )

    await audio.play()
  }

  const startPlayback = async () => {
    const entry = { src: `data:audio/wav;base64,${props.audio}`, isPlaying: false }

    if (!props.store.voiceQueue) {
      props.store.voiceQueue = [entry]
    } else {
      props.store.voiceQueue.push(entry)
    }

    const playing = props.store.voiceQueue.find(x => x.isPlaying === true)
    if (!playing) {
      await processQueue()
    }
  }

  const play = async () => {
    await audioRef.current.play()
    setPlaying(true)
  }

  const stop = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setPlaying(false)
  }

  const AudioPlayer = () => {
    if (!props.audio) {
      return null
    }

    return (
      <span>
        {isPlaying ? (
          <Button onClick={stop} icon="stop" small minimal />
        ) : (
          <Button onClick={play} icon="play" small minimal />
        )}
      </span>
    )
  }

  return (
    <div>
      {props.text}
      <AudioPlayer></AudioPlayer>
    </div>
  )
}

export default Player
