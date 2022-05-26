import fs from "fs-extra";
import glob from "fast-glob";
import request from "request";
import { PassThrough } from "stream";
import { Logger } from "loglevel";
import path from "path";
import tarstream from "tar-stream";

global.botId = null;

const getUploadURL = (baseURL: string, botID: string, overwrite: boolean = false): URL => {
  return new URL(`/api/v2/admin/workspace/bots/${botID}/import?overwrite=${overwrite}`, baseURL);
};

const getFolderAsTarStream = async (folderPath: string, logger: Logger): Promise<NodeJS.ReadableStream> => {
  const pathString = path.resolve(folderPath).replace(/\\/g, "/");
  logger.debug(`Resolved path ${pathString}`);
  const stat = await fs.stat(folderPath);
  if (!stat.isDirectory()) {
    throw new Error(`${folderPath} is not a directory`);
  }
  const tarStream = tarstream.pack();
  let files = await glob(`./**/*`, {
    dot: true,
    followSymbolicLinks: false,
    cwd: pathString,
    onlyFiles: true,
  });
  files = files.filter(f => !f.includes(".git"))

  logger.info(`Found ${files.length} files`);

  for (let file of files) {
    logger.debug(`Adding ${file} to archive`);
    if (file == "bot.config.json") {
      try {
        global.botId = JSON.parse(await fs.readFile(path.join(folderPath, file), { encoding: "utf8" })).id;
      } catch (e) {
        logger.error(`Error reading bot.config.json`);
        throw e;
      }
    }
    const buffer = await fs.readFile(path.join(folderPath, file));
    tarStream.entry({ name: file }, buffer).on("error", (err: Error) => {
      logger.error(`An error occured while adding ${file}: `, err);
    });
  }

  if (global.botId == undefined) {
    throw new Error(
      "The file bot.config.json was not found in the folder, or the present id property is not valid."
    );
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
  logger: Logger,
  botId: string,
  workspace: string = 'default',
  overwrite: boolean = false
) => {
  return new Promise(async (resolve, reject) => {
    const data = await getFolderAsTarStream(folderPath, logger);
    const endpoint = getUploadURL(url, botId || global.botId, overwrite);

    logger.debug(`Uploading to ${endpoint.href}`);

    const req = request.post(endpoint.href, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/tar+gzip",
        "X-BP-Workspace": workspace
      },
    }, (err, res, body) => {
      logger.info(res.statusCode, body);
      if (err) {
        logger.error(`An error occured while uploading: `, err);
        reject(err);
        return;
      } else {
        logger.info(`Uploaded bot ${botId} to workspace ${workspace}`);
        resolve(null);
      }
    });
  
    data.pipe(req);
  });
};
