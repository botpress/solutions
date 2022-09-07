# Build Custom web Chat Components

## Overview
This will help you to create a before_container webchat component and compile using the module builder

## Use cases:
Any custom behavior to add to your web chat can be coded using components (Widget or Messsages)


https://botpress.com/docs/messaging-channels/botpress-webchat/website-embedding#creating-a-custom-component
https://botpress.com/docs/messaging-channels/botpress-webchat/website-embedding#injecting-your-components

## Demo

The component from this example will clean messages when the webchat loads




https://user-images.githubusercontent.com/13484138/188961186-8c71ad63-84cb-4b55-a18a-dacd449ff17e.mp4






## How to build the component
1. Download the compacted folder 'custom-web-component-module.zip' and extract it
2. run the following command to compile the module (change PATH_TO_FOLDER)
```
sudo docker run -v 'PATH_TO_FOLDER:/botpress/modules/custom_module' --rm ghcr.io/botpress/botpress/module-builder:0.0.3 sh -c 'cd /botpress/modules/custom_module && yarn && yarn build && yarn package'
```
OBS: For windows, put your whole path as 'PATH_TO_FOLDER', example: 

```
docker run -v 'C:\Users\MyUser\Downloads\Folder:/botpress/modules/custom_module' ........
```

![image](https://user-images.githubusercontent.com/13484138/174085596-2b0b1c74-8f91-4bb9-999a-2380107bac90.png)

4.1. After executing the command, the packaged module (in this case custom-web-component-module.tgz) will appear in the folder from the module
![image](https://user-images.githubusercontent.com/13484138/174085152-4672e159-2b82-419a-b33f-ad72f7a7cf7a.png)

5. The build will be named "YOUR_PACKAGE_NAME.tgz" where YOUR_PACKAGE_NAME is the name of your package (found in package.json and src/backend/index.ts) and be located in the root folder. 
6. Open Botpress and go to the Modules page
7. Click Upload Modules. Select and submit the tgz file.![](1.png)
8. Click "Restart Server Now"![](2.png)
9. In the modules page, click unpack now next to your module's name.![](3.png)
10. Go back up to the list of Stable modules, and activate it by clicking the toggle next to the module's name.![](4.png)

## How to use The component

1. In your HTML page where you embeed Botpress, in the initialization configuration, add the following property.

````javascript

overrides: {
    before_container: [
        {
            module: "custom-web-component-module",
            component: "MyBeforeContainer",
        }
    ]
}

````

Example:
![image](https://user-images.githubusercontent.com/13484138/187283967-5a93dec0-9330-4514-8728-c24071c3f0ea.png)

## How to change the component

1. In the folder, go to the folder src/views/lite and edit the file before_container.jsx
2. You can see that the current implementation of the component will just clean the messages after the conversation loads, change the bahavior as you wish.

![image](https://user-images.githubusercontent.com/13484138/188959015-1bdff2bc-7537-49cc-a86a-a22a4d3a3eb1.png)

3. After doing your changes, you will need to compile and upload your module again.

## TIPS

- In a local instance, if you are using BPFS=disk (default configuration), you can easily update the previously uploaded module by changing the .tgz file at /data/modules
