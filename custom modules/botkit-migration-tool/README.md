## Overview

This migration tool exports single flow to BotKit JSON format.

### How to use

1. Edit your `data/global/botpress.config.json` and add the module location, like below:

```js
"modules": [
  ...
  {
    "location": "MODULES_ROOT/botkit-migration-tool",
    "enabled": true
  }
]
```

2. Create a bot.

3. Export flow:

```
http://localhost:3001/api/v1/bots/<BOT_ID>/mod/botkit-migration-tool/migrate?flow=<FLOW_NAME>&lang=<LANG>&token=notasecret
```
