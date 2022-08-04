# HITL Next Reject API

This solution shows how you can use the HITL Next reject API.

It allows the API user (Problably a backend app) to reject pending or assigned handoffs

# How to install

You will need to have a Botpress version equal or greater than 12.29.1 working in your setup

# How to use it

You will need:

- pending or assigned handoff id
- authorization token
- Botpress server address

Make an API call to the endpoint HOST/api/v1/bots/BOT_ID/mod/hitlnext/handoffs/HANDOFF_ID/reject

Example using [axios](https://www.npmjs.com/package/axios) : 

````javascript

var axios = require('axios');
var botId = 'small-talk-bot' //Example
var handoffId = 12 //Example
var botpressServerHost = 'http://localhost:3000' // Your Botpress server host
var authorizationToken = 'My login token' // Since this is an Authenticated route, you will first need to call the Botpress login route and get a token

var config = {
  method: 'post',
  url: botpressServerHost + '/api/v1/bots/' + botId + '/mod/hitlnext/handoffs/' + handoffId + '/reject',
  headers: { 
    'Authorization': 'Bearer ' + authorizationToken, 
    'Content-Type': 'application/json'
  },
  data : ''
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


````
