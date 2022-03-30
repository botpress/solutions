# Record Final Node
**Description**
These hooks create a new table in the database called "last_nodes" that records the session ID, final flow, and final node for all conversations with the bot.

Table Schema

![image](https://user-images.githubusercontent.com/77560236/149194794-9b45bf70-cd12-4dda-a04c-ff50727014b7.png)

Sample table with data

![image](https://user-images.githubusercontent.com/77560236/149194735-11b3305d-62bb-448f-b93a-5b91e6f94a73.png)

**How to install**
1. Copy/paste *record-final-node.js* as a `Before_Session_Timeout` hook
2. Copy/past *createDropoutTable.js* as an `After_Server_start` hook
3. Restart your Botpress server for changes to take effect
