# HITL Use Events Webhook

This solution shows how you can use the HITL Next new events webhook.

A new request will be sent to your server each time that a HITL Next event is triggered.

Including: Agent Status change (Online, Offline), Handoff status change (Created, Assigned, Resolved, Rejected)

## Examples:

When a handoff is Created, you are going to receive this request:

Post request from webhook
````javascript
 "body": {
  "botId": "hitl-history",
  "resource": "handoff",
  "type": "create",
  "id": 55,
  "payload": {
   "id": 55,
   "botId": "hitl-history",
   "agentId": null,
   "userId": "9644ad57-d021-47a6-96eb-4e0c7511df64",
   "userThreadId": "a8fd4b21-1896-4bb8-8996-28ebf957ff5c",
   "userChannel": "web",
   "agentThreadId": null,
   "status": "pending",
   "tags": null,
   "assignedAt": null,
   "resolvedAt": null,
   "createdAt": "2022-08-19T13:27:32.174Z",
   "updatedAt": "2022-08-19T13:27:32.174Z",
   "comments": [],
   "user": {
    "id": "9644ad57-d021-47a6-96eb-4e0c7511df64",
    "attributes": {
     "timezone": -3,
     "language": "pt"
    }
   },
   "userConversation": {
    "id": "1560222381682845",
    "direction": "incoming",
    "botId": "hitl-history",
    "channel": "web",
    "success": null,
    "createdOn": "2022-08-19T13:27:25.337Z",
    "threadId": "a8fd4b21-1896-4bb8-8996-28ebf957ff5c",
    "type": "text",
    "event": {
     "type": "text",
     "channel": "web",
     "direction": "incoming",
     "payload": {
      "type": "text",
      "text": "Hey"
     },
     "target": "9644ad57-d021-47a6-96eb-4e0c7511df64",
     "botId": "hitl-history",
     "createdOn": "2022-08-19T13:27:25.336Z",
     "threadId": "a8fd4b21-1896-4bb8-8996-28ebf957ff5c",
     "id": "1560222381682845",
     "preview": "Hey",
     "flags": {},
     "state": {
      "__stacktrace": [
       ​...
      ],
      "user": {
       "timezone": -3,
       "language": "pt"
      },
      "context": {
       "currentFlow": "skills/choice-6b6ccc.flow.json",
       "currentNode": "parse",
       "previousFlow": "main.flow.json",
       "previousNode": "choice-6b6ccc",
       "jumpPoints": [
        {
         "flow": "main.flow.json",
         "node": "choice-6b6ccc"
        }
       ],
       "queue": {
        "instructions": [
         ​...
        ]
       }
      },
      "session": {
       "lastMessages": [
        ​ ...
       ],
       "workflows": {},
       "slots": {}
      },
      "temp": {
       ​ ...
      }
     },
     "messageId": "75a870c3-1974-4296-91d8-9c825ae7bcdc",
     "suggestions": [],
     "nlu": {
      "entities": [],
      "language": "n/a",
      "ambiguous": false,
      "slots": {},
      "intent": {
       "name": "none",
       "confidence": 1,
       "context": "global"
      },
      "intents": [],
      "errored": false,
      "includedContexts": [
       "global"
      ],
      "ms": 0
     },
     "processing": {
      ​...
     },
     "activeProcessing": {},
     "decision": {
      "decision": {
       "reason": "no suggestion matched",
       "status": "elected"
      },
      "confidence": 1,
      "payloads": [],
      "source": "decisionEngine",
      "sourceDetails": "execute default flow"
     }
    }
   }
  }
 },
 "headers": {
    ....
 }
````
As you can see, it will show you lots of data, including data from the user conversation with the bot, which included userId (userId) and userThreadId (conversationId).

HITL: When a user stops talking with the bot and starts talking in the HITL next module, what happens in the background is Botpress creates a new conversation and starts forwarding messages (user/agent) between those conversations,

After the handoff is assigned to an Agent (Agent on HITL Next), what you are going to receive in your webhook is:

Post request from webhook
````javascript
 "body": {
  "botId": "hitl-history",
  "resource": "handoff",
  "type": "update",
  "id": 54,
  "payload": {
   "id": 54,
   "botId": "hitl-history",
   "agentId": "e472f302e701c8cb0a66d64a2167b542",
   "userId": "f647663e-d647-4974-bd58-cd56cce64c5f",
   "userThreadId": "6e7ef0bf-2749-4082-9c8c-5935a84b1745",
   "userChannel": "web",
   "agentThreadId": "0ec07e29-5dcc-47e0-91ee-71479eeaa50a",
   "status": "assigned",
   "tags": null,
   "assignedAt": "2022-08-19T13:34:27.027Z",
   "resolvedAt": null,
   "createdAt": "2022-08-19T13:26:33.218Z",
   "updatedAt": "2022-08-19T13:34:27.027Z",
   "comments": [],
   "user": {
    "id": "f647663e-d647-4974-bd58-cd56cce64c5f",
    "attributes": {
     "timezone": -3,
     "language": "pt"
    }
   },
   "userConversation": {
    "id": "1502614293684375",
    "direction": "incoming",
    "botId": "hitl-history",
    "channel": "web",
    "success": null,
    "createdOn": "2022-08-19T13:26:27.729Z",
    "threadId": "6e7ef0bf-2749-4082-9c8c-5935a84b1745",
    "type": "text",
    "event": {
     "type": "text",
     "channel": "web",
     "direction": "incoming",
     "payload": {
      "type": "text",
      "text": "Hey"
     },
     "target": "f647663e-d647-4974-bd58-cd56cce64c5f",
     "botId": "hitl-history",
     "createdOn": "2022-08-19T13:26:27.728Z",
     "threadId": "6e7ef0bf-2749-4082-9c8c-5935a84b1745",
     "id": "1502614293684375",
     "preview": "Hey",
     "flags": {},
     "state": {
      "__stacktrace": [
       ​...
      ],
      "user": {
       "timezone": -3,
       "language": "pt"
      },
      "context": {
       "currentFlow": "skills/choice-6b6ccc.flow.json",
       "currentNode": "parse",
       "previousFlow": "main.flow.json",
       "previousNode": "choice-6b6ccc",
       "jumpPoints": [
        ​...
       ],
       "queue": {
        "instructions": [
         ​...
        ]
       }
      },
      "session": {
       "lastMessages": [
        ​...
       ],
       "workflows": {},
       "slots": {}
      },
      "temp": {
       ​...
      }
     },
     "messageId": "5539d396-9559-448e-8901-0efe293f8a4a",
     "suggestions": [],
     "nlu": {
      "entities": [],
      "language": "n/a",
      "ambiguous": false,
      "slots": {},
      "intent": {
       "name": "none",
       "confidence": 1,
       "context": "global"
      },
      "intents": [],
      "errored": false,
      "includedContexts": [
       "global"
      ],
      "ms": 0
     },
     "processing": {
      ​...
     },
     "activeProcessing": {},
     "decision": {
      "decision": {
       "reason": "no suggestion matched",
       "status": "elected"
      },
      "confidence": 1,
      "payloads": [],
      "source": "decisionEngine",
      "sourceDetails": "execute default flow"
     }
    }
   }
  }
 },
 "headers": {
  ​...
 }
````
Now you can also see the "agentThreadId" (conversationId) and "agentId" (userId from the agent); those are related to that second conversation that is open, which was mentioned previously.

# How to install

You will need to have a version greater than 12.29.1 working in your setup

# How to use it

1 - In the code editor, go to your global "Module Configuration" section and select hitlnext.json

![image](https://user-images.githubusercontent.com/13484138/182180204-8992933b-ba6d-403c-aecd-14635269c4ba.png)

2 - Modify the "eventsWebHook" object and specify the URL for the webhook endpoint of your system.

![image](https://user-images.githubusercontent.com/13484138/182180474-3a22a97e-ce6c-4f6d-9c92-4aa90df2734b.png)

OBS: If you need that that any headers to be sent along side with the request, specify those in the 'headers' sub property.

![image](https://user-images.githubusercontent.com/13484138/182180734-e91974e4-cff0-42c7-be33-4d7a0345e256.png)

