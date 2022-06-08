# Custom Multiselect

Original author: @davidvitora

Last updated by @Gordon-BP on 22 May 2022

## Overview
Allows checkboxes to be displayed in a node in the webchat channel so that users can select multiple options. The selections are converted into a text string and are easily accessible via the payload. 

## Use cases:
1. Adds checkbox for selecting multiple choices as opposed to using a choice skill which allows for one of many choices.

## How to use

1. Download the .tgz file
2. Upload the file you downloaded
<img width="1203" alt="Screen Shot 2022-06-03 at 3 08 59 PM" src="https://user-images.githubusercontent.com/87815239/171948531-94876f07-6fc3-43cc-bb2b-e7db9eb7ff94.png">

3. Unpack Custom Module
<img width="1205" alt="Screen Shot 2022-06-03 at 3 12 21 PM" src="https://user-images.githubusercontent.com/87815239/171948659-bedff569-e5c0-427f-8924-7e34211cc3bb.png">

4. Turn on the Module
<img width="1206" alt="Screen Shot 2022-06-03 at 3 12 45 PM" src="https://user-images.githubusercontent.com/87815239/171948710-8afd8a7b-d0c5-4217-925d-047cb388e770.png">

5. Restart the server
<img width="1205" alt="Screen Shot 2022-06-03 at 3 11 26 PM" src="https://user-images.githubusercontent.com/87815239/171948815-26579990-2515-4a5c-94b9-79a52af06091.png">

6. Go back to Github and copy the contents of sendComponent.js
<img width="1264" alt="Screen Shot 2022-06-03 at 4 12 36 PM" src="https://user-images.githubusercontent.com/87815239/171951342-72401103-75e4-4fa3-941f-f72b1e63db01.png">

7. Create a new action in Botpress and paste in the contents from sendComponent.js
![Uploading Screen Shot 2022-06-03 at 4.18.04 PM.png…]()

8. Tweak the question
9. Modify the look & feel of the checkboxes in src/views/lite/components/style.css
10. Then go to the node where you want the multi-select checkboxes to appear and add action 
<img width="1204" alt="Screen Shot 2022-06-03 at 4 18 36 PM" src="https://user-images.githubusercontent.com/87815239/171951705-b9a42a7c-2d7b-44d6-a9f7-5b5026a4d346.png">
<img width="1205" alt="Screen Shot 2022-06-03 at 4 18 50 PM" src="https://user-images.githubusercontent.com/87815239/171951721-4164f125-d163-4029-8dc9-623e071a6dc9.png">

11. Values of what was selected are stored as a comma seperated string in event.payload.text
<img width="1202" alt="Screen Shot 2022-06-03 at 4 19 23 PM" src="https://user-images.githubusercontent.com/87815239/171951750-0691f92a-a588-4485-81b3-c0fa4b4a5d01.png">

## Tip 
If you want multiple unique multi-selects in your chatbot, duplicate the first action and rename and edit the duplicate for each unique multi-select. 
