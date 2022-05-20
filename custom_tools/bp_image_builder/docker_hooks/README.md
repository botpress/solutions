# Docker Hooks

Docker hooks allow you to execute code (.sh script) during the docker image build pipeline

1 - Create a folder called docker_hooks in the same folder as the bp_image_builder binary

![image](https://user-images.githubusercontent.com/13484138/155405333-813926b2-6be2-48b8-8ae6-611abd7c47fb.png)

2 - Inside, create a .sh file with the name of the hook.

![image](https://user-images.githubusercontent.com/13484138/155405493-e9bae164-f831-4a47-9de0-8e0af0f08792.png)

Check below the list of available hooks.

|Hook name|Example|Description|
|---|---|---|
|after_build|[Download trained models](https://github.com/botpress/solutions/tree/master/custom_tools/bp_image_builder/docker_hooks/examples/Download%20train%20data%20from%20origin)|Runs after everything has been executed in the docker build pipeline|

## Environment variables

These hooks will have access to the following environment variables

|Name|Description|Example|
|---|---|---|
|BUILD_TOKEN|Baerer token used to authenticate in the origin server|eyJhbGciOiJIUzI1N...|
|BUILD_ORIGIN_HOST|URL for the origin server specified as argument at the login and build command |http://localhost:3000|
|BUILD_ORIGIN_IP|IP for the origin server resolved in the machine where the build command ran|192.168.150.128|
|BUILD_ORIGIN_PORT|PORT for the origin server resolved in the machine where the build command ran|3000|

## Tips

-  During the execution of the build command, use a origin URL reacheable in the docker context (use the IP if you are using localhost) to be able to make HTTP requests using wget from your hooks
