# Number Picker Module

Original author: @allardy

## Overview
This module allows users to select a number from a specified range. It will validate the entry by the user is accurate and allows for options for invalid entries or if the user wishes to abort. 

## Use cases:
This module can be beneficial if you need to make flow decisions based on the user selecting a number within a specific range. 

## How to use

1. Upload and turn on Module
2. Go to flow where you wish to add Number Picker Skill
3. Select skill<br> ![image](https://user-images.githubusercontent.com/104075132/201734333-f0abf38b-4bc0-4f7a-863e-96da5c363a47.png)<br>
4. Select the proper configuration for the number picker skill

Here is an overview of the options available to you in the **BASIC** portion of this skill<br>![image](https://user-images.githubusercontent.com/104075132/201736462-dcbbd1c5-41a8-414d-87af-4b94201b4a62.png)<br>

* **Question to ask is** - the prompt you want users to see when they come to the node
* **On invalid answer, say this** - what you want the bot to show to the user if they enter an invalid number or entry
* **Name of the temp variable to store the number** - this allows you to set the variable name for the number selected. If you leave it at the default of extractedNumber, you can access this number by temp.extractedNumber
* **Minimum value** - lowest number user can select
* **Maximum value** - highest number user can select
* **Suggest button to abort prompt** - shows an abort button to users in chat
* **Senda number picker component** - renders number picker component in chat<br>![image](https://user-images.githubusercontent.com/104075132/201737914-fbdf0eb6-77f7-4e70-82c9-f52522591076.png)<br>

Here is an overview of the options available to you in the **ADVANCED** portion of this skill<br>![image](https://user-images.githubusercontent.com/104075132/201738201-e8c4aada-bf56-4800-b30d-84220053c269.png)<br>

* **Round the extracted value** - round decimals to whole numbers
* **Suggest button to abort prompt** - shows an abort button to users in chat
* **Max number of retries** - set how many times the user can try entering a number. Our recommendation is 1. 
 
