# Translate on the fly

Original author: @Gordon-BP

Last updated by @Gordon-BP on 21 June 2022

## Overview
These two hooks enable a multilingual bot by translating user and bot messages on the fly using a translation SaaS  or a huggingface translation model. The on the fly translation empowers developers to build a bot in a single language but enables the bot to speak other languages without providing translations or training another NLU model. A bot with these hooks will work as follows:

For a bot trained in English:
1. User says to bot "Bonjour, comment allez-vous?"
2. The "translate-user-message.js" hook translates the user message to "Hello, how are you?"
3. The bot's middleware processes "Hello, how are you?" and matches it to the "greetings" intent.
4. The dialog manager elects the response, "I'm well, thank you."
5. The "translate-bot-message.js" hook changes the response to "Je vais bien, merci."
6. Bot says to user "Je vais bien, merci."

### These conversations are all with the same bot!

<img width="281" alt="image" src="https://user-images.githubusercontent.com/77560236/174856896-c8b1d6a5-195a-4d7e-b96c-a5b8554f0dc4.png"> <img width="283" alt="image" src="https://user-images.githubusercontent.com/77560236/174856663-7e27bd25-218c-44a9-89f8-4ef35f38826b.png"> <img width="279" alt="image" src="https://user-images.githubusercontent.com/77560236/174856728-17873695-c958-421d-a52f-bacc377a5c78.png">

**Bot flow:**

<img width="785" alt="image" src="https://user-images.githubusercontent.com/77560236/174856234-1d96b2b9-7c29-433b-82e3-09b3c2edb8b9.png">


## Use cases:
There are many advantages to using these hooks over developing a multilingual bot the traditional way:
* Bot content is easier to manage in one language
* Botpress NLU models will only need to be trained for one language
* Add new languages just by changing a variable- no translations needed!

However, it's important to consider the drawbacks:
* Translations services, especially in bulk, are not free
* Additional API calls can slow down your bot's reply times

## Translation Services
These hooks are configured to use DeepL, Google Cloud Translate API, or a Huggingface model for translation services. You can use one or a combination of these services, as they each have their pros and cons:

### Huggingface
**Website:** https://huggingface.co/

**Pros:**
- Models are free to use, no credit card needed
- Models are fast and translate well
- POST request hides & protects your data

**Cons:**
- Free tier is limited to 30,000 chars per month
- Language availability varies by model
- Additional model needed for language detection

**How to get your API key**
1. Find a model that fits your language needs. The University of Helsinki offers [a wide selection of pre-trained language models](https://huggingface.co/Helsinki-NLP) that are highly performant.
2. If you do not already have them, create a Huggingface [account](https://huggingface.co/join) and [organization](https://huggingface.co/organizations/new)
3. On the model's page, click on the drop-down for 'Deploy' and click on 'Accelerated Inference'

<img width="578" alt="image" src="https://user-images.githubusercontent.com/77560236/174850894-36ef20c7-3ce2-45b6-8aff-8655f75f154c.png">

4. Copy the endpoint and credentials to your `bot.config.json` file. The API_URL should be put under `endpoint`. Check the box to show the API key and copy this to `token`.

<img width="877" alt="image" src="https://user-images.githubusercontent.com/77560236/174851199-2bc47540-b3db-413e-b93a-a932c54e4f08.png">

<img width="722" alt="image" src="https://user-images.githubusercontent.com/77560236/174851790-a56a9826-d5b7-4531-b488-b233cedf32d5.png">

### DeepL API
**Website:** https://www.deepl.com/translator

**Pros:**
- Free tier allows up to 500,000 chars per month
- Translations are fast and accurate
- Auto language detection

**Cons:**
- Credit card required even for free tier
- GET request makes your data public
- DeepL only supports about 30 languages 

**How to get your API key**
1. If you do not already have an account, [create a DeepL account here](https://www.deepl.com/pro-checkout/account)
2. Enter valid credit card details
3. Once you have your account, go to [your account summary](https://www.deepl.com/account/summary) and scroll down to find your API key.
4. Copy this API key as the value for `token` in your bot's `bot.config.json` file. The endpoint for DeepL free API will **always be** `https://api-free.deepl.com/v2/translate`

<img width="442" alt="image" src="https://user-images.githubusercontent.com/77560236/174853147-4a2dcf32-f518-400b-93bc-94d3fbb2aea6.png">

### Google Cloud Translate API
**Website:** https://cloud.google.com/translate

**Pros:**
- $300 credit when you register a new account
- Auto-detects languages
- Largest language availability

**Cons:**
- Credit card required
- No free tier

**How to get your API key**
1. If you have not already created a Google cloud account, create one and [go to your console](https://console.cloud.google.com/translation/dashboard)
2. Under APIs and services, find Cloud Translation API [or click here](https://console.cloud.google.com/apis/api/translate.googleapis.com/overview) and enable the API.
3. On the credentials tab, click "Create Credentials" and select "API Key"

<img width="1415" alt="image" src="https://user-images.githubusercontent.com/77560236/174854252-ad9b068a-ff6d-42a9-b792-ddb35ccb61ff.png">


4. Copy this API key as the value for `token` in your bot's `bot.config.json` file. The endpoint for Cloud Translation API will **always be** `https://translation.googleapis.com/language/translate/v2`

<img width="584" alt="image" src="https://user-images.githubusercontent.com/77560236/174854562-9e1aab0c-f04a-413d-ac15-27fae8ce7379.png">

## How to use
1. Create your bot in a single language
2. Add the file `translate-user-messages.js` as a `before_incoming_middleware` hook
3. Add the file `translate-bot-messages.js` as a `before_outgoing_middleware` hook
4. Register with your preferred machine translation service:
5. Add your translation service endpoint and API token to your bot's `bot.config.json` file. Follow the instructions for your preferred translation API above and use the provided `bot.config.json` as an example.
6. Change the code to call your preferred translation service:
* In `translate-user-messages.js`, change lines 121 and 132

<img width="738" alt="image" src="https://user-images.githubusercontent.com/77560236/174854935-20413498-44cd-456e-bd1e-3ea8f9c0674a.png">


<img width="727" alt="image" src="https://user-images.githubusercontent.com/77560236/174854969-4007cfe3-475e-411a-86c8-d59ac4487dd9.png">

* In `translate-bot-messages.js` change lines 116 and 150

<img width="724" alt="image" src="https://user-images.githubusercontent.com/77560236/174855134-87cf093a-ee89-422f-a5f4-05c730bb6964.png">


<img width="670" alt="image" src="https://user-images.githubusercontent.com/77560236/174855174-ee063cee-f2b9-4da5-a962-ea5ca461f98f.png">

For example, if you want to use huggingface instead of google, change `getConfig('google')` to `getConfig('huggingface_fr_en')` and `await translateGoogle(...)` to `await translateHuggingface(...)`

7. Test your bot by sending it messages in different languages! DeepL and Google translate will auto-detect the language and respond in the same language as the user's message; Huggingface models vary by model.
