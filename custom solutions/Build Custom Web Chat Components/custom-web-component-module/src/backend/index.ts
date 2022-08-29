import * as sdk from 'botpress/sdk'

const entryPoint: sdk.ModuleEntryPoint = {
  definition: {
    // This must match the name of your module's folder, and the name in package.json
    name: 'custom-web-component-module',
    /**
     * By default we are using the https://blueprintjs.com/docs/#icons. Use the corresponding name
     * Otherwise, create an icon in the assets module in the following format studio_${module.menuIcon}
     */
    menuIcon: 'flag',
    // This is the name of your module which will be displayed in the sidebar
    menuText: 'Custom Web Component',
    // When set to `true`, the name and icon of your module won't be displayed in the sidebar
    noInterface: false,
    // The full name is used in other places, for example when displaying bot templates
    fullName: 'Custom Web Component',
    // Not used anywhere, but should be a link to your website or module repository
    homepage: 'https://botpress.com'
  }
}

export default entryPoint
