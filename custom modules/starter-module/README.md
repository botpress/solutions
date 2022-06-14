## Overview

This example includes a lot of "boilerplate" to create a module with almost all features you can implement from the documentation
Please check the [official documentation](https://botpress.com/docs/developers/create-module/) for more information

## Quick Start

1. Copy this folder to a dev folder.
2. Make your changes in the code.
3. Build using npm docker build. The build will be name "YOUR_PACKAGE_NAME.tgz" and be located in the root folder.
4. Open Botpress.
5. Go to the modules page.
6. Click Upload Modules. Select and submit the tgz file.
7. Click "Restart Server Now"
8. In the modules page, click unpack now next to your module's name.
9. Go back up to the list of Stable modules, and activate it by clicking the toggle next to the module's name.
10. Start editing a chatbot. notice the flag icon for the custom module.


## Docs and references 

Tips : 
If you can, make your changes in a Botpress Bot, then migrate them to the correct files in this starter-module, and build once. 

If you are looking for making a lot of changes and checking them often, we recommend you clone botpress/botpress, and use the commands in the documentations below to start a watcher. You will still need to restart the botpress server on every change. 

[Documentation](https://botpress.com/docs/building-chatbots/developers/custom-modules)

[Video series](https://botpress.com/docs/building-chatbots/developers/custom-modules)

## Including it with your Deployment. 

