## Overview

This is the custom module which was showcased during the demonstration.
Please check the [official documentation](https://botpress.com/docs/developers/create-module/) for more information

## Quick Start

1. Copy the contents of this folder to to `modules/akeed-custom-module`
2. Open a terminal in the folder `modules/akeed-custom-module` and type `yarn && yarn build`
3. Edit your `botpress.config.json` and add the module definition so it will be loaded:

```js
{
  ...
  "modules": [
    ...
    {
      "location": "MODULES_ROOT/akeed-custom-module",
      "enabled": true
    },
}
```

4. Start Botpress: `yarn start`

## Continuous Development

When you make changes to any portion of your module, you need to build it and restart Botpress.

You can type `yarn watch` which will save you some time, since every time you make a change, the source will be compiled immediately. You will only have to restart Botpress.
