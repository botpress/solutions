function hook(bp: typeof sdk, event: sdk.IO.IncomingEvent) {
    /** Your code starts below */

    const Recognizers = require('@microsoft/recognizers-text-suite')
    const moment = require('moment')

    const defaultTimes = {
        // default time range for someone asking anytime or for a date with no specific time, keep in HH:MM string
        start: '09:30',
        end: '18:00'
    }

    function removeDuplicates(array, key) {
        let lookup = new Set()
        return array.filter(obj => !lookup.has(obj[key]) && lookup.add(obj[key]))
    }

    function parseOutput(recognizerOutput) {
        let resolutions = recognizerOutput.reduce((arr, r) => (arr = [...arr, ...r.resolution.values]), [])

        resolutions = removeDuplicates(resolutions, 'timex')

        const datetimeranges = resolutions.filter(r => r.type == 'datetimerange')
        const dateranges = resolutions.filter(r => r.type == 'daterange')
        const dates = resolutions.filter(r => r.type == 'date')
        const timeranges = resolutions.filter(r => r.type == 'timerange')

        const ambiguous = resolutions.length > 1

        bp.logger.forBot(event.botId).info(resolutions)

        let start, end

        if (datetimeranges.length) {
            const datetime = datetimeranges[0]
            start = moment(datetime.start)
            end = moment(datetime.end)
        } else if (dateranges.length) {
            const daterange = dateranges[0]
            start = moment(`${daterange.start} ${defaultTimes.start}`)
            end = moment(`${daterange.end || daterange.start} ${defaultTimes.end}`)
        } else if (dates.length) {
            const date = dates[dates.length - 1] // pick the farthest date
            start = moment(`${date.value} ${defaultTimes.start}`)
            end = moment(`${date.value} ${defaultTimes.end}`)
        } else if (timeranges.length) {
            const today = moment().format('YYYY-MM-DD') // if no day specified, choose today
            const timerange = timeranges[0]
            start = moment(`${today} ${timerange.start}`)
            end = moment(`${today} ${timerange.end}`)
        } else {
            return { success: false }
        }

        return {
            success: true,
            ambiguous,
            start: start.format(),
            end: end.format()
        }
    }

    const output = Recognizers.recognizeDateTime(event.payload.text || '', Recognizers.Culture.English)
    const data = parseOutput(output)

    event.state.temp.timeRangeExtraction = data

    /** Your code ends here */
}