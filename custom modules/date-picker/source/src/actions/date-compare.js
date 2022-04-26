const moment = require('moment')

/**
 * Compare two dates.
 * The result is stored in temp.dateComparison and can have 3 different values: isBefore, isAfter, isEqual
 * @title Date comparison
 * @category Date
 * @author Botpress
 * @param {string|Date|moment} date1 The first date to compare
 * @param {string|Date|moment} date2 The date to compare it to
 * @param {string} [output=dateComparison] Name of the temporary variable where the result will be saved
 */
const compareDates = async (rawDate1, rawDate2, output) => {
  if (!rawDate1 || !rawDate2) {
    return bp.logger.warn(`Both dates must be configured`)
  }

  const date1 = moment(rawDate1)
  const date2 = moment(rawDate2)

  if (date1.isBefore(date2)) {
    temp[output] = 'isBefore'
  } else if (date1.isAfter(date2)) {
    temp[output] = 'isAfter'
  } else {
    temp[output] = 'isEqual'
  }
}

return compareDates(args.date1, args.date2, args.output)
