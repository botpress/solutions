# Custom Multiselect

## About
Allows checkboxes to be displayed in a node in the webchat channel so that users can select multiple options. The selections are converted a text string so they are easily accessible via the payload. 

## How to use

1. Downnload .tgz file
2. Go the the module tab
3. Click Upload Module
4. Click Browse
5. Select the file
6. Click Submit
7. At top of page there will be a red notification to restart the server. Click that to restart the server.
8. In the module tab there is a section called Compressed go there and find custom-multiselect
9. Click Unpack Module 
10. Scroll up to stable modules
11. Turn on the Module
12. In bottom right hand corner you will notice red settings icon click that to restart the server
13. Go back to Github and copy the contents of sendComponent.js
14. Back in Botpress go to bot you wish to use this in
15. Create a new action and paste in the contents from sendComponent.js
16. Tweak the question
17. Tweak the options
18. Then go the node where you want the multi select checkboxes to appear and add the select the action

## Tip 
If you want multiple unique multiselects in your chatbot duplicate the first action and rename and edit the duplicate for each individual unique mutli-select. 
