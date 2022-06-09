# Timely Greeting

Original author: @Gordon-BP

Last updated by @Gordon on 28 April 2022

## Overview
This action uses the current time and the user's browser timezone to deliver a proper greeting based on the time of day.

## Use cases:
A bot that can say "Good morning" in the morning and "Good evening" at night is more conversational, and these dynamic greetings encourage users to return to the bot at different times to see what it says.

## How to use
1. Copy & paste the contents of `Timely-Greeting.js` into a new action in your bot.
2. Add your desired greetings as parameters:

<img width="654" alt="image" src="https://user-images.githubusercontent.com/77560236/161613469-eff17516-518f-40f2-9daa-6f5d1c9fe161.png">

- **Free text** like "good morning" will be passed directly to the user as written. Markdown and variables will **not** be rendered.
- **Content element IDs** like `builtin_text-wofnSd` will have the bot render the specified content element, be it text, image, card, etc. Markdown and variables **will be rendered** if they are in the content element.
- **Blank parameters** will have the default values "Good morning," "Good afternoon," and "Good evening."

### Extra configurations

Change the default greetings on line 21. These will be sent if the parameters are blank.

<img width="605" alt="image" src="https://user-images.githubusercontent.com/77560236/172892830-e59cfc23-3ace-4c1b-89ac-aba190b30762.png">

If the timezone can't be fetched from the user's browser, the fallback greeting on line 23 will be sent instead.

<img width="396" alt="image" src="https://user-images.githubusercontent.com/77560236/172893256-0478c22e-fa80-4056-9428-19c401c91f83.png">

The exact time ranges for morning, afternoon, and evening can be configured in lines 26 - 28. The numbers represent hours in 24-hour time.

<img width="423" alt="image" src="https://user-images.githubusercontent.com/77560236/172892583-866a21f8-5a56-4f60-810d-abf2aae90bbd.png">

This action should work alright for multilingual bots, but you may need to add some additional logic around line 69 if you have multilingual variations for a content element.

<img width="699" alt="image" src="https://user-images.githubusercontent.com/77560236/172893558-9304077a-004d-4e34-ae4b-9f961a5879e8.png">
