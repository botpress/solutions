# [HITL-Next] Jump to flow after resolving

Original author: @davidvitora

Last updated by @davidvitora on Jul 11 2022

## Overview

Use this solution if you want your agent using HITL-Next to specify a flow to send the user after the agent resolves the conversation

To specify the flow, during a conversation the agent must type the following command in the chatbox

[cmd]sendTo:FLOW_NAME:NODE_NAME

example: [cmd]sendTo:flow2:entry

If you want to jump to the start node, you can simply use [cmd]sendTo:FLOW_NAME

example: [cmd]sendTo:flow2

## How to make it work

Simply add the two hooks available in this folder
