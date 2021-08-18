import fs from "fs-extra";
import glob from "fast-glob";
import request from "request";
import { PassThrough } from "stream";
import { Logger } from "loglevel";
import path from "path";
import tarstream from "tar-stream";

const getUploadURL = (
  baseURL: string,
  botID: string,
  overwrite: boolean = false
): URL => {
  return new URL(
    `/api/v2/admin/workspace/bots/${botID}/import?overwrite=${overwrite}`,
    baseURL
  );
};

const sanitizeBotId = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-z0-9_-]/g, "");

const generateBotId = (filename: string): string => {
  const noExt = filename.substr(0, filename.indexOf("."));
  const matches = noExt.match(/bot_(.*)_[0-9]+/);
  return sanitizeBotId(matches && matches[1]) || noExt;
};

const getFolderAsTarStream = async (
  folderPath: string,
  logger: Logger
): Promise<NodeJS.ReadableStream> => {
  logger.debug(`Resolved path ${path.resolve(folderPath)}`);
  const stat = await fs.stat(folderPath);
  if (!stat.isDirectory()) {
    throw new Error(`${folderPath} is not a directory`);
  }
  const tarStream = tarstream.pack();
  const files = await glob(`/**/*`, {
    // dot: true,
    followSymbolicLinks: false,
    cwd: folderPath,
    onlyFiles: true,
  });

  logger.info(`Found ${files.length} files`);

  for (let file of files) {
    logger.debug(`Adding ${file} to archive`);
    const buffer = await fs.readFile(path.join(folderPath, file));
    tarStream.entry({ name: file }, buffer).on("error", (err: Error) => {
      logger.error(`An error occured while adding ${file}: `, err);
    });
  }

  tarStream.finalize();

  const passThrough = new PassThrough();
  tarStream.pipe(passThrough);
  return passThrough;
};

export const upload = async (
  url: string,
  folderPath: string,
  authToken: string,
  logger: Logger
) => {
  const folderName = path.dirname(folderPath);
  const data = await getFolderAsTarStream(folderPath, logger);
  const endpoint = getUploadURL(url, generateBotId(folderName));

  logger.debug(`Uploading to ${endpoint.href}`);

  const req = request.post(endpoint.href, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/tar+gzip",
    },
  });
  return new Promise((resolve) => {
    data.pipe(req);
    data.on("end", resolve);
  });
};
