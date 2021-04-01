### What it does

Provides Google Sheets Api access within Botpress

### How to use

Set up a Service Account

https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication

Configure the email and private key in the module configuration

Now you can access the object from bp.kvs namespace

const doc = await bp.kvs.googleSpreadSheet.getGoogleSheet('DOCUMENT_ID_FROM_URL') // https://docs.google.com/spreadsheets/d/DOCUMENT_ID_FROM_URL/edit#gid=0

OBS: You need to share the google sheet document with the email generated for the Service Account

DOCS: https://theoephraim.github.io/node-google-spreadsheet/#/?id=the-basics
