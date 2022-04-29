This is an action that can be used to fetch the user's information from the Slack channel.


1. - Configure the additional scopes needed
      - Go to your OAuth configuration page: https://api.slack.com/apps/[APP_ID]/oauth
      - Add the following scopes in the Scopes section: users.profile:read
      - [Important] Click into Reinstall app at the yellow banner and click on Allow
2. - Create the action
      - Create the action using the script 'get-slack-profile.js' from actions folder
      - Call the action to find slack details, it will populate the user.slackUser variable
3. - The action will
      - Query the database for the conversation Id (convId) and user Id (userId)
      - Get your token from the bot.config.json
      - Use that token to query the Slack API and get the profile using the endpoint: https://api.slack.com/methods/users.profile.get
      - Use the response to populate 'user.slackUser'
