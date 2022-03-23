import * as sdk from 'botpress/sdk'

import en from '../translations/en.json'

import addToArray from './AddToArray'
import createArray from './CreateArray'
import forEach from './ForEach'
import rawReply from './RawReply'

const skills: sdk.Skill[] = [
  {
    id: 'ForEach',
    name: 'module.flow-utils.forEach',
    icon: 'refresh',
    flowGenerator: forEach.generateFlow
  },
  {
    id: 'AddToArray',
    name: 'module.flow-utils.addToArray',
    icon: 'add',
    flowGenerator: addToArray.generateFlow
  },
  {
    id: 'CreateArray',
    name: 'module.flow-utils.createArray',
    icon: 'array',
    flowGenerator: createArray.generateFlow
  },
  {
    id: 'RawReply',
    name: 'module.flow-utils.rawReply',
    icon: 'send-message',
    flowGenerator: rawReply.generateFlow
  }
]

const entryPoint: sdk.ModuleEntryPoint = {
  definition: {
    name: 'flow-utils',
    menuIcon: 'none',
    menuText: 'Flow Utils',
    fullName: 'Flow Utils',
    noInterface: true
  },
  translations: { en },
  skills
}

export default entryPoint
