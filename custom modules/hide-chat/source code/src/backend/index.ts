import * as sdk from 'botpress/sdk'

const botTemplates: sdk.BotTemplate[] = [
  {
    id: 'hide-chat-demo',
    name: 'Demo - Hide Chat',
    desc: 'This demo bot shows how the chat can be hidden'
  }
]

const entryPoint: sdk.ModuleEntryPoint = {
  botTemplates,
  definition: {
    name: 'hide-chat',
    menuIcon: 'none',
    menuText: 'Hide Chat',
    fullName: 'Hide Chat',
    noInterface: true, // This prevents your module from being displayed in the menu, since we only add custom components here
    homepage: 'https://botpress.com'
  }
}

export default entryPoint
