# Google Spreadsheet Module
Original author: @davidvitora

## Overview
Allows you to integrate your bot to send data to a googlesheet. 

## Use cases
Allows you to write to a google sheet. 

Provides Google Sheets Api access within Botpress

## How to use
1. Upload Module
2. [Set up Service Account for Google Sheets](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication)
3. Go to Code Editor **Module Configurations**->**google-spreadsheet.json** 
4. below schema add clientEmail and Private key as pictured below with the correct values and save
![image](https://user-images.githubusercontent.com/104075132/200061739-59616c1a-324d-4777-a0e0-03e918b8e9ab.png)
5. Access the object from the bp.kvs namespace
const doc = await bp.kvs.googleSpreadSheet.getGoogleSheet('DOCUMENT_ID_FROM_URL') // https://docs.google.com/spreadsheets/d/DOCUMENT_ID_FROM_URL/edit#gid=0

**Tip**: Make sure you have shared the google sheet document with the email generated for the Service Account

**Additional Docs**: https://theoephraim.github.io/node-google-spreadsheet/#/?id=the-basics
