const moment = require('moment')

/**
 * Generic date parser. Leave the date empty to use today's date.
 * If the format is empty, it will return a normal Date object.
 * Set the format to 'moment' to return the moment object
 * Value is stored in {{temp.parsedDate}} by default
 * @title Date parser
 * @category Date
 * @author Botpress
 * @param {string|Date|moment} date The date to process (can be a string or a js Date object)
 * @param {string} [format=YYYY-MM-DD] Format of the date to output.
 * @param {string} [output=parsedDate] Name of the temporary variable where the result will be saved
 *
 */
const parseDate = async (rawDate, format, output) => {
  const date = moment(!rawDate ? undefined : rawDate)

  if (!format) {
    temp[output] = date.toDate()
  } else if (format === 'moment') {
    temp[output]
  } else {
    temp[output] = date.format(format)
  }
}

return parseDate(args.date, args.format, args.output)
