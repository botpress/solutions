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

## Example Response

```json{
"conversations": [
  {
    "isTalkingWithAgent": false,
    "isAwatingForAgent": false,
    "conversationId": "04ada4ff-cbaf-480c-ad6c-be19fe78aff8",
    "handoffs": [
      {
        "id": 7,
        "botId": "hitl-history",
        "userId": "318a4b61-352b-4444-80a3-05ee83b19930",
        "agentId": "e472f302e701c8cb0a66d64a2167b542",
        "userThreadId": "04ada4ff-cbaf-480c-ad6c-be19fe78aff8",
        "userChannel": "web",
        "agentThreadId": "2c7265ae-bf8c-46c5-8647-9040d76e5bdf",
        "status": "resolved",
        "tags": null,
        "assignedAt": "2022-07-18T18:49:53.925Z",
        "resolvedAt": "2022-07-18T18:50:22.019Z",
        "createdAt": "2022-07-18T18:49:49.427Z",
        "updatedAt": "2022-07-18T18:50:22.019Z"
      }
    ],
    "messages": [
      {
        "id": "ff237116-ce62-40fb-aeae-bd90fe625098",
        "authorId": "318a4b61-352b-4444-80a3-05ee83b19930",
        "sentOn": "2022-07-18T18:49:45.324Z",
        "payload": {
          "type": "text",
          "text": "Hello"
        }
      },
      {
        "id": "93e1cbd3-5612-40b0-a43c-e82c3db52c40",
        "authorId": null,
        "sentOn": "2022-07-18T18:49:49.438Z",
        "payload": {
          "type": "text",
          "text": "You are being transferred to an agent."
        }
      },
      {
        "id": "21b93085-048c-4393-8f24-7fc7925ad622",
        "authorId": null,
        "sentOn": "2022-07-18T18:50:04.392Z",
        "payload": {
          "type": "text",
          "text": "This is Agent, how can i help?",
        },
        "isFromAgent": true,
        "hitl": {
          "agentId": "e472f302e701c8cb0a66d64a2167b542",
          "handoffId": 7
        }
      },
      {
        "id": "5fcb19e9-ef9a-4f32-a4ed-779738df29dd",
        "authorId": "318a4b61-352b-4444-80a3-05ee83b19930",
        "sentOn": "2022-07-18T18:50:18.875Z",
        "payload": {
          "type": "text",
          "text": "This is user, resolve this conversation"
        },
        "hitl": {
          "agentId": "e472f302e701c8cb0a66d64a2167b542",
          "handoffId": 7
        }
      },
      {
        "id": "7d35a838-8f70-40e4-bc05-1533d21b1f6b",
        "authorId": null,
        "sentOn": "2022-07-18T18:50:22.060Z",
        "payload": {
          "type": "text",
          "workflow": {},
          "text": "Handoff resolved",
          "markdown": true,
          "typing": true
        }
      },
    ],
    "isTalkingWithAgent": false,
    "isAwatingForAgent": false
}
```

