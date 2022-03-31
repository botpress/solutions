## Overview

This is a simple module that shows a form to a user on the webchat

## Quick Start

1. Add this module on your server
2. Open the code editor
3. Under `Examples`, expand `form-module`, then `actions`, and open `display-form.js`
4. Copy the content of the file
5. Create a new action, then paste the content in that new file
6. Adjust the fields & the schema as required, then add the action on your flow

## Processing responses

1. Add a `after_incoming_middleware` hook
2. Catch event of type `form-data`

```js
if (event.type === 'form-data' && event.payload.data) {
  const { firstName, lastName, businessEmail, phoneNumber } = event.payload.data
  // do something
}
```
