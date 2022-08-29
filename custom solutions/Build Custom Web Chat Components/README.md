# Build Custom web Chat Components

## Overview
This will help you to create a before_container webchat component and compile using the module builder

## Use cases:
Any custom behavior to add to your web chat can be coded using components (Widget or Messsages)


https://botpress.com/docs/messaging-channels/botpress-webchat/website-embedding#creating-a-custom-component
https://botpress.com/docs/messaging-channels/botpress-webchat/website-embedding#injecting-your-components

## Demo

The component from this example will clean messages after 3 seconds



https://user-images.githubusercontent.com/13484138/187286085-3f5008f4-92e8-4395-9f8b-cdb48f78e769.mp4



## How to build the component
1. Download the compacted folder 'custom-web-component-module.zip' and extract it
2. run the following command to compile the module (change PATH_TO_FOLDER)
```
sudo docker run -v 'PATH_TO_FOLDER:/botpress/modules/custom_module' --rm ghcr.io/botpress/botpress/module-builder:0.0.3 sh -c 'cd /botpress/modules/custom_module && yarn && yarn build && yarn package'
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
2. You can see that the current implementation of the component will just clean the messages after 3 seconds, change the bahavior as you wish.

![image](https://user-images.githubusercontent.com/13484138/187284396-15308b39-1e33-4e38-92fe-4e171ade2f64.png)

3. After doing your changes, you will need to compile and upload your module again.
