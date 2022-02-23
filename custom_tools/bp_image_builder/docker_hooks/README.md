# Docker Hooks

Docker hooks allow you to execute code (.sh script) during the docker image build pipeline

1 - Create a folder called docker_hooks in the same folder as the bp_image_builder binary

![image](https://user-images.githubusercontent.com/13484138/155405333-813926b2-6be2-48b8-8ae6-611abd7c47fb.png)

2 - Inside, create a .sh file with the name of the hook.

![image](https://user-images.githubusercontent.com/13484138/155405493-e9bae164-f831-4a47-9de0-8e0af0f08792.png)

Check below the list of available hooks.

|Hook name|Example|Description|
|---|---|---|
|after_build|Link|Runs after everything has been executed in the docker build pipeline|

## Environment variables

These hooks will have access to the following environment variables

|Name|Description|Example|
|---|---|---|
|BUILD_TOKEN|Baerer token used to authenticate in the origin server|eyJhbGciOiJIUzI1N...|
|BUILD_ORIGIN_HOST|URL for the origin server specified as argument at the login and build command |http://192.168.150.128:3000|

## Tips

-  During the execution of the build command, use a origin URL reacheable in the docker context (Not localhost) to be able to make HTTP requests using wget from your hooks
