import * as sdk from 'botpress/sdk'
import _ from 'lodash'

const generateFlow = async (data: any, metadata: sdk.FlowGeneratorMetadata): Promise<sdk.FlowGenerationResult> => {
  data = {
    ...data,
    indexVariableName: data.indexVariableName || 'currentIndex',
    variableItemName: data.variableItemName || 'currentItem'
  }
  return {
    transitions: createTransitions(data),
    flow: {
      nodes: createNodes(data),
      catchAll: {
        next: []
      }
    }
  }
}

const createNodes = data => {
  const nodes: sdk.SkillFlowNode[] = [
    {
      name: 'entry',
      onEnter: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'flow-utils/iterate_array',
          args: {
            randomId: data.randomId,
            variableName: data.variableName,
            variableScope: data.variableScope,
            indexVariableName: data.indexVariableName,
            variableItemName: data.variableItemName
          }
        }
      ],
      next: [{ condition: 'true', node: '#' }]
    }
  ]
  return nodes
}

const createTransitions = (data): sdk.NodeTransition[] => {
  return [
    {
      caption: 'On End',
      condition: `temp.${data.variableItemName} && temp.${data.variableItemName}.toString() == '${Symbol.for(
        'END'
      ).toString()}'`,
      node: ''
    },
    {
      caption: 'On Not Iterable',
      condition: `temp.${data.variableItemName} && temp.${data.variableItemName}.toString() == '${Symbol.for(
        'NOT_ITERABLE'
      ).toString()}'`,
      node: ''
    },
    {
      caption: 'On failure',
      condition: `temp.${data.variableItemName} && temp.${data.variableItemName}.toString() == '${Symbol.for(
        'ERROR'
      ).toString()}'`,
      node: ''
    },
    {
      caption: 'On Item',
      condition: 'true',
      node: ''
    }
  ]
}

export default { generateFlow }
