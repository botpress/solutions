import round from 'lodash/round'
import React, { useState, useEffect } from 'react'

let interval

const Timer = props => {
  const [start, setStart] = useState<any>(0)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (props.isRecording) {
      setStart(Date.now())
      interval = setInterval(() => {
        setTimer(timer => timer + 100)
      }, 100)
    }
    return () => {
      clearInterval(interval)
    }
  }, [props.isRecording])

  const duration = round((Date.now() - start) / 1000, 1).toFixed(2)
  return <span> {duration}</span>
}

export default Timer
