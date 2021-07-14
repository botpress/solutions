import tarstream, { Headers } from "tar-stream";
import fetch from "node-fetch";
import fs from "fs-extra";
import path from "path";
import { PassThrough } from "stream";
import { Logger } from "loglevel";
import { DockerOptions } from "dockerode";
import chalk from "chalk";

const FALLBACK_VERSION = "botpress/server:v12_22_2";

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
  content: string = null
): FileEntry {
  content =
    content ||
    `
        FROM ${image_tag}
        COPY ./data /botpress/data
        WORKDIR /botpress
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
  dockerfile: FileEntry,
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

  compressor.entry(dockerfile.headers, dockerfile.content, (err) => {
    logger.debug(chalk.green`+ ${dockerfile.headers.name}`);
    if (err) {
      logger.error(
        `Unable to write ${dockerfile.headers.name}: ${err.message}`
      );
    }
  });

  extractor.on("finish", function () {
    compressor.finalize();
  });

  tarSteam.pipe(extractor);

  const passThrough = new PassThrough();

  compressor.pipe(passThrough);

  return passThrough;
}

export async function getLatestBotpressImageTag(): Promise<string> {
  const res = await fetch(
    "https://api.github.com/repos/botpress/botpress/releases"
  );
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

export async function getCurrentBotpressImageTag(
  botpressURL: string
): Promise<string> {
  const versionEndpoint = new URL("/version", botpressURL);
  const res = await fetch(versionEndpoint);
  const version = await res.text();
  return `botpress/server:v${version.replace(/\./g, "_")}`;
}

export function parseDockerOptions(
  opts: Partial<DockerCLIOpts> | null
): DockerOptions {
  if (!opts) {
    return defaultDockerOpts;
  }

  return {
    socketPath: opts.dockerSocket || defaultDockerOpts.socketPath,
    host: opts.dockerSocket ? opts.dockerUrl : undefined,
    ca: opts.dockerCerts
      ? fs.readFileSync(path.join(opts.dockerCerts, "ca.pem"))
      : null,
    cert: opts.dockerCerts
      ? fs.readFileSync(path.join(opts.dockerCerts, "cert.pem"))
      : null,
    key: opts.dockerCerts
      ? fs.readFileSync(path.join(opts.dockerCerts, "key.pem"))
      : null,
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
