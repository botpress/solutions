import _ from 'lodash'
import { Config } from '../config'
const { GoogleSpreadsheet } = require('google-spreadsheet')



export const getGoogleSheet = async (bp, URLId) => {
  const sheet = new GoogleSpreadsheet(URLId)
  const globalConfig = (await bp.config.getModuleConfig('google-spreadsheet')) as Config

  await sheet.useServiceAccountAuth({
    client_email: globalConfig.clientEmail,
    private_key: globalConfig.private_key,
  })

  return sheet
}
