## Setup

1. Add the module on the server
2. Restart the server

#### Demo bot (bot_demo.tgz) available in this repo folder

## Usage

### New Skills

1. ForEach

- Able to iterate on arrays or objects

2. Create Array

- Create an array on temp/user/session memory

3. AddToArray

- Add and item on array at temp/user/session memory

4. RawReply

- Useful to do stuff like rendering a dynamic single choice

### New Actions

1. Operation

- Allow usage of alot of lodash utils functions to allow operation with two variables - https://lodash.com/docs/4.17.15

2. Set Value Variable

- Includes functionality over the existing setVariable, allow usage of nested properties (variable1.property1) and assign real values to these variables instead of strings, use ${scope.variableName} to direct assign the value instead of the mustache template result (the old {{scope.variableName}})
