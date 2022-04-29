This is an action that can be used to fetch the user's information from the Slack channel.

1.1 - Configure the additional scopes needed

1.1.1 - Go to your OAuth configuration page: https://api.slack.com/apps/[APP_ID]/oauth
1.1.2 - Add the following scopes in the Scopes section: users.profile:read
1.1.3 - [Important] Click into Reinstall app at the yellow banner and click on Allow

1.2 - Create the action
1.2.1 - Create the action using the script 'get-slack-profile.js' from the attachment
1.2.2 - Call the action to find slack details, it will populate the user.slackUser variable

1.2.3  The action will:

1.2.3.1  Query the database to the conversation Id (convId) and user Id (userId)
1.2.3.2  Get your token from the bot.config.json
1.2.3.3  Use that token to query the Slack API and get the profile using the endpoint: https://api.slack.com/methods/users.profile.get
1.2.3.4  use the response to populate 'user.slackUser'