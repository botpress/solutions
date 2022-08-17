# Conversation Events Webhook

This solution shows how you can create an conversationevents webhook, to send events from Botpress to an external handler using HTTP.

A new request will be sent to your server each time that an conversation event occurs

Example: 

![image](https://user-images.githubusercontent.com/13484138/182182115-ac16feb8-e7ab-493f-9d36-d97cb1ade2f0.png)


# How to install

You will need to create an before_incoming_middleware hook or before_outgoing_middleware hook using the script available in this folder (conversation_events_webhook.js)

before_incoming_middleware -> send user messages to your handler
before_outgoing_middleware -> send bot messages to your handler

# How to use it

1 - In the code editor, create an before_incoming_middleware hook or before_outgoing_middleware

![image](https://user-images.githubusercontent.com/13484138/182180204-8992933b-ba6d-403c-aecd-14635269c4ba.png)

2 - Modify the "config" object and specify the URL for the webhook endpoint of your system.

![image](https://user-images.githubusercontent.com/13484138/182180474-3a22a97e-ce6c-4f6d-9c92-4aa90df2734b.png)

OBS: If you need that that any headers to be sent along side with the request, specify those in the 'headers' sub property.

![image](https://user-images.githubusercontent.com/13484138/182180734-e91974e4-cff0-42c7-be33-4d7a0345e256.png)

