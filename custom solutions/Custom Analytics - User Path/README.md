### What it does

Sends user path telemetry to a new custom table

### How to do it

1 - Create global hooks (after_bot_mount, after_bot_unmount, before_incoming_middleware)

2 - Create bot hooks for bots that you want to track (after_incoming_middleware)

3 - Restart server and talk to the bot

4 - Check results by quering the database (table 'custom-analytics') or making Curl request bellow (Change [BOTPRESS_URL], [BOT_ID] and [TOKEN]):

curl --location --request GET '[BOTPRESS_URL]/api/v1/bots/[BOT_ID]/mod/custom-analytics/aggregate' \
--header 'authorization: Bearer [TOKEN]
