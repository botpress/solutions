import * as sdk from 'botpress/sdk'
import { MODULE_NAME } from '.'

export const generateFlow = async (
  data: any,
  metadata: sdk.FlowGeneratorMetadata
): Promise<sdk.FlowGenerationResult> => {
  return {
    flow: {
      nodes: [
        {
          name: 'entry',
          onEnter: [
            {
              type: sdk.NodeActionType.RunAction,
              name: `${MODULE_NAME}/send-date-picker`,
              args: data
            }
          ],
          onReceive: [
            {
              type: sdk.NodeActionType.RunAction,
              name: 'date-picker/date-extract',
              args: {}
            }
          ],
          next: [{ condition: 'true', node: '#' }]
        }
      ],
      catchAll: {
        next: []
      }
    },
    transitions: createTransitions()
  }
}

const createTransitions = (): sdk.NodeTransition[] => {
  return [
    { caption: 'On success', condition: 'temp.startDate', node: '' },
    { caption: 'On cancel', condition: '!temp.startDate', node: '' }
  ]
}

export default { generateFlow }
