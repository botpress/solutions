import 'bluebird-global'
import * as sdk from 'botpress/sdk'
import _ from 'lodash'
import api from './api'
import middleware from './middleware'

const onServerReady = async (bp: typeof sdk) => {
  await api(bp)
  await middleware(bp)
}

const entryPoint: sdk.ModuleEntryPoint = {
  onServerReady,
  definition: {
    name: 'riva',
    fullName: 'Riva',
    homepage: 'https://botpress.com',
    noInterface: true
  }
}

export default entryPoint
