const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gim
const bookingRegex = /.*-r?-?(.*)/

/**
 * This action tries to extract data from the provided input. Depending on what was detected, it will define a temp variable for it.
 * Detected values: temp.phoneNumber, temp.emailAddress, temp.bookingNumber
 * @title Data extractor
 * @category Hotel Manager
 * @author Botpress
 * @param {string} [inputText={{event.payload.text}}]
 */
const extractData = async text => {
  temp.phoneNumber = undefined
  temp.emailAddress = undefined
  temp.bookingNumber = undefined

  if (!text) {
    return bp.logger.warn(`No text provided, nothing to extract.`)
  }

  try {
    const phoneNumber = phoneUtil.parse(text, 'US')
    if (phoneUtil.isValidNumber(phoneNumber)) {
      temp.phoneNumber = phoneNumber.getNationalNumber()
      return
    }
  } catch (err) {}

  try {
    let emails = text.match(emailRegex)

    if (emails) {
      temp.emailAddress = emails[0]
      return
    }

    if (bookingRegex.test(text)) {
      const [_, bookingNumber] = text.match(bookingRegex)
      temp.bookingNumber = bookingNumber
    }
  } catch (err) {
    bp.logger.attachError(err).warn('Error while extracting data')
  }
}

return extractData(args.inputText)
