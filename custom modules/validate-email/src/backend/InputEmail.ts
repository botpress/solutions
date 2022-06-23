import * as sdk from 'botpress/sdk'

export const generateFlow = async (
  data: any,
  metadata: sdk.FlowGeneratorMetadata
): Promise<sdk.FlowGenerationResult> => {
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

const createNodes = (data) => {
  const nodes: sdk.SkillFlowNode[] = [
    {
      name: 'entry',
      onEnter: [
        {
          type: sdk.NodeActionType.RenderElement,
          name: `#!${data.contentElement}`,
          args: { reference: data.reference }
        }
      ],
      onReceive: [  {
        type: sdk.NodeActionType.RunAction,
        name: 'validate-email/validate-email',
        args: { reference: data.reference,multiple:data.multiple  }
      }],
      next: [{ condition: 'true', node: '#' }]
    }
  ]
  return nodes
}

const createTransitions = (data): sdk.NodeTransition[] => {
  return [
    { caption: 'On success', condition: `temp.${data.reference}  !== undefined`, node: '' },
    { caption: 'On error', condition: `!temp.${data.reference}`, node: '' }
  ]
}

export default { generateFlow }
