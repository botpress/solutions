### What it does

Makes possible to send the current conversation to another bot (Forever), when finished, the user will continue the conversation flow

### How to do it

We can delegate messages to other bots by using the conversation API within actions, in that way, our current bot (bot 1) will act as a conversation proxy, sending to bot 2 everything that we send to him. First, we need to create the action (delegate.js)

![image](https://user-images.githubusercontent.com/13484138/113348651-3e0f9a80-930d-11eb-9e8a-1ebdba00575a.png)

The action receives the bot id as an argument.

We need to create a loop to always execute the action in order to keep talking with bot 2. We also need to be able to break the loop when wanted, to do that we are using the “exit” intent.

![image](https://user-images.githubusercontent.com/13484138/113348693-4e277a00-930d-11eb-83ff-7d5a086c6a91.png)

![image](https://user-images.githubusercontent.com/13484138/113348746-60091d00-930d-11eb-9289-54cef0bfcf78.png)

In Bot 2 we have a simple selection/loop flow in order to test the input delegation.

![image](https://user-images.githubusercontent.com/13484138/113348802-7911ce00-930d-11eb-9b6c-2dae149df398.png)

To reset the conversation with bot 2, we can use an action (reset_conversation.js)

This action should be called whenever we want to reset the conversation with a specific bot.

In the example below, we are resetting our conversation when we enter the conversation.

![image](https://user-images.githubusercontent.com/13484138/113348845-85962680-930d-11eb-9cf0-32d3d6aefaf3.png)

![image](https://user-images.githubusercontent.com/13484138/113348859-8af37100-930d-11eb-8542-8d6eac060b1e.png)

### Example Bots:

Import both bots and start talking with bot 1

Bot 1:
https://drive.google.com/file/d/1EW-N8UpfATsK-tyCRJmRNjIyi4o2DccL/view?usp=sharing

Bot2:
https://drive.google.com/file/d/1K0V8MRLy1Dw_rDNtD9e2O2UUBbJlnzKT/view?usp=sharing
