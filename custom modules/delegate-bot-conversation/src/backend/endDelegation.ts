import * as sdk from 'botpress/sdk'

export const generateFlow = async (
  data: any,
  metadata: sdk.FlowGeneratorMetadata
): Promise<sdk.FlowGenerationResult> => {
  return {
    transitions: [],
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
          name: 'delegate-bot-conversation/end-delegation',
          args: data
        }
      ],
      onReceive: null,
      next: [{ condition: 'true', node: 'END' }],
      type: 'standard'
    }
  ]
  return nodes
}

export default { generateFlow }
