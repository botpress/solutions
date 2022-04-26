This is a temporary solution until it is better implemented by Messaging. Since it relies on internal methods, it may break in the future.

## How to use

1. Configure the messenger channel
2. Add the action in a node

Once the action is processed, the user's info (full name, timezone, language) will be stored in the user's attributes, and will be available under `event.state.user`.
There is no way to get the user's e-mail address
