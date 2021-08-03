import * as sdk from 'botpress/sdk'

import en from '../translations/en.json'

const entryPoint: sdk.ModuleEntryPoint = {
  translations: { en },
  definition: {
    // This must match the name of your module's folder, and the name in package.json
    name: 'calendly',
    /**
     * When menuIcon is set to `custom`, you need to provide an icon. It must be at that location: `/assets/icon.png`
     * Otherwise, use Material icons name: https://material.io/tools/icons/?style=baseline
     */
    menuIcon: 'custom',
    // This is the name of your module which will be displayed in the sidebar
    menuText: 'Calendly',
    // When set to `true`, the name and icon of your module won't be displayed in the sidebar
    noInterface: true,
    // The full name is used in other places, for example when displaying bot templates
    fullName: 'Calendly Module',
    // Not used anywhere, but should be a link to your website or module repository
    homepage: 'https://botpress.com'
  }
}

export default entryPoint
