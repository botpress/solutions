# Date Picker

Original author: @allardy
Last updated by @allardy 29 March 2022

## Overview
Creates a skill that displays as calendar users can select a single date or date range depending on the skill settings.

## Use cases:
Chat users are scheduling appointments via the bot.

## How to use
Out of the box, it works for the webchat without additional configuration, but an extra step is needed to make it work on Messenger, included below.

1. Add the module to the server
2. Enable the module
3. On the studio, you will see the skill "Date Picker."
4. Once the user selects a date, the bot will store the values in `temp.startDate` and `temp.endDate.`

### Setup for Messenger

1. Make sure the Messenger channel is configured correctly for your bot
2. In the code editor, right-click on `date-picker.json` and duplicate to the current bot
3. Set 'enabled' to true
4. You must add the server's URL must be added in the Facebook page whitelist before use. You can do this manually or set `addToWhitelist` to true to handle this automatically

### Customizing the styling

1. On the code editor, click on Advanced editor
2. Create a new file named `bots/YOUR_BOT_ID/actions/date-picker.css`
3. Add your custom styling, then save the file
4. The next time you open the code editor, you can edit the file from the actions panel directly

### Additional configuration

Since the DatePicker has several properties that can be configured (for example, the first day of the week), you can configure a JSON string to handle this behavior.

All parameters are here: https://blueprintjs.com/docs/#datetime/datepicker

For example, to set Tuesday as the first day of the week, provide:

```js
{
  "dayPickerProps": {
    "firstDayOfWeek": 2
  }
}
```
