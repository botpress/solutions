### How to modify/develop new features to the module

1. Copy this folder to the `modules` folder of your botpress repository
2. Change the folder name to 'download-transcript-button'
3. Download dependencies and build the module: `yarn && yarn build`
4. Edit your `data/global/botpress.config.json` and add the module location, like below:
5. Run Botpress to see the module being used

```js
"modules": [
  ...
  {
    "location": "MODULES_ROOT/download-transcript-button",
    "enabled": true
  }
]
```

6. Change the source code
7. Build the module: `yarn build`
8. To package it and create a '.tgz' file, run `yarn && yarn build`
