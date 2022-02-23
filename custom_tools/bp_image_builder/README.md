# Botpress Docker Image Builder

### Table of contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Authentication](#authentication)
  - [Building an image](#building-an-image)
    - [Build Flags](#build-flags)
  - [Awesome features](#awesome-features)
  - [Development](#development)

----

Generate a Docker image replica from an existing Botpress server.


## Requirements
- Docker engine running locally or remotely v20.10 or greater
## Installation
Head over to the [releases page](https://github.com/botpress/solutions/releases) and download the BP image builder for your platform:

```sh
chmod +x bp_image_builder-<your platform>
mv bp_image_builder-<your platform> bp_image_builder
```

Execute the program:
```sh
./bp_image_builder
```
You may move the binary to a folder set in your `$PATH` to access the tool from anywhere

_Please note that image building is not currently supported on Windows_

## Authentication

To authenticate with the botpress server you wish to build as an image use the `login` command:

```sh
bp_image_builder login <root botpress url> <email> [password]
```

If the password is omitted it will be requested in a password prompt

The authentication expires after 60 minutes.

## Building an image

To build a Docker image use the `build` command, make sure you have authenticated with the `login` command beforehand:

```sh
bp_image_builder build <root botpress url>
```
Once built, the image will be available on the Docker daemon it was built on.

Alternatively, a `.tgz` archive originating from BP Pull can be specified:
```sh
bp_image_builder build <path to archive.tgz> -it botpress/server:v12_23_0
```
*Note: With this strategy, the Botpress version cannot be detected, if none is specified with the -it flag, the latest release of Botpress will be used*

### Build Flags
| Flag | Shorthand | Default | Description |
|------|-----------|---------|-------------|
| &#x2011;&#x2011;docker&#x2011;socket | -ds | /var/run/docker.sock | Docker socket path to use to communicate with the docker daemon |
| &#x2011;&#x2011;docker&#x2011;url | -durl | null | HTTP url of the docker daemon to use, if the daemon is protected by HTTPS, the docker-certs flag must be specified |
| &#x2011;&#x2011;docker&#x2011;certs | -dc | null | HTTPS certificate directory for connecting to the docker daemon via HTTPS, must contain `ca.pem`, `cert.pem` and `key.pem` |
| &#x2011;&#x2011;token | -t | null | Botpress JWT token to bypass the `login` function, the token can be found in the version control page of the Botpress UI |
| &#x2011;&#x2011;image&#x2011;tag | -it | null | Docker image tag to base the output image on, defaults to `botpress/server` with the detected version of Botpress |
| &#x2011;&#x2011;output&#x2011;tag | -ot | bpexport:three_random_words | Tag of the built image |


## Awesome features

- ### Docker Hooks
Lets you execute code during the docker build pipeline, check [Docker Hooks Docs](https://github.com/botpress/solutions/tree/master/custom_tools/bp_image_builder/docker_hooks) for documentation.

- ### Custom modules
Build your image with your custom modules included.

  1 - Create a folder called custom_modules in the same folder as the bp_image_builder binary

  ![image](https://user-images.githubusercontent.com/13484138/155409555-a76ea07d-bb6c-4379-bed8-e7c7cd1c96d3.png)

  2 - Put the packaged .tgz file for your module inside the folder

  ![image](https://user-images.githubusercontent.com/13484138/155409697-5b0826ce-ac77-404f-9ef9-11c70d5c3ddd.png)

  3 - Your module will be included in the "modules" folder from Botpress and extracted, it will be available when you instanciate your docker image.

- ### Extra files
Include extra files in the docker image, usefull to be used with [Docker Hooks](https://github.com/botpress/solutions/tree/master/custom_tools/bp_image_builder/docker_hooks) 


  1 - Create a folder called extra_files in the same folder as the bp_image_builder binary

  ![image](https://user-images.githubusercontent.com/13484138/155410034-6a8deb55-07d2-4d88-82ae-6c415c8619fa.png)

  2 - Put all of your files inside the folder

  ![image](https://user-images.githubusercontent.com/13484138/155410123-eef14594-446e-4017-87f1-b963c1bcdacf.png)

  3 - Your files will be available at /botpress/extra_files inside the container after you build it.

- ### Custom Dockerfile
Its possible to use a custom Dockerfile to customize the pipeline even more, check [Custom Dockerfile Docs](https://github.com/botpress/solutions/tree/master/custom_tools/bp_image_builder/custom_dockerfile) for documentation.

## Development
To start developing on this project:

1. Fetch dependencies
```sh
yarn
```

2. Run in development mode
```sh
yarn dev <your command>
```

To build the binaries:
```
yarn && yarn package
```
The binaries will be located in the `/bin` folder.

Debug logging can be enabled by setting the `DEBUG` environment variable.
