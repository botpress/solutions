import tarstream, { Headers } from "tar-stream";
import fetch from "node-fetch";
import path from "path";
import { PassThrough } from "stream";
import { Logger } from "loglevel";

const FALLBACK_VERSION = "botpress/server:v12_22_2";

interface FileEntry {
  headers: Headers;
  content: string | Buffer;
}

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

export async function getLatestBotpressTag(): Promise<string> {
  const res = await fetch(
    "https://api.github.com/repos/botpress/botpress/releases"
  );
  const releases = await res.json();
  if (!releases.length) {
    return FALLBACK_VERSION;
  }
  const latest: string = releases[0].name;
  const version = latest.replace(/\./g, "_");
  return `botpress/server:${version}`;
}
