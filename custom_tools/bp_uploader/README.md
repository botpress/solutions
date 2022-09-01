# Botpress Uploader

### Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Authentication](#authentication)
- [Uploading](#Uploading)
  - [Uploading Flags](#Uploading-flags)
- [Development](#development)

---

Pack and Upload a Botpress bot folder to a target Botpress server

## Requirements

- Folder with files from Botpress Bot containing a valid bot.config.json file
- A target server running Botpress

## Installation

Head over to the [releases page](https://github.com/botpress/solutions/releases/tag/bpul-v1.0.1) and download the BP Uploader for your platform:

```sh
chmod +x bp_uploader-<your platform>
mv bp_uploader-<your platform> bp_uploader
```

Execute the program:

```sh
./bp_uploader
```

You may move the binary to a folder set in your `$PATH` to access the tool from anywhere

## Authentication

To authenticate with the target Botpress server where the bot will be sent to, use the `login` command:

```sh
bp_uploader login <root botpress url> <email> [password]
```

If the password is omitted it will be requested in a password prompt

The authentication expires after 60 minutes.

## Uploading

To upload a bot folder with the `upload-bot` command, make sure you have authenticated with the `login` command beforehand:

```sh
bp_uploader upload-bot <target botpress url> <path to folder containing the bot>
```

In the example below the bot folder is in the same folder as the bp_uploader tool

```sh
bp_uploader upload-bot http://localhost:3000 ./bot_example
```

### Uploading Flags

| Flag                          | Shorthand | Default                 | Description                             |
| ----------------------------- | --------- | ----------------------- | --------------------------------------- |
| &#x2011;&#x2011;bot&#x2011;id | -id       | Id from bot.config.json | An Id for the bot that will be uploaded |
| --overwrite                   | -o        | false                   | Overwrite the bot if it exists          |
| --workspace [workspace_id]    | -w        | default                 | Workspace to upload the bot to          |

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
