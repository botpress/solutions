# Custom Multiselect

## About
Allows checkboxes to be displayed in a node in the webchat channel so that users can select multiple options. The selections are converted into a text string and are easily accessible via the payload. 

## How to use

1. Download .tgz file
2. Upload custom Module
3. Unpack Custom Module
4. Turn on the Module
5. In the bottom right-hand corner, you will notice red settings icon. Click that to restart the server
6. Go back to Github and copy the contents of sendComponent.js
7. Create a new action in Botpress and paste in the contents from sendComponent.js
8. Tweak the question
9. Tweak the options
10. Then go to the node where you want the multi-select checkboxes to appear and add action 

## Tip 
If you want multiple unique multi-selects in your chatbot, duplicate the first action and rename and edit the duplicate for each unique multi-select. 
