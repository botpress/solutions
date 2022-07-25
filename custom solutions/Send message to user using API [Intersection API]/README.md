# Send message to user using API [Intersection API]

Original author: @davidvitora

Last updated by @davidvitora on Jul 25 2022

## Overview

Use this solution to send a message to the user using backend API calls

## How to Install

Simply create a after_server_start hook with the code included in this solution (createIntersectionAPI.js) and restart your server

## How to use it

Make a POST API call to the route provided by the hook

You will need:

- user id
- conversation id
- authorization token
- Botpress server address


Example using [axios](https://www.npmjs.com/package/axios) : 

````javascript

    var axios = require('axios');
    var botpressServerHost = 'http://localhost:3000' // Your Botpress server host
    var authorizationToken = 'My login token' // Since this is an Authenticated route, you will first need to call the Botpress login route and get a token
    var data = JSON.stringify({
        "type": "text",
        "payload": {
            "text": "Hello",
            "type": "text"
        },
        "botId": "myBot",
        "target": "d240eda9-8317-4511-9a62-3e9da61f4eb8", // userId -> This will be available in your event
        "threadId": "d5578b70-d28e-4cf1-8738-649fdc08758f", // conversationId ->  This will be available in your event
        "channel": "web"
    });

    var config = {
        method: 'post',
        url: botpressServerHost + '/api/v1/bots/___/mod/intersection/',
        headers: { 
            'Authorization': 'Bearer ' + authorizationToken, 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

````
