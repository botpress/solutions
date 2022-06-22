# Advanced Dynamic Choice

Original author: @laurentlp

Last updated by @Gordon-BP on 8 June 2022

## Overview
This example shows how to create and render a dynamic choice skill and outlines additional configurable options.

<img width="689" alt="image" src="https://user-images.githubusercontent.com/77560236/172688485-8cc6fb2c-a423-4030-88db-09278a518d10.png">

## Use cases:
This advanced example will help if the choice skill needs to do more complex actions like:
* Accept input from both buttons or free text
* Validate user free text input with the available choices
* Fuzzy match user input with a known list of synonyms
* Store the user's choice in flow memory

## How to use
1. Add both `advanced-dynamic-choice.js` and `process-dynamic-option.js` as actions in your bot.
2. Create a new node and add the `advanced dynamic choice` action in the OnEnter tab, and set the parameters as desired:

<img width="670" alt="image" src="https://user-images.githubusercontent.com/77560236/172689677-33714484-29c3-4096-a928-95d0b1a26805.png">


  **quantity**:
    How many buttons you want to show

  **variableName**:
    What to name the field in flow memory that contains the value of the user-selected choice

### Important notes:
* This action **must** be the last thing in the `onEnter` tab. If any other elements or actions come after it, the choices will not render.
* It's critically important to **wait for user input** after sending this action. If the `process dynamic option` action is in the `onReceive` tab, the node will wait for user input; otherwise you **must check the box to wait for user input**!


 3. In the OnReceive tab, add the `process dynamic option` action. For the `variableName` parameter, make sure it is the same as the one entered in the previous action.

<img width="670" alt="image" src="https://user-images.githubusercontent.com/77560236/172689933-fa691507-0dab-4e97-8ce0-19a4aff3a65c.png">

4. Add your transitions:

<img width="469" alt="image" src="https://user-images.githubusercontent.com/77560236/172690023-063111e4-9ff7-4351-b1b3-17dae069d1ea.png">

### Transition examples:
  **event.nlu.intent.name**:
    If you want this dynamic menu to evalutate free text input for intents, listen for your intents first in the transtition pipeine.
    
  **temp.choice.variableName.value**:
    Replace `variableName` with the name used in the previous steps. If value is set, that means that the user selected a valid choice by either clicking the button or typing in the value or synonym. To transition based on the specific value chosen, change the expression to be `temp.choice.variableName.value === yourValue`
    
  **temp.choice.invalid**:
    This will be `True` if the user's free text input doesn't match up with any of the choices or synonyms.
  
  **otherwise**:
    If there's an error in either of the two previous actions, this transition will be triggered.

### Extra Configurations:

  **Disable Free Text**:
    Change line 49 to `True`.
    
  <img width="267" alt="image" src="https://user-images.githubusercontent.com/77560236/172709431-16582c33-e9ce-40bf-b651-6bdfcea84eb3.png">

  **Change the prompt**:
    Change line 46 to your desired prompt.
    
  <img width="268" alt="image" src="https://user-images.githubusercontent.com/77560236/172709587-2a5f599d-4e26-4a53-a717-e6ab2c579201.png">
  
  
  **Change btton labels**:
   Modify the value in the `title` field on line 38.
  
  <img width="723" alt="image" src="https://user-images.githubusercontent.com/77560236/172710862-38fd1532-adce-4163-930f-d313049d12a2.png">


