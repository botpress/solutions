import tarstream, { Headers } from "tar-stream";
import fetch from "node-fetch";
import fs from "fs-extra";
import path from "path";
import { PassThrough } from "stream";
import { Logger } from "loglevel";
import { DockerOptions } from "dockerode";

const FALLBACK_VERSION = "botpress/server:v12_22_2";

interface FileEntry {
  headers: Headers;
  content: string | Buffer;
}

export interface DockerCLIOpts {
  socket_path?: string;
  docker_url?: string;
  certs_path?: string;
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
    logger.debug(`Added ${header.name}`);
    rstream.pipe(compressor.entry(header, next));
  });

  compressor.entry(dockerfile.headers, dockerfile.content, (err) => {
    logger.debug(`Added ${dockerfile.headers.name}`);
    logger.debug(`Added dockerfile to tar stream`);
    if (err) {
      console.error(
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
  console.log(opts);
  return {
    socketPath: opts.socket_path || defaultDockerOpts.socketPath,
    host: opts.socket_path ? opts.docker_url : undefined,
    ca: opts.certs_path
      ? fs.readFileSync(path.join(opts.certs_path, "cert.pem"))
      : null,
    cert: opts.certs_path
      ? fs.readFileSync(path.join(opts.certs_path, "cert.pem"))
      : null,
    key: opts.certs_path
      ? fs.readFileSync(path.join(opts.certs_path, "key.pem"))
      : null,
  };
}
