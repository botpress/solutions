## How to use

Out of the box, it works for the web chat without additional configuration, but to make it work on Messenger, there is an additional step below

1. Add the module on the server
2. Enable the module
3. On the studio, you will see the skill "Date Picker"
4. Once the user selected a date, values will be stored in `temp.startDate` and `temp.endDate`

### Setup for Messenger

1. Make sure the Messenger channel is properly configured for your bot
2. Oh the code editor, right click on `date-picker.json` and duplicate to current bot
3. Set 'enabled' to true
4. The server's URL must be added in the facebook page whitelist before it can be used. You can do this manually, or set `addToWhitelist` to true to handle this automatically

### Customizing the styling

1. On the code editor, click on Advanced editor
2. Create a new file named `bots/YOUR_BOT_ID/actions/date-picker.css`
3. Add your custom styling, then save the file
4. The next time you open the code editor, the file can be edited from the actions panel directly

### Additional configuration

Since the DatePicker has several properties that can be configured (for ex: the first day of the week), a JSON string can be configured in the skill to handle this behavior.

All parameters can be found here: https://blueprintjs.com/docs/#datetime/datepicker

For example, to set Tuesday as the first day of the week, provide:

```js
{
  "dayPickerProps": {
    "firstDayOfWeek": 2
  }
}
```
