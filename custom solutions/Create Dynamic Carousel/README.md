# Dynamically Generate Carousel

Original author: @yallard

Last updated by @Gordon-BP on 8 June 2022

## Overview
This action fetches random numbers and strings from an API and renders them into cards that are put into a carousel. This code is meant to serve as an example of how developers can turn arrays of data into carousels within Botpress.

## Use cases:
Displaying data arrays as carousels is a useful tool that can be used for things like:
* Show available rooms at a hotel
* Show documents owned by a user
* Display different products that a user has access to

## How to use
1. Copy the code from `send-carousel.js` into a new action on your bot.
2. Create a new node and add this action to it.
3. For quantity, enter the number of cards you would like the carousel to render.

<img width="686" alt="image" src="https://user-images.githubusercontent.com/77560236/172664640-d5cd6153-d157-4fb4-98c5-3212c494f48f.png">

3. Run the flow and browse through your carousel!

<img width="288" alt="image" src="https://user-images.githubusercontent.com/77560236/172664775-63419182-d3ab-42eb-bb6c-2a81a2971ab7.png">

### Card / Carousel Properties

**Card parameters:** This function only takes a card title and button title as parameters, but if you want to make the image, subtitle, or button type configurable, you can add the parameters in line 11 and then add in your variables later in the function.

<img width="345" alt="image" src="https://user-images.githubusercontent.com/77560236/172665160-8a3fa3ab-2fd5-4b06-8be7-e472d9353719.png">


**Button types:** This function uses a URL button, but say and postback buttons are also acceptable. See the SDK for informaiton on [bp.experimental.render.buttonSay](https://botpress.com/reference/modules/_botpress_sdk_.experimental.render.html#buttonsay) and [bp.experimental.render.buttonPostback](https://botpress.com/reference/modules/_botpress_sdk_.experimental.render.html#buttonpostback)
