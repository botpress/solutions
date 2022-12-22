# Validate Email Module
Original Author: bassamtantawi-botpress

## Overview
Allows access to a new skill to prompt for, receive and validate email address(es). 

## How to use

1. Upload Module
2. Go to flow Editor
3. Select Skill<br>
![image](https://user-images.githubusercontent.com/104075132/209175855-f69c74ca-c5fa-41c3-bd59-0fab58ed05bf.png)
4. Add in the pertinent information for the skill and click insert
![image](https://user-images.githubusercontent.com/104075132/209175500-25c11650-b479-449e-8dc8-a2bac3366e09.png)
5. Set transitions for success (valid email entered) and failure (invalid email entered)

### Quick start option
1. Copy the folder `validate-email` to `modules/validate-email`
2. Open a terminal in the folder `modules/validate-email` and type `yarn && yarn build`
3. Edit your `botpress.config.json` and add the module location, like below:

```js
"modules": [
  ...
  {
    "location": "MODULES_ROOT/validate-email",
    "enabled": true
  }
]
```
4. Start Botpress: `yarn start`
5. Choose any bots in your workspace, then you should see the module in the sidebar 
