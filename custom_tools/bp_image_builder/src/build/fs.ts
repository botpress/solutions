import gunzip from "gunzip-maybe";
import logger from "loglevel";
import fs from "fs-extra";

export interface ReadFSOpts {
  archivePath: string;
}

export default async function readFS(opts: ReadFSOpts): Promise<NodeJS.ReadableStream> {
  const { archivePath } = opts;
  const exists = await fs.pathExists(archivePath);
  if (!exists) {
    throw new Error(`Path ${archivePath} does not exist`);
  }
  return fs.createReadStream(archivePath).pipe(gunzip());
}

export async function readFile(path: string): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    const exists = await fs.pathExists(path);
    if (!exists) {
      throw new Error(`Path ${path} does not exist`);
    }
    const stream = fs.createReadStream(path);
    var buffers = [];
    stream.on("data", function (data) {
      buffers.push(data);
    });
    stream.on("error", function (error) {
      console.log("error", error);
      reject(error.message);
    });
    stream.on("end", function () {
      resolve(Buffer.concat(buffers));
    });
  });
}
