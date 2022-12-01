  if (event.channel != 'teams') return

  const axios = require('axios')

  const getAuth = async () => {
    const config = await bp.bots.getBotById(event.botId)
    const channels = config.messaging.channels

    const { appId, appPassword, serviceUrl } = channels.teams

    const querystring = require('querystring')
    const { data } = await axios.post(
      'https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token',
      querystring.stringify({
        grant_type: 'client_credentials',
        client_id: appId,
        client_secret: appPassword,
        scope: 'https://api.botframework.com/.default'
      })
    )

    return { token: data.access_token, serviceUrl }
  }

  const getTeamsMessagingInfo = async () => {
    const getName = async query => {
      const result = await bp.database.raw(query)
      return result.rows ? result.rows[0].name : result[0].name
    }

    const convId = await getName(
      `SELECT name FROM msg_threads s, msg_convmap m WHERE s.id = m.threadId AND m.conversationId = '${event.threadId}'`
    )

    return { convId }
  }

  const sendActivity = async (activity, auth) => {
    const { convId } = await getTeamsMessagingInfo()
    await axios.post(
      `${auth.serviceUrl || 'https://smba.trafficmanager.net/in/'}/v3/conversations/${convId}/activities`,
      activity,
      {
        headers: {
          Authorization: 'Bearer ' + auth.token
        }
      }
    )
  }

  const run = async () => {
    const auth = await getAuth()
    // Since this will not go into our messaging pipeline, we need to wait a little bit
    // to not send this before
    new Promise((resolve)=>setTimeout(resolve, 500))
    await sendActivity({ type: 'typing' }, auth)
    await sendActivity(
      {
        type: 'message',
        attachments: [
          {
            contentType: 'application/vnd.microsoft.card.adaptive',
            content: {
              $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
              type: 'AdaptiveCard',
              version: '1.0',
              body: [
                {
                  type: 'Container',
                  items: [
                    {
                      type: 'TextBlock',
                      text: 'Publish Adaptive Card schema',
                      weight: 'bolder',
                      size: 'medium'
                    },
                    {
                      type: 'ColumnSet',
                      columns: [
                        {
                          type: 'Column',
                          width: 'auto',
                          items: [
                            {
                              type: 'Image',
                              url:
                                'https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg',
                              size: 'small',
                              style: 'person'
                            }
                          ]
                        },
                        {
                          type: 'Column',
                          width: 'stretch',
                          items: [
                            {
                              type: 'TextBlock',
                              text: 'Matt Hidinger',
                              weight: 'bolder',
                              wrap: true
                            },
                            {
                              type: 'TextBlock',
                              spacing: 'none',
                              text: 'Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}',
                              isSubtle: true,
                              wrap: true
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'Container',
                  items: [
                    {
                      type: 'TextBlock',
                      text:
                        'Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.',
                      wrap: true
                    },
                    {
                      type: 'FactSet',
                      facts: [
                        {
                          title: 'Board:',
                          value: 'Adaptive Card'
                        },
                        {
                          title: 'List:',
                          value: 'Backlog'
                        },
                        {
                          title: 'Assigned to:',
                          value: 'Matt Hidinger'
                        },
                        {
                          title: 'Due date:',
                          value: 'Not set'
                        }
                      ]
                    }
                  ]
                }
              ],
              actions: [
                {
                  type: 'Action.ShowCard',
                  title: 'Set due date',
                  card: {
                    type: 'AdaptiveCard',
                    body: [
                      {
                        type: 'Input.Date',
                        id: 'dueDate'
                      }
                    ],
                    actions: [
                      {
                        type: 'Action.Submit',
                        title: 'OK'
                      }
                    ]
                  }
                },
                {
                  type: 'Action.ShowCard',
                  title: 'Comment',
                  card: {
                    type: 'AdaptiveCard',
                    body: [
                      {
                        type: 'Input.Text',
                        id: 'comment',
                        isMultiline: true,
                        placeholder: 'Enter your comment'
                      }
                    ],
                    actions: [
                      {
                        type: 'Action.Submit',
                        title: 'OK'
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      },
      auth
    )
  }

  return run()