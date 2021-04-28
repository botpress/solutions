### What it does

### How to use

Install and activate the module:

1. First of all, make sure you have downloaded the module sent in attachment.
2. Go to the admin modules tab (https://<Botpress URL>/admin/modules).
3. Click the Upload Module button and select the downloaded module.
4. Once the upload is completed, go to the list of Compressed Modules and unpack the module called 'sf-liveagent'.
5. The module will now be accessible in the Stable Modules list. Simply activate it by click the toggle button.

Configure the module:

1. Go to the code editor.
2. In the Module Configurations section select the file called 'sf-liveagent.json'.
3. Fill in the required info and save the file (requires a server restart afterwards):
  - endpoint          This is the endpoint to the salesforce chat
  - organizationId The chat visitor’s Salesforce organization ID
  - deploymentId  The ID of the deployment from which the chat originated.
  - buttonId           The ID of the button from which the chat originated.
       Note: For more information about these fields see: https://developer.salesforce.com/docs

Use the module in the flows editor:

Open the flow editor. 
  1. Select the skill with no icon:
  ![image](https://user-images.githubusercontent.com/13484138/116441132-8bf1c280-a827-11eb-9bdd-89dbf528770b.png)

  2. Configure the skill like so:
  ![image](https://user-images.githubusercontent.com/13484138/116441244-aa57be00-a827-11eb-8f55-1400feb34229.png)


Once you completed all those steps, you should be able to use SalesForce Live Agent with Botpress.
