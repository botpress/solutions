import React, { useState, useEffect } from 'react'
import Picker from './Picker'
import Stylesheet from './Stylesheet'

const WebPicker = props => {
  const [isHidden, setHidden] = useState(false)
  const { isLastGroup, isLastOfGroup, onSendData, isMinToday, configJson, locale, isDateRange } = props

  useEffect(() => {
    if (isLastOfGroup && isLastGroup) {
      props.store.composer.setLocked(true)
    }
  }, [])

  const submit = async (startDate: string, endDate?: string) => {
    hidePicker()
    onSendData?.({ type: 'datePicker', startDate, endDate })
  }

  const cancel = () => {
    hidePicker()
    onSendData?.({ type: 'datePicker' })
  }

  const hidePicker = () => {
    setHidden(true)
    props.store.composer.setLocked(false)
  }

  if (!locale || isHidden || !(isLastGroup && isLastOfGroup)) {
    return null
  }

  return (
    <>
      <Stylesheet href={`${window['BOT_API_PATH']}/mod/date-picker/custom.css`} />
      <Picker
        isMinToday={isMinToday}
        isDateRange={isDateRange}
        configJson={configJson}
        locale={locale}
        onSubmit={submit}
        onCancel={cancel}
      />
    </>
  )
}

export default WebPicker
