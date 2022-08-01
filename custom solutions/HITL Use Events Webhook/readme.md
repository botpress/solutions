# HITL Use Events Webhook

This solution shows how you can use the HITL Next new events webhook.

A new request will be sent to your server each time that a HITL Next event is triggered.

Including: Agent Status change (Online, Offline), Handoff status change (Created, Assigned, Resolved, Rejected)

Example: 

![image](https://user-images.githubusercontent.com/13484138/182182115-ac16feb8-e7ab-493f-9d36-d97cb1ade2f0.png)


# How to install

You will need to have a version greater than 12.29.1 working in your setup

# How to use it

1 - In the code editor, go to your global "Module Configuration" section and select hitlnext.json

![image](https://user-images.githubusercontent.com/13484138/182180204-8992933b-ba6d-403c-aecd-14635269c4ba.png)

2 - Modify the "eventsWebHook" object and specify the URL for the webhook endpoint of your system.

![image](https://user-images.githubusercontent.com/13484138/182180474-3a22a97e-ce6c-4f6d-9c92-4aa90df2734b.png)

OBS: If you need that that any headers to be sent along side with the request, specify those in the 'headers' sub property.

![image](https://user-images.githubusercontent.com/13484138/182180734-e91974e4-cff0-42c7-be33-4d7a0345e256.png)

