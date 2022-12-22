# Riva Module
Original author: @allardy

## Overview
The Riva Skills module provides an interface so you can talk to your bot using your voice, and get an answer as voice

## How to use
1. Upload the module on your server
2. On the code editor, edit the `riva.json` module config file
3. Set the property `serverAddress` to your own server, ex: `127.0.0.1:55011`
4. Open the page `http://localhost:3000/assets/modules/riva/webchat.html?botId=smalltalk` (replace the botId and the url with your own)

### Setting up the Riva Server

1. Create a new EC2 instance

- Instance Type: g4dn.xlarge
- Amazon Machine Image: Deep Learning AMI (Ubuntu 18.04)
- Storage: at least 200gb

2. Log on your newly created instance

3. Install the Nvidia GPU Cloud CLI tool: https://ngc.nvidia.com/setup/installers/cli

4. Create an account for NGC and obtain your API key: https://docs.nvidia.com/ngc/ngc-overview/index.html#account-signup

5. Configure your API key on your NGC installation

- ngc config set

6. Follow the quick start guide to get up and running (follow data center steps): https://docs.nvidia.com/deeplearning/riva/user-guide/docs/quick-start-guide.html

- ngc registry resource download-version nvidia/riva/riva_quickstart:2.0.0
- cd riva_quickstart_v2.0.0
- bash riva_init.sh
- bash riva_start.sh
- bash riva_start_client.sh

7. On AWS, open the port 50051 on your server

8. Configure your external ip with that port on thew riva module

### How it works

1. The wav is recorded on the webchat
2. The content is sent to a special endpoint on the riva module
3. An event is sent on the channel `riva`
4. The dialog engine then sends the responses on the same channel
5. The module handles the outgoing middleware; sending a special payload to the webchat

### Update protos

When protocols are updated, we must regenerate the javascript implementation and the typescript definition.

1. Replace files in the folder `riva_protos`
2. Type `yarn buildJs`

The typescript definition only works on linux and requires a manual step

1. Type `yarn buildTs`
2. Edit files `riva_*.d.ts` to replace `from 'grpc` to `from '@grpc/grpc-js'`
