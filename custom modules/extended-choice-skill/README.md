### How to use

1. Edit your `data/global/botpress.config.json` and add the module location, like below:

```js
"modules": [
  ...
  {
    "location": "MODULES_ROOT/extended-choice-skill",
    "enabled": true
  }
]
```

2. Edit `data/bots/your_bot_name/bot.config.json` and add the desired content types in the `contentTypes` section.

```
"contentTypes": [
      "extended-choice-skill",
      ...
    ]
  }
```

3. Copy `data/global/config/basic-skills.json` into current bot `data/bots/your_bot_name/config/basic-skills.json` and modify the following fields, like below:

```
{
  "defaultContentElement": "extended-choice-skill",
  "defaultContentRenderer": "#QuickReplies",
}
```

### Avaliable content types

- `extended-choice-skill`
