### About

This is the hook for custom JWT auth with converse API.

### How it works

Whenever you are hitting the Converse Api endpoint you should put your signed token to the metadata object.
The hook checks if the token is correctly signed with secret and authorizes the request and allows talking to the bot.
Otherwise it redirects to the unauthorized flow which you can configure.

### How to use
1. Add hook to the before_incoming_middleware
2. Create unauthorized flow and change the name of it at the line 59
3. Add your secret to the env. variable or to the file system, fetch it and set at the line 4.
4. Hit the endpoint `/api/v1/bots/<your-bot-id>/converse/<user-id>`
with the following raw body: 
   ```json 
   {
       "type": "text",
       "text": "Google Stock Price",
       "metadata": {
            "token": "your-token"
       }
   }
   ```
