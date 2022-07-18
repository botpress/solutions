# Create Link to Download Conversation History

This solution will create a API endpoint that authenticated users can use to view information about a specific user/conversation in regardins to HITL-Next

# How to install

1. Create the after_server_start hook available in this folder (HITLDetails.js) as a global hook in your server, and restart your server

# How to use it

With an conversationId or userId in hands, use the endpoint below changing the arguments

## With conversationId: 

{EXTERNAL_URL}/api/v1/bots/___/mod/hitl-custom/conversation?conversationId={CONVERSATION_ID}&botId={BOT_ID}

Example: http://localhost:3000/api/v1/bots/___/mod/hitl-custom/conversation?conversationId=7ee908f5-a945-45a5-9d8f-e4d3d77d7d65&botId=hitl-history

OBS: The conversationId will be the "threadId" property of your incoming/outgoing event

## With userId

{EXTERNAL_URL}/api/v1/bots/___/mod/hitl-custom/conversation?userId={USER_ID}&botId={BOT_ID}

Example:

http://localhost:3000/api/v1/bots/___/mod/hitl-custom/conversation?userId=9760d818-63c8-41af-8fc6-197eba672ed8&botId=hitl-history

OBS: The userId will be the "target" property of your incoming/outgoing event

## Listing messages

You can also list the messages from each conversation, you just need to add the "listMessages" argument to the url, example:

{EXTERNAL_URL}/api/v1/bots/___/mod/hitl-custom/conversation?userId={USER_ID}&botId={BOT_ID}&listMessages=true

