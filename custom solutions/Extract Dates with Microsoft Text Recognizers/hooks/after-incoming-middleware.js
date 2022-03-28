const Recognizers = require('@microsoft/recognizers-text-suite')
const moment = require('moment')

const cultures = {
  fr: Recognizers.Culture.French,
  en: Recognizers.Culture.English
}
const myCulture = cultures[event.nlu.detectedLanguage]
const query = event.payload.text
if (!query) {
  return
}
const dateTime = Recognizers.recognizeDateTime(query, myCulture)

// Ensure the date returned is in the future, comment if not necessary
const fixDate = (date) => {
  const isInPast = moment(date).isBefore(moment())
  return isInPast ? moment(date).add(1, 'year').format('YYYY-MM-DD') : date
}

for (const date_ent of dateTime) {
  if (!date_ent.resolution || !date_ent.resolution.values) {
    continue
  }

  const dateValue = date_ent.resolution.values[0]
  const dateType = dateValue.type || dateValue.typeName

  if (['daterange', 'datetimerange'].includes(dateType)) {
    if (!event.state.temp.startDateRange) {
      event.state.temp.startDateRange = fixDate(dateValue.start)
      event.state.temp.endDateRange = fixDate(dateValue.end)
    } else {
      event.state.temp.startDateRange = undefined
      event.state.temp.endDateRange = undefined
      return
    }
  }
}
