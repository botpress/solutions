import Docker, { DockerOptions } from "dockerode";
import gunzip from "gunzip-maybe";
import os from "os";
import fs from "fs-extra";
import fetch from "node-fetch";
import logger from "loglevel";
import path from "path";
import JSONStream from "JSONStream";
import { processTar, makeDockerfile, getLatestBotpressTag } from "./utils";
import chalk from "chalk";

const BP_PULL_ENDPOINT = "/api/v2/admin/management/versioning/export";

interface BPPullConfig {
  url: string;
  authToken: string;
}

const defaultDockerOpts: DockerOptions = {
  socketPath: "/var/run/docker.sock",
};

export class BuildManager {
  private parentWorkDir: string;
  public builds: Build[] = [];

  constructor(baseDir: string = os.tmpdir()) {
    this.parentWorkDir = path.join(baseDir, "bp_docker_builder");
  }

  async initialize(purge: boolean = true) {
    if (purge) {
      await this.purgeDir();
    }
  }

  async purgeDir() {
    await fs.emptyDir(this.parentWorkDir);
  }

  async create(name: string = null) {
    await fs.ensureDir(this.parentWorkDir);
    if (!name) {
      name = `${Date.now()}`;
    }
    const buildDir = path.join(this.parentWorkDir, name);
    await fs.ensureDir(buildDir);
    const build = new Build(buildDir, name);
    this.builds.push(build);
    return build;
  }
}

class Build {
  docker: Docker;
  constructor(
    private _dir: string,
    public name: string,
    dockerOpts: DockerOptions = defaultDockerOpts
  ) {
    this.docker = new Docker(dockerOpts);
  }

  public get dir(): string {
    return this._dir;
  }

  async readFS(archivePath: string): Promise<NodeJS.ReadableStream> {
    const exists = await fs.pathExists(archivePath);
    if (!exists) {
      throw new Error(`Path ${archivePath} does not exist`);
    }
    logger.getLogger("reader").info(`Reading ${archivePath}`);
    return fs.createReadStream(archivePath).pipe(gunzip());
  }

  async readBP(config: BPPullConfig): Promise<NodeJS.ReadableStream> {
    const endpoint = new URL(BP_PULL_ENDPOINT, config.url);
    const res = await fetch(endpoint, {
      method: "GET",
      headers: { Authorization: `Bearer ${config.authToken}` },
      size: 0,
      timeout: 500000,
    });
    logger
      .getLogger("reader")
      .info(`Downloading data from Botpress BPFS hosted at ${config.url}`);
    if (!res.ok) {
      const error = await res.json();

      throw new Error(
        `Archive download failed with error code ${res.status}: ${error.message}`
      );
    }
    return res.body.pipe(gunzip());
  }

  async build(
    contextStream: NodeJS.ReadableStream,
    baseImageTag: string = null,
    outputTag: string = null
  ): Promise<string> {
    await this.docker.ping();
    if (!outputTag) {
      outputTag = `bpexport:${this.name}`;
    }

    if (!baseImageTag) {
      baseImageTag = await getLatestBotpressTag();
    }

    logger
      .getLogger("docker")
      .info(`Creating docker image ${outputTag} based on ${baseImageTag}`);

    const dockerfile = makeDockerfile(baseImageTag);
    const tarStream = processTar(
      contextStream,
      dockerfile,
      logger.getLogger("build-context-stream")
    );
    logger.getLogger("docker").info("Building image...");
    const buildStream = await this.docker.buildImage(tarStream, {
      t: outputTag,
    });
    buildStream.pipe(JSONStream.parse("stream")).on("data", (d: string) => {
      logger.getLogger("docker").info(chalk.blue(d));
    });
    await new Promise((resolve) => {
      this.docker.modem.followProgress(buildStream, resolve);
    });
    return outputTag;
  }
}
