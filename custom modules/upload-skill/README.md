## Overview

Botpress skill to upload media files to database or AWS S3

### How to use

1. Copy the folder `upload-skill` to `modules/upload-skill`
2. Open a terminal in the folder `modules/upload-skill` and type `yarn && yarn build`
3. Edit your `botpress.config.json` and add the module location, like below:

```js
"modules": [
  ...
  {
    "location": "MODULES_ROOT/upload-skill",
    "enabled": true
  }
]
```

4. Edit `data/bots/your_bot_name/bot.config.json` and add the desired content types in the `contentTypes` section.

```
"contentTypes": [
      "upload_file",
      ...
    ]
  }
```

5. Start Botpress: `yarn start`
6. Choose any bots in your workspace, then you should see the module in the sidebar !

### Avaliable content types

- `upload_file`
