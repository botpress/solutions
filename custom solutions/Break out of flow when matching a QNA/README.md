# Break out of flow when matching a QNA

Original author: @davidvitora

Last updated by @allardy on 28 March 2022

## Overview
By default, QnAs are only answered when the user is outside of a flow in Botpress. This hook changes that behavior to make a bot answer a QnA no matter where the user is. The hook also adds options to exempt or restrict this behavior to certain flow or certain skills.

## Use cases:
Use this hook when you want your bot to always answer every QnA during the conversation. This can be especially useful for voice bots or bots that ask the user to do a complex task, for example:

👨: "How do I restart my modem?" // This triggers an intent

🤖: "What is your modem's 8-digit product number?"

👨: "Where do I find the product number?" //This triggers a QnA

🤖: "The product number is usually on a square sticker on the bottom of the modem." // QnA answer pt 1

🤖: "It is 8 digits long and typically starts with the letter M" // QnA answer pt 2

🤖: "What is your modem's 8-digit product number?" // Executes the flow's node again

👨: "M1234567"

## How to use
1. Create a new `before_suggestions_election` hook.
2. Copy/paste the code from the 'break-out-qna-hook.js' file

### extra configs:
**Line 5:** disable for a specific flow or node in a specific flow

Add your flow name and/or node name to disable QnA breakout in this specific flow or node. Works for skills like slot filling and choices as well!

<img width="433" alt="image" src="https://user-images.githubusercontent.com/77560236/172484501-ad146de0-adca-4bbe-911b-0be064933a5d.png">


**Line 40:** force minimum confidence

Raise the minimum confidence for a breakout. Cannot go below 0.5.

<img width="307" alt="image" src="https://user-images.githubusercontent.com/77560236/172484533-f216fc30-c28b-4aca-8f8e-32aa42954077.png">


**Line 50:** repeat the previous node (or not)

If your QnA has a builtin redirect, you should comment out line 50; otherwise, the redirect will be overridden and the previous node will be executed again.

<img width="451" alt="image" src="https://user-images.githubusercontent.com/77560236/172484575-1cd2d661-2b72-45ff-b2f3-13201a31fa87.png">
