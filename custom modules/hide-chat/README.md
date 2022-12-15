#  Hide Chat Module
Original author: @davidvitora

## Overview
This custom module allows you to hide/unhide the channel-web chat composer, where users can type their reply. 

## Use cases
You want remove ability of chat users to type in answers and only select from buttons, dropdowns or predefined responses. 


### How to use
1. Upload module
2. Add **hide-chat** action to node(s) within flow
3. Assign **true** to action value if you want to hide the chat composer<br><br>
![image](https://user-images.githubusercontent.com/104075132/200072449-94bcbf1c-14d5-48b0-8bd8-d3ccf64ef32b.png)
<br><br>
![image](https://user-images.githubusercontent.com/104075132/200072346-5a548716-971f-479e-9bb1-85d4ccd25e57.png)
<br><br>
4. Assign **false** value to action if you want to unhide the chat composer if it has previously been hidden. 
<br><br>
![image](https://user-images.githubusercontent.com/104075132/200072507-a9dd2cf1-1a65-4552-bcc6-768e507456f3.png)
<br><br>
![image](https://user-images.githubusercontent.com/104075132/200072387-cf34f9c7-431f-42f6-8021-ff7aa44a63fb.png)



# - Releases

## 3.0 

Changes: use isLastGroup instead of isLastOfGroup to decide if component should hide or show composer, removing a race condition

## 3.0.3

Changes: use both isLastOfGroup and isLastGroup to prevent edge cases

