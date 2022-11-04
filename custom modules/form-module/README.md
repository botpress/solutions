# Form Module
Original author:

## Overview

This custom module allows a form to be displayed to a user in a webchat. A template action is provided that can be used to build different forms. 

## Use Cases
If you need to provide access to a form as part of your flows within your chatbot. 

## How to use 
1. Upload Module
2. Open the code editor
3. In actions in the **Examples** folder there will be a sub folder called **form-module with** a sub-folder called **actions** it will contain **display-form.js**
![image](https://user-images.githubusercontent.com/104075132/200040310-ca6f52da-611b-4c40-a60e-d06228a59198.png)
4. Copy the content of the action 
5. Create a new action and paste content from the display-form.js file
6. Adjust schema as required
7. Add action to appropriate node in flow
8. Add a **after_incoming_middleware** hook that catches event of type **form-data** and use that hook to dictate what happens with the form data. 

```js
if (event.type === "form-data" && event.payload.data) {
  const { firstName, lastName, businessEmail, phoneNumber } = event.payload.data;
  // do something
}
```
