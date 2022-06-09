# Record Final Node

Original author: @Gordon-BP 

Last updated by @davidvitora-BP on 11 April 2022

## Overview
With this hook, developers can track where users are dropout and end the conversation by recording the name of the last node to a new table in the database.

## Use cases:
Dropout is a great thing to measure to get insights into user behaviors like:
* Task completion
* Menu navigation
* User responsiveness

### This hook creates a new table called "last_nodes" in the database!
Because a new table is added, additional considerations will be needed when migrating and updating your database. Additionally, if you use an external tool to digest Botpress data, ensure you add this table to the list of tables to watch.

### Table info:

**Schema:**

![image](https://user-images.githubusercontent.com/77560236/149194794-9b45bf70-cd12-4dda-a04c-ff50727014b7.png)

**Sample Data:**

![image](https://user-images.githubusercontent.com/77560236/149194735-11b3305d-62bb-448f-b93a-5b91e6f94a73.png)


## How to use
1. Copy/paste `record-final-node.js` as a `Before_Session_Timeout` hook
2. Copy/past `createDropoutTable.js` as an `After_Server_start` hook
3. Restart your Botpress server for changes to take effect
