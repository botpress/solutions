import gunzip from "gunzip-maybe";
import logger from "loglevel";
import fs from "fs-extra";

export interface ReadFSOpts {
  archivePath: string;
}

export default async function readFS(
  opts: ReadFSOpts
): Promise<NodeJS.ReadableStream> {
  const { archivePath } = opts;
  const exists = await fs.pathExists(archivePath);
  if (!exists) {
    throw new Error(`Path ${archivePath} does not exist`);
  }
  return fs.createReadStream(archivePath).pipe(gunzip());
}
