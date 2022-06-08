# Create Dynamic Choices (Basic)

Original author: @laurentlp

Last updated by @Gordon-BP on 8 June 2022

## Overview
The easiest way to create a dynamic single-choice is to use a custom action that fetches the data, processes it, and renders the single choice element.

## Use cases:
This action is great for providing simple, dynamic choices to the user, especially in cases like:
* Choosing available dates
* Selecting group within an organization
* Indicating a preferred contact method from the user's account

## How to use
1. Copy the file `basic-dynamic-choice.js` to your bot.
2.  Create a new node and add the action to it. In the `quantity` parameter, specify how many choices you want (maximum of 10)

<img width="904" alt="image" src="https://user-images.githubusercontent.com/77560236/172681269-b1aa4ff5-3774-42c1-833d-bbb600f68634.png">

3. Make sure you tell the bot to wait for a user response after sending the skill!


### Configurations to change:

By default, the action gets random numbers from random.org. You should replace this with your desired method of fetching data.

<img width="812" alt="image" src="https://user-images.githubusercontent.com/77560236/172681550-5789b58e-577f-4178-ba77-ccddfc263e31.png">


To change the message shown before the buttons, modify what's in the `text` field on line 25. **Note:** this field cannot be blank.

<img width="285" alt="image" src="https://user-images.githubusercontent.com/77560236/172681666-7073e626-a43f-4b9a-9e47-fce4512cd4d8.png">


To modify the button labels, change the `title` parameter on line 19 to a different string.

<img width="405" alt="image" src="https://user-images.githubusercontent.com/77560236/172681781-3f8c635e-9117-47e3-9271-3b492afc38c1.png">

## Basic or Advanced?
Use the advanced example if you need the choice skill to...
* Accept input from both buttons or free text
* Validate user free text input with the available choices
* Fuzzy match user input with a known list of synonyms
* Store the user's choice in flow memory
