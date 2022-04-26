import axios from 'axios'
import * as sdk from 'botpress/sdk'
import { Config } from 'src/config'
import api from './api'
import datePicker from './datePicker'

export const MODULE_NAME = 'date-picker'

const onServerReady = async (bp: typeof sdk) => {
  await api(bp)
}

const getWhitelist = async (accessToken: string) => {
  const { data } = await axios.get(
    `https://graph.facebook.com/v12.0/me/messenger_profile?fields=whitelisted_domains&access_token=${accessToken}`
  )
  return data?.data?.[0]?.whitelisted_domains || []
}

const setWhitelist = async (whitelist: string[], accessToken: string) => {
  await axios.post(`https://graph.facebook.com/v12.0/me/messenger_profile?access_token=${accessToken}`, {
    whitelisted_domains: whitelist
  })
}

const onBotMount = async (bp: typeof sdk, botId: string) => {
  const modConfig: Config = await bp.config.getModuleConfigForBot(MODULE_NAME, botId)
  const config = await bp.bots.getBotById(botId)
  const channels = config.messaging.channels

  if (!channels || !channels.messenger || !modConfig.enabled || !modConfig.messenger) {
    return
  }

  // The host must be added to the whitelist for the bot to use the webview on messenger
  const { addToWhitelist, customUrl } = modConfig.messenger
  if (!addToWhitelist) {
    return
  }

  const serverUrl = customUrl || process.EXTERNAL_URL
  const whitelist = await getWhitelist(channels.messenger.accessToken)

  if (!whitelist.length || !whitelist.find(x => x.startsWith(serverUrl))) {
    bp.logger.info('Server URL missing from whitelist, adding...', { whitelist, serverUrl })

    await setWhitelist([...whitelist, serverUrl], channels.messenger.accessToken)
  }
}

const skills: sdk.Skill[] = [
  {
    id: 'DatePicker',
    name: 'Date Picker',
    icon: 'calendar',
    flowGenerator: datePicker.generateFlow
  }
]

const entryPoint: sdk.ModuleEntryPoint = {
  onServerReady,
  onBotMount,
  skills,
  definition: {
    name: MODULE_NAME,
    menuIcon: 'calendar',
    fullName: 'Date Picker',
    homepage: 'https://botpress.io',
    noInterface: true,
    experimental: true
  }
}

export default entryPoint
