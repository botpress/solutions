## Redirect user during conversation if URL has a parameter

To do that, you will need to inject a variable inside the bot; a simple way to do that is to have a custom event sent when the Webchat is loaded.

Let's say we have a bot called 'test':

1 - firstly, in your embedded web chat, you will need an event listener for the webchatReady event.

![image](https://user-images.githubusercontent.com/13484138/184942042-5f8b6a2b-69d5-4adb-9c47-0939d4b7adfc.png)

You can, with this code, see that the event is being triggered when you open the webchat.

![image](https://user-images.githubusercontent.com/13484138/184942198-c2468178-d58e-47b7-bb8e-2bb9608a1fc7.png)

The code for the initial implementation above is available as 'inject_variable_template_v1.html' in this folder.

2 - Now, we need to send a custom event inside our event handler; the snipped below allows you to do that.

````javascript
window.botpressWebChat.sendEvent({            
  type: "custom-inject-variable",            
  channel: "web",            
  payload: { variableName: "variableValue" },          
});
````

After adding that to our inject_variable_template.html, we will have the result below:

![image](https://user-images.githubusercontent.com/13484138/184942542-7c7e60ca-2afb-4baa-88a1-160dff1d2a16.png)


3 - Now, we need to catch that event in our Botpress backend, to do that, we just need to add a before_incoming_middleware hook; for that, add the 'inject_variable_from_webchat.js' file from this folder as a before_incoming_middleware in your instance.

![image](https://user-images.githubusercontent.com/13484138/184942717-8313860e-1026-4921-93dd-7cd6efae1be5.png)


With the code that we have until this point, we can have a condition to have a custom transition when the "variableName" temporary variable is set in the bot.

![image](https://user-images.githubusercontent.com/13484138/184942782-6170f515-65fd-49bc-b40c-d978b5ed7270.png)


If we test our bot using the current inject_variable_template.html we will see that it's working correctly.

![image](https://user-images.githubusercontent.com/13484138/184942843-98e0fdf0-d448-493f-87b4-19fea50bee23.png)

4 - The last thing to do, is to understand how we can get a parameter from the URL and put it inside the payload that is sent to Botpress.

If we do a quick search on google, we can find this solution: 

https://stackoverflow.com/questions/979975/get-the-values-from-the-get-parameters-javascript

Here is the snipped extracted from the solution:


````javascript
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

//var query = getQueryParams(document.location.search);
//alert(JSON.stringify({query}));
````

If we put that into our .HTML and log, you can see that its possible to log any parameters specified in the URL:

![image](https://user-images.githubusercontent.com/13484138/184942960-1b808d76-bf55-4e1d-90ef-41c7b4afd4ea.png)


In this example, we are setting myparam.

![image](https://user-images.githubusercontent.com/13484138/184943104-adbaf45d-4c70-45cb-9c1c-c7dfdcf349ab.png)


Now, to complete the solution, we just need to send the "query" object as a payload in our custom event.

![image](https://user-images.githubusercontent.com/13484138/184943241-57a23dd8-3986-4c5c-b5fd-7818301d86f5.png)

With all the steps above, we now have inject_variable_template_final.html and inject_variable_from_webchat.js (hook) in this folder.

If we take the same bot from before and talk with it using variableName=variableName in the URL, we are going to be redirected correctly:

![image](https://user-images.githubusercontent.com/13484138/184943347-dc41f075-d3fa-4009-b8b7-c2376761a67f.png)
 
If we don't specify anything, the "otherwise" route will be taken.

![image](https://user-images.githubusercontent.com/13484138/184943421-112c0b20-7c60-4d23-97e2-e4415837847b.png)

