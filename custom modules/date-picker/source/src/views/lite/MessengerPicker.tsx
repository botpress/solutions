import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import axios from 'axios'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import en from '../../translations/en.json'
import fr from '../../translations/fr.json'

import Picker from './Picker'
import './style.scss'

const MessengerPicker = () => {
  const [isCompleted, setCompleted] = useState(false)

  useEffect(() => {
    fixHead()
    injectMessenger()
  }, [])

  const fixHead = () => {
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width,initial-scale=1'
    document.getElementsByTagName('head')[0].appendChild(meta)
  }

  const injectMessenger = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.id = 'Messenger'
    script.src = 'https://connect.facebook.net/en_US/messenger.Extensions.js'
    document.getElementsByTagName('head')[0].appendChild(script)
  }

  const submitChoice = async (startDate: string, endDate?: string) => {
    const host = window.location.origin
    const { botId, target, threadId } = queryString.parse(location.search)

    const data = {
      userId: target,
      conversationId: threadId,
      payload: { type: 'datePicker', startDate, endDate }
    }

    await axios.post(`${host}/api/v1/bots/${botId}/mod/date-picker/messenger`, data)
    closeWindow()
  }

  const closeWindow = () => {
    try {
      // @ts-ignore
      MessengerExtensions.requestCloseBrowser()
    } catch (err) {
      window.close()
    }

    setCompleted(true)
  }

  const { isDateRange, isMinToday, locale } = queryString.parse(location.search)
  const translate = key => (locale === 'fr' ? fr[key] : en[key])

  if (isCompleted) {
    return <div>{translate('thankYouClose')}</div>
  }

  return (
    <Picker
      isDateRange={isDateRange}
      isMinToday={isMinToday}
      locale={locale}
      onSubmit={submitChoice}
      onCancel={closeWindow}
    />
  )
}

export default MessengerPicker
