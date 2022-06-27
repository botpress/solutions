import * as sdk from 'botpress/sdk'

export const generateFlow = async (
  data: any,
  metadata: sdk.FlowGeneratorMetadata
): Promise<sdk.FlowGenerationResult> => {
  return {
    transitions: createTransitions(),
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
          name: 'builtin/setVariable',
          args: {
            type: 'session',
            name: 'delegation',
            value: ''
          }
        },
        {
          type: sdk.NodeActionType.RunAction,
          name: 'delegate-bot-conversation/delegate-to-sub-bot',
          args: { bots: data.bots, text: data.text, intent: data.intent.value }
        }
      ],
      next: [
        {
          condition: 'event.state.temp.errorDelegation',
          node: 'errorDelegation'
        },
        {
          condition: 'true',
          node: 'node-c8d3'
        }
      ],
      type: 'standard'
    },
    {
      name: 'node-c8d3',
      next: [
        {
          condition: `event.nlu.intent.name === '${data.intent.value}'`,
          node: 'exitDelegation'
        },
        {
          condition: 'true',
          node: 'node-778a'
        }
      ],
      onEnter: [],
      onReceive: [],
      type: 'standard'
    },
    {
      name: 'node-778a',
      onEnter: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'delegate-bot-conversation/delegate-to-sub-bot',
          args: { bots: data.bots, text: data.text, intent: data.intent.value }
        }
      ],
      next: [
        {
          condition: 'event.state.temp.endDelegation',
          node: 'endDelegation'
        },
        {
          condition: 'true',
          node: 'node-c8d3'
        }
      ],
      type: 'standard'
    },
    {
      name: 'endDelegation',
      onEnter: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'builtin/setVariable',
          args: {
            type: 'temp',
            name: 'endDelegation',
            value: 'true'
          }
        }
      ],
      next: [{ condition: 'true', node: '#' }]
    },
    {
      name: 'exitDelegation',
      onEnter: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'builtin/setVariable',
          args: {
            type: 'temp',
            name: 'exitDelegation',
            value: 'true'
          }
        }
      ],
      next: [{ condition: 'true', node: '#' }]
    },
    {
      name: 'errorDelegation',
      onEnter: [
        {
          type: sdk.NodeActionType.RunAction,
          name: 'builtin/setVariable',
          args: {
            type: 'temp',
            name: 'errorDelegation',
            value: 'true'
          }
        }
      ],
      next: [{ condition: 'true', node: '#' }]
    }
  ]
  return nodes
}

const createTransitions = (): sdk.NodeTransition[] => {
  return [
    { caption: 'On Exit Delegation', condition: `temp.exitDelegation  !== undefined`, node: '' },
    { caption: 'On End Delegation', condition: `temp.endDelegation  !== undefined`, node: '' },
    { caption: 'On error', condition: `temp.errorDelegation  !== undefined`, node: '' }
  ]
}

export default { generateFlow }
