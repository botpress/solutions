This solution makes it easier to update the webchat's css code directly from within the code editor.

1. Copy the code of the .js file in an "after_server_start" hook
2. In the Code editor, switch to the Advanced editor
3. Create a file named `custom.css` in your bot's action folder: `bots/BOT_ID/actions/custom.css`
4. Add your custom css in that file
5. Right click on the `channel-web.json` config file, then select `Duplicate to current bot`
6. Edit the newly created file and set `"extraStylesheet": "/api/v1/bots/welcome-bot/mod/public/custom.css"`
