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

## Translation Services
These hooks are configured to use DeepL, Google Cloud Translate API, or a Huggingface model for translation services. You can use one or a combination of these services, as they each have their own pros and cons:

### Huggingface
**Website:** https://huggingface.co/

**Pros:**
- Models are free to use, no credit card needed
- Models are fast and translate well
- POST request hides & protects your data

**Cons:**
- Free tier is limited to 30,000 chars per month
- Language availbility varies by model
- Additional model needed for language detection

**How to get your API key**
1. Find a model that fits your language needs. The University of Helsinki offers [a wide selection of pre-trained language models](https://huggingface.co/Helsinki-NLP) that are highly performant.
2. If you do not already have them, create a Huggingface [account](https://huggingface.co/join) and [organization](https://huggingface.co/organizations/new)
3. On the model's page, click on the drop-down for 'Deploy' and click on 'Accelerated Inference'

<img width="578" alt="image" src="https://user-images.githubusercontent.com/77560236/174850894-36ef20c7-3ce2-45b6-8aff-8655f75f154c.png">

4. Copy the endpoint and credentials to your `bot.config.json` file. The API_URL should be put under `endpoint`. Check the box to show the API key anc copy this to `token`.

<img width="877" alt="image" src="https://user-images.githubusercontent.com/77560236/174851199-2bc47540-b3db-413e-b93a-a932c54e4f08.png">

<img width="722" alt="image" src="https://user-images.githubusercontent.com/77560236/174851790-a56a9826-d5b7-4531-b488-b233cedf32d5.png">

### DeepL
**Website:** https://www.deepl.com/translator

**Pros:**
- Free tier allows up to 500,000 chars/month
- Translations are fast and accurate
- Auto language detection

**Cons:**
- Credit card required even for free tier
- GET request makes your data public
- DeepL only supports about 30 languages 

**How to get your API key**
1. If you do not already have an account, [create a DeepL account here]((https://www.deepl.com/pro-checkout/account)
2. Enter valid credit card details
3. Once you have your account, go to [your account summary](https://www.deepl.com/account/summary) and scroll down to find your API key.
4. Copy this API key as the value for `token` in your bot's `bot.config.json` file. The endpoint for DeepL free API will **always be** `https://api-free.deepl.com/v2/translate`

<img width="442" alt="image" src="https://user-images.githubusercontent.com/77560236/174853147-4a2dcf32-f518-400b-93bc-94d3fbb2aea6.png">



## How to use
1. Create your bot in a single language
2. Add the file `translate-user-messages.js` as a `before_incoming_middleware` hook
3. Add the file `translate-bot-messages.js` as a `before_outgoing_middleware` hook
4. Register with your preferred machine translation service:
5. Add your translation service endpoint and API token to your bot's `bot.config.json` file. Follow the instructions for your preferred translation API above.


## Guidelines (Remove before posting)
1. Ensure a non-technical reader can get a basic understanding of the tool / module / solution from reading this file
2. Installation instructions should be easy to follow
3. Please add as many screenshots as posssible! 1 picture == 1000 words
4. Run **all** writeups through [grammarly](https://demo.grammarly.com/)
