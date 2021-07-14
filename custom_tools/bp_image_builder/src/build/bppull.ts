import gunzip from "gunzip-maybe";
import fetch from "node-fetch";
import logger from "loglevel";

const BP_PULL_ENDPOINT = "/api/v2/admin/management/versioning/export";

export interface BPPullOpts {
  url: string;
  authToken: string;
}

export default async function readBP(
  opts: BPPullOpts
): Promise<NodeJS.ReadableStream> {
  const endpoint = new URL(BP_PULL_ENDPOINT, opts.url);
  const res = await fetch(endpoint, {
    method: "GET",
    headers: { Authorization: `Bearer ${opts.authToken}` },
    size: 0,
    timeout: 500000,
  });
  logger
    .getLogger("reader")
    .info(`Downloading data from Botpress BPFS hosted at ${opts.url}`);
  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      `Archive download failed with error code ${res.status}: ${error.message}`
    );
  }
  return res.body.pipe(gunzip());
}
