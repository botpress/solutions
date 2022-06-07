# BotKit Migration Tool

Original author: @bassamtantawi-botpress

Last updated by @bassamtantawi-botpress on 25 May 2022

## Overview
This module lets you export a single Botpress flow into a JSON file compatible with [BotKit](https://github.com/howdyai/botkit), another open-source chatbot development tool.

## Use cases:
1. Migrate a flow that was built in Botpress into your existing BotKit ecosystem.

## How to use
This is a custom module, so you will need to add it to your Botpress instance before being able to use it. To install:
1. Download [botkit-migration-tool.tgz](https://github.com/botpress/solutions/raw/master/custom%20modules/botkit-migration-tool/botkit-migration-tool.tgz)
2. In your Botpress admin panel, click on the 'modules' tab

<img width="135" alt="image" src="https://user-images.githubusercontent.com/77560236/171877989-fe27aff3-20fa-4879-bb5c-d3712c118c3f.png">

3. Click on `Upload Module` and upload the file from step 1

<img width="206" alt="image" src="https://user-images.githubusercontent.com/77560236/171878085-ea536fcf-cf4c-4eb6-b23a-922bb06fed1c.png">

4. Restart your Botpress instance
5. Once Botpress is back, return to the modules tab and scroll to the `Compressed Modules` section at the bottom. Find "botkit-migration-tool" and click `Unpack Module`

<img width="157" alt="image" src="https://user-images.githubusercontent.com/77560236/171878308-457130f1-8055-444f-ab14-43582d513512.png">

6. Once the module is unpacked, hit the blue toggle to enable it.

<img width="40" alt="image" src="https://user-images.githubusercontent.com/77560236/171879645-f80a7c8e-1c11-466f-96a3-effbc22eeb1d.png">


8. Restart Botpress

Once the module is installed, exporting a flow is as simple as navigating to a specific URL:

`<ENDPOINT>:3001/api/v1/bots/<BOT_ID>/mod/botkit-migration-tool/migrate?flow=<FLOW_NAME>&lang=<LANG>&token=notasecret`

Where:
- `ENDPOINT` is the URL where Botpress is exposed. If you're running Botpress locally, it's likely `https://localhost`
- `BOT_ID` is the ID of the bot whose flow you want to export.
- `FLOW_NAME` is the name of the flow you want to export
- `LANG` is the two-letter language code for the desired language export. 

Navigating to this URL will automatically start to download a JSON file to your browser. You can then use this JSON file to re-create the Botpress flow in BotKit
