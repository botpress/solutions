# Translate on the fly

Original author: @Gordon-BP

Last updated by @Gordon-BP on 21 June 2022

## Overview
These two hooks enable a bot to become multilingual by translating user and bot messages on the fly using a translation SaaS like DeepL or a huggingface translation model. The on the fly translation empowers developers to build a bot in a single language (like English) but enable the bot to speak other languages without providing translations or training another NLU model. A bot with these hooks will work as follows:

For a bot trained in English:
1. User says to bot "Bonjour, comment allez-vous?"
2. The "translate-user-message.js" hook translates the user message to "Hello, how are you?"
3. The bot's middleware processes "Hello, how are you?" and matches it to the "greetings" intent.
4. The dialog manager elects the response, "I'm well, thank you."
5. The "translate-bot-message.js" hook changes the response to "Je vais bien, merci."
6. Bot says to user "Je vais bien, merci."

## Use cases:
There are many advantages to using these hooks over developing a multilingual bot the traditional way:
* Bot content is easier to manage in one language
* Botpress NLU models will only need to be trained for one language
* Add new languages just by changing a variable- no translations needed!

However, it's important to consider the drawbacks:
* Translations services, especially in bulk, are not free
* Additional API calls can slow down your bot's reply times

## How to use
1. Create your bot in a single language
2. Add the file `translate-user-messages.js` as a `before_incoming_middleware` hook
3. Add the file `translate-bot-messages.js` as a `before_outgoing_middleware` hook
4. Register with your preferred machine translation service:
5. Add your translation service endpoint and API token to your bot's `bot.config.json` file. Follow the example shown in the `bot.config.json` file in this repo.

## Guidelines (Remove before posting)
1. Ensure a non-technical reader can get a basic understanding of the tool / module / solution from reading this file
2. Installation instructions should be easy to follow
3. Please add as many screenshots as posssible! 1 picture == 1000 words
4. Run **all** writeups through [grammarly](https://demo.grammarly.com/)
