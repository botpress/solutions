import tarstream, { Headers } from "tar-stream";
import fetch from "node-fetch";
import fs from "fs-extra";
import path from "path";
import { PassThrough } from "stream";
import { Logger } from "loglevel";
import { DockerOptions } from "dockerode";
import chalk from "chalk";

const FALLBACK_VERSION = "botpress/server:v12_22_2";

export type Info = { token: string; origin: { host: string; ip?: string; port?: string }, hasHooks?: boolean; hasModules?: boolean; hasExtraFiles?: boolean}

interface FileEntry {
  headers: Headers;
  content: string | Buffer;
}

export interface DockerCLIOpts {
  dockerSocket?: string;
  dockerUrl?: string;
  dockerCerts?: string;
}

export const defaultDockerOpts: DockerOptions = {
  socketPath: "/var/run/docker.sock",
};

export function makeDockerfile(
  image_tag: string,
  content: string = null,
  info: Info
): FileEntry {
  content =
    (content &&
      content
        .replace("{{imageTag}}", image_tag)
        .replace("{{BUILD_TOKEN}}", info.token)
        .replace("{{BUILD_ORIGIN_HOST}}", info.origin.host)
        .replace("{{BUILD_ORIGIN_IP}}", info.origin.ip)
        .replace("{{BUILD_ORIGIN_PORT}}", info.origin.port)) ||
    `
        FROM ${image_tag}
        COPY ./data /botpress/data
        ARG BUILD_TOKEN=${info.token}
        ARG BUILD_ORIGIN_HOST=${info.origin.host}
        ARG BUILD_ORIGIN_IP=${info.origin.ip}
        ARG BUILD_ORIGIN_PORT=${info.origin.port}
        RUN mkdir /botpress/docker_hooks
        RUN mkdir /botpress/extra_files
        ${info.hasHooks ? "COPY ./docker_hooks/ /botpress/docker_hooks/" : ""}
        ${info.hasModules ? "COPY ./custom_modules/ /botpress/modules/" : ""}
        ${info.hasExtraFiles ? "COPY ./extra_files/ /botpress/extra_files/" : ""}
        ${info.hasModules ? "RUN ./bp extract" : ""}
        ${
          info.hasHooks
            ? "RUN chmod -R 777 /botpress/docker_hooks/* && /botpress/docker_hooks/after_build.sh;exit 0"
            : ""
        }
        WORKDIR /botpress
        ENV BPFS_STORAGE=disk \
            CORE_DISABLE_FILE_LISTENERS=true
        CMD ./duckling & ./bp
    `;
  return {
    headers: {
      name: "Dockerfile",
    },
    content,
  };
}

export function processTar(
  tarSteam: NodeJS.ReadableStream,
  files: FileEntry[],
  logger: Logger
): NodeJS.ReadableStream {
  var extractor = tarstream.extract();
  var compressor = tarstream.pack();
  logger.info(`Processing tar stream...`);
  extractor.on("entry", (header, rstream, next) => {
    header.name = path.join("data", header.name);
    logger.debug(chalk.green`+ ${header.name}`);
    rstream.pipe(compressor.entry(header, next));
  });

  for (const file of files) {
    compressor.entry(file.headers, file.content, (err) => {
      logger.debug(chalk.green`+ ${file.headers.name}`);
      if (err) {
        logger.error(`Unable to write ${file.headers.name}: ${err.message}`);
      }
    });
  }

  extractor.on("finish", function () {
    compressor.finalize();
  });

  tarSteam.pipe(extractor);

  const passThrough = new PassThrough();

  compressor.pipe(passThrough);

  return passThrough;
}

export async function getLatestBotpressImageTag(): Promise<string> {
  const res = await fetch("https://api.github.com/repos/botpress/botpress/releases");
  if (!res.ok) {
    throw new Error(`Unable to fetch GitHub releases for Botpress`);
  }
  const releases = await res.json();
  if (!releases.length) {
    return FALLBACK_VERSION;
  }
  const latest: string = releases[0].name;
  const version = latest.replace(/\./g, "_");
  return `botpress/server:${version}`;
}

export async function getCurrentBotpressImageTag(botpressURL: string): Promise<string> {
  const versionEndpoint = new URL("/version", botpressURL);
  const res = await fetch(versionEndpoint);
  const version = await res.text();
  return `botpress/server:v${version.replace(/\./g, "_")}`;
}

export function parseDockerOptions(opts: Partial<DockerCLIOpts> | null): DockerOptions {
  if (!opts) {
    return defaultDockerOpts;
  }

  return {
    socketPath: opts.dockerSocket || defaultDockerOpts.socketPath,
    host: opts.dockerSocket ? opts.dockerUrl : undefined,
    ca: opts.dockerCerts ? fs.readFileSync(path.join(opts.dockerCerts, "ca.pem")) : null,
    cert: opts.dockerCerts ? fs.readFileSync(path.join(opts.dockerCerts, "cert.pem")) : null,
    key: opts.dockerCerts ? fs.readFileSync(path.join(opts.dockerCerts, "key.pem")) : null,
  };
}

export function isURL(url: string): boolean {
  debugger;
  try {
    new URL(url);
  } catch (err) {
    return false;
  }
  return true;
}
