# Custom Docker File

A custom Dockerfile allows you customize the build pipeline even more, to use it:

1 - Copy your Dockerfile to the same folder as the bp_image_builder binary

![image](https://user-images.githubusercontent.com/13484138/155405333-813926b2-6be2-48b8-8ae6-611abd7c47fb.png)

However, using a custom dockerfile removes additional features such as docker_hooks, custom_modules and extra_files, however, its very simple to add that functionality again, check URL for an example.

## Variables

You can access the value for some variables that are available to the dockerfile by using {{VARIABLE_NAME}}, this string will be replaced before the build starts with the desired value. Check the available variables below:

| Name                  | Description                                                                                     | Example                     |
| --------------------- | ----------------------------------------------------------------------------------------------- | --------------------------- |
| {{imageTag}}          | Contains the container tag specified in the build command to be used to produce the final image | botpress/server:v12_26_8    |
| {{BUILD_TOKEN}}       | Baerer token used to authenticate in the origin server                                          | eyJhbGciOiJIUzI1N...        |
| {{BUILD_ORIGIN_HOST}} | URL for the origin server specified as argument at the login and build command                  | http://192.168.150.128:3000 |

For usage, check URL for an example.
