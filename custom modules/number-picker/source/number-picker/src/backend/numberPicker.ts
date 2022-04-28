import * as sdk from 'botpress/sdk'

export interface NumberPickerProps {
  randomId: string
  questionId?: string
  onInvalidContentId?: string
  varName?: string
  minValue?: string
  maxValue?: string
  retries: number
  showExit?: boolean
  roundOutput?: boolean
  sendPicker?: boolean
}

export const generateFlow = async (
  data: NumberPickerProps,
  metadata: sdk.FlowGeneratorMetadata
): Promise<sdk.FlowGenerationResult> => {
  const randomId = data.randomId
  const nbMaxRetries = Math.min(Number(data.retries), 10)
  const sorrySteps = []

  let args

  if (data.showExit) {
    args = {
      type: 'single-choice',
      choices: [
        {
          title: 'Back to Main Menu',
          value: 'BACK_TO_HOME'
        }
      ]
    }
  }

  if (data.onInvalidContentId && data.onInvalidContentId.length >= 3) {
    sorrySteps.push({
      type: sdk.NodeActionType.RenderElement,
      name: `#!${data.onInvalidContentId}`,
      args
    })
  }

  const entryOnEnter: any = [
    {
      type: sdk.NodeActionType.RenderElement,
      name: `#!${data.questionId}`,
      args: { skill: 'number-picker' }
    }
  ]

  if (data.sendPicker) {
    entryOnEnter.push({
      type: sdk.NodeActionType.RunAction,
      name: 'number-picker/send-number-picker',
      args: data
    })
  }

  const keySuffix = data.randomId ? `-${data.randomId}` : ''
  const validKey = `skill-number-picker-valid${keySuffix}`

  return {
    flow: {
      nodes: [
        {
          name: 'entry',
          onEnter: entryOnEnter,
          next: [{ condition: 'true', node: 'parse' }]
        },
        {
          name: 'parse',
          onReceive: [
            {
              type: sdk.NodeActionType.RunAction,
              name: 'number-picker/number-parse-answer',
              args: data
            }
          ],
          next: [
            { condition: `temp['${validKey}'] === true`, node: '#' },
            { condition: 'true', node: 'invalid' }
          ]
        },
        {
          name: 'invalid',
          onEnter: [
            {
              type: sdk.NodeActionType.RunAction,
              name: 'number-picker/number-invalid-answer',
              args: { randomId }
            }
          ],
          next: [
            {
              condition: `Number(temp['skill-number-picker-invalid-count-${randomId}']) > Number(${nbMaxRetries})`,
              node: '#'
            },
            { condition: 'true', node: 'sorry' }
          ]
        },
        {
          name: 'sorry',
          onEnter: sorrySteps,
          next: [{ condition: 'true', node: 'parse' }]
        }
      ],
      catchAll: {
        next: []
      }
    },
    transitions: createTransitions(data)
  }
}

const createTransitions = (data): sdk.NodeTransition[] => {
  const keySuffix = data.randomId ? `-${data.randomId}` : ''
  const validKey = `skill-number-picker-valid${keySuffix}`
  return [
    {
      caption: 'On success',
      condition: `temp['${validKey}'] === true`,
      node: ''
    },
    {
      caption: 'On failure (or abort)',
      condition: `temp['${validKey}'] !== true || event.payload.payload === 'BACK_TO_HOME'`,
      node: ''
    }
  ]
}

export default { generateFlow }
