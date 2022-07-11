const axios = require('axios')
/**
 * Sends a form that will be caught in temp.formValues[firstAnswer,secondAnswer,thirdAnswer]
 * @title Send form in slack
 * @category Custom
 * @author Botpress
 * @param {string} firstTitle first question title - What's your name?
 * @param {string} secondTitle second question title - What's your favorite photo editor?
 * @param {string} selectTitle label for asking selector questions  - How can I help you?
 * @param {string} selectOptions options seperated by a pipe (|) operator - Support|Sales information|Complaint
 */
const getMessagingInfo = async () => {
  const getName = async query => {
    const result = await bp.database.raw(query)
    return result.rows ? result.rows[0].name : result[0].name
  }

  const userId = await getName(
    `SELECT name FROM msg_senders s, msg_usermap m WHERE s.id = m.senderId AND m.userId = '${event.target}'`
  )

  return { userId }
}

// if you want to change the form type, change it here
// You can use this builder link to customize it to your needs https://app.slack.com/block-kit-builder/
// just make sure you set your labels, action_ids to something you want
const sendPayloadForUser = async (userId, { firstTitle, secondTitle, selectTitle, selectOptions }) => {
  const botToken = (await bp.bots.getBotById(event.botId)).messaging.channels.slack.botToken

  const formatedSelectOptions = selectOptions.split('|').map(option => {
    return {
      text: {
        type: 'plain_text',
        text: option,
        emoji: true
      },
      value: option
    }
  })

  return axios({
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + botToken
    },
    url: 'https://slack.com/api/chat.postMessage',
    data: {
      type: 'block_actions',
      channel: userId,
      blocks: [
        {
          type: 'input',
          element: {
            type: 'plain_text_input',
            action_id: 'firstAnswer'
          },
          label: {
            type: 'plain_text',
            text: firstTitle,
            emoji: true
          }
        },
        {
          type: 'input',
          element: {
            type: 'plain_text_input',
            action_id: 'secondAnswer'
          },
          label: {
            type: 'plain_text',
            text: secondTitle,
            emoji: true
          }
        },
        {
          type: 'input',
          element: {
            type: 'static_select',
            options: formatedSelectOptions,
            action_id: 'thirdAnswer'
          },
          label: {
            type: 'plain_text',
            text: selectTitle,
            emoji: true
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Click Me',
                emoji: true
              },
              value: 'click_me_123',
              action_id: 'actionId-0'
            }
          ]
        }
      ]
    }
  })
}

const sendForm = async formContent => {
  if (event.channel === 'slack') {
    const { userId } = await getMessagingInfo()
    bp.logger.info(userId)
    return sendPayloadForUser(userId, formContent)
  }
  // add Microsoft Teams code in it's own action, or here
}

return sendForm(args)
