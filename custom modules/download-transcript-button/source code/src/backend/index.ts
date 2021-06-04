import * as sdk from 'botpress/sdk'

const entryPoint: sdk.ModuleEntryPoint = {
  definition: {
    name: 'download-transcript-button',
    menuIcon: 'none',
    menuText: 'Download Transcript Button',
    fullName: 'Download Transcript Button',
    noInterface: true, // This prevents your module from being displayed in the menu, since we only add custom components here
    homepage: 'https://botpress.com'
  }
}

export default entryPoint
