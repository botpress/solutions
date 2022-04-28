import React, { useState, useEffect } from 'react'
import Picker from './Picker'

const WebPicker = props => {
  const [isHidden, setHidden] = useState(false)
  const { isLastGroup, isLastOfGroup, onSendData, minValue, maxValue, locale } = props

  useEffect(() => {
    if (isLastOfGroup && isLastGroup) {
      props.store.composer.setLocked(true)
    }
  }, [])

  const submit = async (value: string) => {
    hidePicker()
    onSendData?.({ type: 'numberPicker', text: value })
  }

  const cancel = () => {
    hidePicker()
    onSendData?.({ type: 'numberPicker' })
  }

  const hidePicker = () => {
    setHidden(true)
    props.store.composer.setLocked(false)
  }

  if (!(isLastGroup && isLastOfGroup) || isHidden) {
    return null
  }

  if (!locale) {
    return <div style={{ height: 40 }}></div>
  }

  return (
    <>
      <Picker minValue={minValue} maxValue={maxValue} locale={locale} onSubmit={submit} onCancel={cancel} />
    </>
  )
}

export default WebPicker
