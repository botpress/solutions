# Delegate-Bot-conversation
Original author: @bassamtantawi-botpress 

Last updated by @bassamtantawi-botpress on June 27 2022

<img width="1028" alt="image" src="https://user-images.githubusercontent.com/77560236/177606624-65d9052c-c4d6-4f5f-9d91-49d7602bdf30.png">

## Overview

This module includes the `Start Delegation` and `End Delegation` skills which can be used to delegate conversations from a primary bot to one or more secondary bots.

## Use cases:
Allows bots to delegate- ie transfer a chat- back and forth. This way, a development team can create separate bots by topic domain (such as a HR bot, an IT bot, and an Events bot), and one single primary bot can transfer users among those bots as needed.

## How use

### Install the module:
1. Copy the folder `delegate-bot-conversation` to `modules/`
2. Open a terminal in the folder `modules/delegate-bot-conversation` and type `yarn && yarn build`
3. Edit your `botpress.config.json` and add the module definition so it will be loaded:

```js
{
  ...
  "modules": [
    ...
    {
      "location": "MODULES_ROOT/delegate-bot-conversation",
      "enabled": true
    },
}
```

4. Start Botpress: `yarn start`
5. Choose any bots in your workspace, then you should see the module in the sidebar !

### Building a Primary-Secondary Bot Ensemble

1. Create your master bot. This bot will be the first bot users talk to, so it should greet the user and prompt them.

2. Delegation is accomplished with the `Start Delegation` skill. Place it on any of the delegator bot's flows after prompting the user. Delegation can be done via **Point-to-Point** or **Ensemble**:

  **Point-to-Point**: Messages go straight from the primary bot to one specific secondary bot.
  
  **Ensemble**: Messages are sent to all secondary bots, and the secondary bot that matches with the highest confidence is delegated to.
  
 3. Once a chat is delegated, the use will stay with that secondary bot until they reach an `Exit Delegation` skill or match with the primary bot's exit intent.

- Inputs:

<img width="453" alt="image" src="https://user-images.githubusercontent.com/77560236/177606482-3181cfbb-65c9-414b-acc9-9fd8d86f9e36.png">

- Inputs:

  **Bots:** Comma separated list of Bot Ids.
  - For **Point-to-Point**, list only one botId
  - For **Ensemble**, list multiple botIds

  **Text (optional):** If set, Text to be used as the first message when initiating a session with a sub bot rather than using event.preview

  **Intent:** Intent to be used by the delegator bot to force the delegation to end.

- Transitions:

<img width="266" alt="image" src="https://user-images.githubusercontent.com/77560236/177606689-a4316240-6c57-4056-9da8-5d634829ba83.png">


  **On Exit Delegation** (When the primary bot's exit intent is matched)

  **On End Delegation** (Whenever the secondary Bot reaches its End Delegation skill)

  **On Error** (No secondary bots matched or there was an error)

4. In your secondary bots, place the `End Delegation` skill where users should be sent back to the primary bot. There's no configuration needed, just drag and drop!
   **Important**: At least one message must be sent to the secondary Bot in order to end the delegation.
   
<img width="997" alt="image" src="https://user-images.githubusercontent.com/77560236/177607880-4d7bd2ae-a945-42ba-b6da-935bd9163f27.png">
