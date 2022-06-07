# download-transcript-button

Original author: @davidvitora

Last updated by @davidvitora 4 June 2021

## Overview
Creates an action that sends a button to the user, which downloads the conversation transcript.

## Use cases:
Helpful for cases where the chat user would like to refer back to the conversation later, especially if there is a bot to agent handoff. 

## How to use
1 - Import, the module "download-transcript-button.tgz" at the admin panel

![image](https://user-images.githubusercontent.com/13484138/120817221-e9b0b300-c527-11eb-8b85-bd57c7258342.png)

![image](https://user-images.githubusercontent.com/13484138/120817410-11078000-c528-11eb-8c81-7b2d5594e2dc.png)

2 - Restart Botpress

![image](https://user-images.githubusercontent.com/13484138/120817439-195fbb00-c528-11eb-9731-f289a8c398b7.png)

3 - Unpack the module

![image](https://user-images.githubusercontent.com/13484138/120817669-48762c80-c528-11eb-8b0e-852f8f43c43d.png)

4 - Enable the module

![image](https://user-images.githubusercontent.com/13484138/120817771-5d52c000-c528-11eb-9e23-a860f97b7541.png)

5 - Restart Botpress again

6 - At the desired bot, call the action "sendDownloadTranscriptButton" anywhere you want in the flow

![image](https://user-images.githubusercontent.com/13484138/120818023-9b4fe400-c528-11eb-8dc0-f8c26505ddb1.png)

7 - Result

![image](https://user-images.githubusercontent.com/13484138/120818341-e8cc5100-c528-11eb-91ce-a3d36f906072.png)

If you want to customize the button appearance, you can use a custom CSS style to modify the class "CustomDownloadTranscriptButton."

https://botpress.com/docs/channels/web#customizing-web-chat-style
