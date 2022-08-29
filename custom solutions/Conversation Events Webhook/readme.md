# Conversation Events Webhook

This solution shows how you can create a conversation events webhook, to send events from Botpress to an external handler using HTTP Post Requests.

A new request will be sent to your server each time that a conversation event occurs

## before_incoming_middleware -> send user messages to your handler

Example of incoming events in the webhook

![image](https://user-images.githubusercontent.com/13484138/185236822-85973382-a515-4a49-bbb9-3b0ea3f5614d.png)

## before_outgoing_middleware -> send bot messages to your handler

Example of outgoing events in the webhook

![image](https://user-images.githubusercontent.com/13484138/185236561-ddf8981e-47a2-4d4c-994f-d90e9b18b78d.png)

# How to install

You will need to create an before_incoming_middleware hook or before_outgoing_middleware hook using the script available in this folder (conversation_events_webhook.js), decide which you want to create (or both) based on your own use case.

# How to use it

1 - In the code editor, create an before_incoming_middleware hook or before_outgoing_middleware hook using the script available in this folder (conversation_events_webhook.js):

![image](https://user-images.githubusercontent.com/13484138/185235821-0c08f73b-283a-4c0b-81c1-cc43b636947f.png)

2 - Modify the "config" object and specify the URL for the webhook endpoint of your system.

![image](https://user-images.githubusercontent.com/13484138/185235005-39f06c2c-339d-4cac-a206-eb71f60cceaf.png)

OBS: If you need any headers to be sent along side with the request, specify those in the 'headers' sub property.
