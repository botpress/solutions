# Delegate-Bot-conversation
Original author: @bassamtantawi-botpress 

Last updated by @bassamtantawi-botpress on June 27 2022

## Overview

This module includes the `Start Delegation` and `End Delegation` skills which can be used to delegate conversations from one Bot to another.

## Use cases:
Allows bots to delegate to each other

## Quick Start

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

## How it works

1. `Start Delegation`: Place the skill on any of the delegator bot's flows, where you want to start a delegation

- Inputs:

  **Bots:** Comma separated list of Bot Ids. If only 1 bot Id is suppled, this will be a point to point communication and confidence will be ignored.
  **Important:** IF there are multiple bots, only bots with a detected intent other than "none" will be considered

  **Text (optional):** If set, Text to be used as the first message when initiating a session with a sub bot rather than using event.preview

  **Intent:** Intent to be used by the delegator bot to force the delegation to end.

- Transitions:

  **On Exit Delegation** (Forced by the delegator)

  **On End Delegation** (Whenever the sub Bot reaches the End Delegation skill)

  **On Error**

2. `End Delegation`: Place the skill on any of the sub bot's flows, where you want to end the delegation. There's no configuration needed, just drag and drop.
   **Important**: At least one message must be sent to the sub Bot in order to end the delegation.
