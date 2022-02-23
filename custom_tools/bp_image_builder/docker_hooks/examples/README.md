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
