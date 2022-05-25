import * as sdk from 'botpress/sdk'

import _ from 'lodash'
const helpers = require('./botkitHelpers/helpers')
const botkitMainFlow = require('./botkitHelpers/botkitMainFlow')

class BotKitTool {
  private ghostService: sdk.ScopedGhostService
  public availableLangs: String[]
  constructor(bp: typeof sdk, botId: string) {
    this.ghostService = bp.ghost.forBot(botId)
    this.availableLangs = ['en', 'fr']
  }

  async getBotConfig(): Promise<any | null> {
    const config = await this.ghostService.readFileAsObject('/', 'bot.config.json')
    return config
  }

  async listFlows(): Promise<any | null> {
    const flows = await this.ghostService.directoryListing('/flows', '*.flow.json')
    return flows
  }

  async migrateFlow(flow: string, lang: string) {
    const otherLang = this.availableLangs.filter(e => e !== lang)[0]
    console.log('other lang', otherLang)

    const variables = []
    const contentTxtElements: any = await this.ghostService
      .readFileAsObject('/content-elements', 'builtin_text.json')
      .catch(e => console.log('no builtin_text found'))
    const contentChoiceElements: any = await this.ghostService
      .readFileAsObject('/content-elements', 'extended-choice-skill.json')
      .catch(e => console.log('no builtin_single-choice found'))
    const contentImageElements: any = await this.ghostService
      .readFileAsObject('/content-elements', 'builtin_image.json')
      .catch(e => console.log('no builtin_image found'))
    const filename = flow.replace('.flow.json', '').toLowerCase()

    const flowTemplate = botkitMainFlow.prepareMainFlow
    flowTemplate.modified = new Date().toISOString()
    flowTemplate.id = flowTemplate.command = flowTemplate.source_id = flowTemplate.triggers[0].pattern = filename
    flowTemplate.name = filename
    flowTemplate.description = filename

    const botpressFlowFile = await this.ghostService.readFileAsObject('/flows', flow).catch(e => [])

    const globalContainer = helpers.globalContainer
    globalContainer.fullJSON = botpressFlowFile

    var botNodes = globalContainer.fullJSON.nodes
    var newScript = true
    var scriptTemplate
    botNodes.forEach((node, i) => {
      //e438569e096

      console.log(i)
      var id = node.id.substr(node.id.length - 11)
      if (id == 'e438569e096') console.log(i)

      if (newScript) {
        if (scriptTemplate) flowTemplate.script.push(scriptTemplate)

        scriptTemplate = JSON.parse(JSON.stringify(botkitMainFlow.prepareMainScript))

        if (i > 0) {
          scriptTemplate.topic = id
        } else {
          scriptTemplate.topic = 'default'
        }

        scriptTemplate.first_message_id = node.id
        newScript = false
      }

      //if(botNodes[i+1].type)
      //what if two choices after each other
      var allNextnodes = node.next
        .map(nextNodesIds => {
          return nextNodesIds.node.substr(nextNodesIds.node.length - 11)
        })
        .filter(nextNodesIds => {
          return nextNodesIds.indexOf('.') == -1
        })
      var wasInserted =
        flowTemplate.script.filter(previousOne => {
          return allNextnodes.includes(previousOne.topic)
        }).length > 0

      if (node.type == 'skill-call') {
        var choice = contentChoiceElements.filter(element => {
          return element.id == 'extended-choice-' + node.id
        })[0]
        var choiceScriptTemplate = JSON.parse(JSON.stringify(botkitMainFlow.prepareSubChoicScript))

        choiceScriptTemplate.text = choice.formData[`text$${lang}`] || choice.formData[`text$${otherLang}`]
        var choices = choice.formData[`choices$${lang}`] || choice.formData[`choices$${otherLang}`]
        choiceScriptTemplate.quick_replies = choices.map(choice => {
          return { title: choice.title, payload: choice.title, content_type: 'text' }
        })
        choiceScriptTemplate.collect.key = 'response_' + node.id.substr(node.id.length - 11)

        variables.push({
          type: 'string',
          name: choiceScriptTemplate.collect.key
        })

        choiceScriptTemplate.collect.options = []

        choiceScriptTemplate.collect.options.push({
          default: true,
          pattern: 'default',
          action: node.next[0].node.substr(node.next[0].node.length - 11)
        })

        node.next.forEach(currentNode => {
          if (currentNode.caption == 'On failure') return
          choiceScriptTemplate.collect.options.push({
            pattern: currentNode.caption.replace('User picked [', '').replace(']', ''),
            type: 'string',
            action: currentNode.node.substr(currentNode.node.length - 11)
          })
        })
        //add new choices
        scriptTemplate.script.push(choiceScriptTemplate)
        let action = choiceScriptTemplate.collect.options[choiceScriptTemplate.quick_replies.length - 1].action
        scriptTemplate.script.push({ action })
        newScript = true
      } else {
        node.onEnter.forEach(txtcontent => {
          var contentId = txtcontent.split('#!').pop()

          if (node.type == 'standard') {
            var imageElement = contentImageElements.filter(element => {
              return element.id == contentId
            })[0]
            var imageURL = imageElement.formData[`image$${lang}`] || imageElement.formData[`image$${otherLang}`]
            var imageScriptTemplate = JSON.parse(JSON.stringify(botkitMainFlow.prepareSubImageScripts))
            imageScriptTemplate.attachment.payload.url = imageURL

            scriptTemplate.script.push(imageScriptTemplate)
            if (node.next[0].node == 'END') {
              scriptTemplate.script.push({ action: 'complete' })
              newScript = true
            }
          } else {
            var content = contentTxtElements.filter(element => {
              return element.id == contentId
            })[0]

            var subScriptTemplate = JSON.parse(JSON.stringify(botkitMainFlow.prepareSubTxtScript))
            var text = content.formData[`text$${lang}`] || content.formData[`text$${otherLang}`]
            subScriptTemplate.text = [text]

            scriptTemplate.script.push(subScriptTemplate)
            if (node.next[0].node == 'END') {
              scriptTemplate.script.push({ action: 'complete' })
              newScript = true
            }
          }
        })
      }

      if (wasInserted) {
        let lastEl = scriptTemplate.script[scriptTemplate.script.length - 1]
        if (lastEl && !lastEl.action) {
          scriptTemplate.script.push({ action: allNextnodes[0] })
        }
        newScript = true
      }
    })
    flowTemplate.script.push(scriptTemplate)
    flowTemplate.variables = variables

    flowTemplate.script.map(el => {
      //merge choice element with previous element to remove "Choisir..." text element from choices
      const mergedList = el.script.reduce((acc, current) => {
        if (current.quick_replies) {
          let prevEl = acc[acc.length - 1]
          let choiceEl = _.omit(current, 'text')
          acc[acc.length - 1] = _.merge(prevEl, choiceEl)
        } else {
          acc.push(current)
        }
        return acc
      }, [])

      el.script = mergedList
      return el
    })
    return flowTemplate
  }
}

export default BotKitTool
