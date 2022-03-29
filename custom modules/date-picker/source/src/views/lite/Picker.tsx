import { Button } from '@blueprintjs/core'
import { DatePicker, DateRange, DateRangePicker } from '@blueprintjs/datetime'
import moment from 'moment'
import React, { useState, FC } from 'react'
import MomentLocaleUtils from 'react-day-picker/moment'
import en from '../../translations/en.json'
import fr from '../../translations/fr.json'
import 'moment/locale/fr'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'

interface Props {
  locale?: string
  isMinToday?: boolean
  isDateRange?: boolean
  configJson?: string
  onCancel: () => void
  onSubmit: (startDate: string, endDate?: string) => void
}

const Picker: FC<Props> = ({ locale, isMinToday, isDateRange, configJson, onCancel, onSubmit }) => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const dateChanged = (range: DateRange) => {
    setStartDate(range[0])
    setEndDate(range[1])
  }

  const maxDate = moment()
    .add(24, 'months')
    .toDate()

  const submit = (startDate: Date, endDate?: Date) => {
    onSubmit(moment(startDate).format('yyyy-MM-DD'), endDate && moment(endDate).format('yyyy-MM-DD'))
  }

  const additionalConfig = () => {
    if (!configJson) {
      return
    }

    try {
      return JSON.parse(configJson)
    } catch (err) {
      console.error('custom config parse error', err)
    }
  }

  const translate = key => (locale === 'fr' ? fr[key] : en[key])
  const isValid = (!isDateRange && startDate) || (isDateRange && startDate && endDate)
  const minDate = isMinToday ? new Date() : undefined

  return (
    <div>
      {isDateRange ? (
        <DateRangePicker
          value={[startDate, endDate]}
          onChange={dateChanged}
          singleMonthOnly
          highlightCurrentDay
          dayPickerProps={{ firstDayOfWeek: 1 }}
          shortcuts={false}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          localeUtils={MomentLocaleUtils}
          {...additionalConfig()}
        />
      ) : (
        <DatePicker
          onChange={date => setStartDate(date)}
          highlightCurrentDay
          dayPickerProps={{ firstDayOfWeek: 1 }}
          minDate={minDate}
          maxDate={maxDate}
          locale={locale}
          localeUtils={MomentLocaleUtils}
          {...additionalConfig()}
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Button text={translate('cancel')} onClick={onCancel} />
        <Button text={translate('submit')} disabled={!isValid} onClick={() => submit(startDate, endDate)} />
      </div>
    </div>
  )
}

export default Picker
