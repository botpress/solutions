# Increment Variable By N

Original author: @Gordon-BP 

Last updated by @Gordon-BP on 10 June 2022

## Overview
This action increments any variable of a given scope and name by any integer amount.

## Use cases:
Use this action to help add variety to your bot by adding features like:
* New greetings on a user's second, third, or fourth visit
* Different fallback prompts for the second and third time a user gives invalid input
* Additional options served after a user's initial question is answered

## How to use
1. Copy and paste the code from `increment-variable-by-n.js` into a new action in your bot.
2. Add the action into a node with your desired parameters:

<img width="660" alt="image" src="https://user-images.githubusercontent.com/77560236/173084770-fcec0446-a599-4451-9b92-14815eb4be89.png">

**scope**:
  Either bot, user, session, or temp. [See our documentation](https://botpress.com/docs/building-chatbots/memory-&-data-persistence/flow-memory#variables) for more info
  
**name**:
  The name of the variable to increment. For example, the variable `temp.var` has the scope `temp` and the name `var`.
  
**n**:
  The amount to increment the variable. Can be any integer.

### Extra configurations

If the variable doesn't exist, it will be created with a value of zero. You can change this default value by modifying `DEFAULT_VALUE` on line 10.

<img width="272" alt="image" src="https://user-images.githubusercontent.com/77560236/173085509-daf3fbbf-85e1-4456-9a60-9de449ffcf2b.png">
