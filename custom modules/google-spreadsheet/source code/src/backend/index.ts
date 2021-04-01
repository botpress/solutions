import * as sdk from 'botpress/sdk'
import { getGoogleSheet } from './sheet'

export interface Extension {
  googleSpreadSheet: {
    getGoogleSheet: any
  }
}

export type SDK = typeof sdk & Extension

const onServerReady = async (bp: typeof sdk & Extension) => {
  // @ts-ignore
  bp.kvs.googleSpreadSheet = {
    getGoogleSheet: (URLId) => {
      return getGoogleSheet(bp, URLId)
    }
  }
}

const entryPoint: sdk.ModuleEntryPoint = {
  onServerReady,
  definition: {
    name: 'google-spreadsheet',
    menuIcon: 'none',
    menuText: 'Google Spread Sheet',
    fullName: 'Google Spread Sheet',
    noInterface: true, // This prevents your module from being displayed in the menu, since we only add custom components here
    homepage: 'https://botpress.com'
  }
}

export default entryPoint
