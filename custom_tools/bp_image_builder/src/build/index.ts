import Docker, { DockerOptions } from "dockerode";
import os from "os";
import randomWords from "random-words";
import fs from "fs-extra";
import logger from "loglevel";
import path from "path";
import dns from 'dns'
import ip from 'ip'
import JSONStream from "JSONStream";
import {
  processTar,
  makeDockerfile,
  getLatestBotpressImageTag,
  DockerCLIOpts,
  parseDockerOptions,
  defaultDockerOpts,
  isURL,
  Info
} from "../utils";
import chalk from "chalk";
import { AbstractMultiStrategy } from "../multistrategy";
import ReadFSStrategy, { ReadFSOpts, getFolderBufferArray, readFileAsText } from "./fs";
import BPPullStrategy, { BPPullOpts } from "./bppull";

export type BPDataReadStrategy = (opts: ReadFSOpts | BPPullOpts) => Promise<NodeJS.ReadableStream>;

export class BuildManager {
  private parentWorkDir: string;
  public builds: Build[] = [];

  constructor(baseDir: string = os.tmpdir()) {
    this.parentWorkDir = path.join(baseDir, "bp_image_builder");
  }

  async initialize(purge: boolean = true) {
    if (purge) {
      await this.purgeDir();
    }
  }

  async purgeDir() {
    await fs.emptyDir(this.parentWorkDir);
  }

  async create(opts: Partial<DockerCLIOpts> = null, name: string = null) {
    try {
      await fs.ensureDir(this.parentWorkDir);
    } catch (err) {
      throw new Error(`Unable to create temporary build directory: ${err.message}`);
    }

    if (!name) {
      name = randomWords({ exactly: 3, join: "_" });
    }
    const buildDir = path.join(this.parentWorkDir, name);
    await fs.ensureDir(buildDir);
    const dockerOpts = parseDockerOptions(opts);

    const build = new Build(buildDir, name, dockerOpts);
    this.builds.push(build);
    return build;
  }
}

class Build extends AbstractMultiStrategy<BPDataReadStrategy> {
  docker: Docker;
  constructor(private _dir: string, public name: string, dockerOpts: DockerOptions = defaultDockerOpts) {
    super();
    this.registerStrategy("pull", BPPullStrategy);
    this.registerStrategy("fs", ReadFSStrategy);
    this.docker = new Docker(dockerOpts);
  }

  public get dir(): string {
    return this._dir;
  }

  public async read(urlOrPath: string, authToken?: string): Promise<NodeJS.ReadableStream> {
    if (isURL(urlOrPath)) {
      logger.info("Pulling using bp pull strategy");
      const reader = this._strategies.get("pull");
      return await reader({ url: urlOrPath, authToken });
    }
    logger.info(`Reading ${urlOrPath} from filesystem`);
    const reader = this._strategies.get("fs");
    return await reader({ archivePath: urlOrPath });
  }

  async getConfig(): Promise<object> {
    const path = process.cwd() + '/buildImage.config.js'
    try {
      if(!(await fs.pathExists(path))) return {};
      const script = require(path)
      const config = typeof script == 'function' ? await script() : script
      logger.getLogger('build').info('Using additional config from buildImage.config.js: ' + JSON.stringify(config, null, 1))
      return config
    } catch(e) {
      logger.getLogger('build').error('Error executing buildImage.config.js: ' + e.message)
      throw e
    }
  }

  async populateHostFields(info: Info) {
    try {
      const url = new URL(info.origin.host)
      const originIp = await (await dns.promises.lookup(url.hostname)).address
      info.origin.port = url.port || '80'

      if(originIp == '127.0.0.1' || originIp == '127.0.1.1' || originIp == ip.address()) {
        logger.getLogger('build').warn('Using localhost')
        info.origin.ip = ip.address()
      } else {
        info.origin.ip = originIp
      }
    } catch(e) {
      logger.getLogger('build').error(`Error resolving origin host ${info.origin.host}: ${e.message}`)
    }
  }

  async build(
    contextStream: NodeJS.ReadableStream,
    baseImageTag: string = null,
    outputTag: string = null,
    info: Info
  ): Promise<string> {
    try {
      await this.docker.ping();
    } catch (err) {
      throw new Error(`Could not communicate with the Docker daemon: ${err.message}`);
    }

    if (!outputTag) {
      outputTag = `bpexport:${this.name}`;
    }

    if (!baseImageTag) {
      baseImageTag = await getLatestBotpressImageTag();
    }

    logger.getLogger("docker").info(`Creating docker image ${outputTag} based on ${baseImageTag}`);

    const dockerHooks = await getFolderBufferArray("./docker_hooks");
    const botpressCustomModules = await getFolderBufferArray("./custom_modules");
    const extraFiles = await getFolderBufferArray("./extra_files");

    const dockerFileText = await readFileAsText("./Dockerfile");

    await this.populateHostFields(info)

    const dockerfile = makeDockerfile(baseImageTag, dockerFileText, {
      ...info,
      hasHooks: dockerHooks.length > 0,
      hasModules: botpressCustomModules.length > 0,
      hasExtraFiles: extraFiles.length > 0,
    });

    const tarStream = processTar(
      contextStream,
      [dockerfile, ...dockerHooks, ...botpressCustomModules, ...extraFiles],
      logger.getLogger("build")
    );

    logger.getLogger("docker").info("Building image...");

    const buildStream = await this.docker.buildImage(tarStream, {
      t: outputTag,
      ...(info.origin.ip &&  { extrahosts: `origin:${info.origin.ip}` }),
      ...await this.getConfig()
    });

    buildStream.pipe(JSONStream.parse("stream")).on("data", (d: string) => {
      logger.getLogger("docker").info(chalk.blue(d));
    });

    let dockerError = null;

    buildStream.pipe(JSONStream.parse("error")).on("data", (d: string) => {
      logger.getLogger("docker").info(chalk.redBright(d));
      dockerError = new Error(d);
    });

    await new Promise<void>((resolve, reject) => {
      this.docker.modem.followProgress(buildStream, (err: Error, _) => {
        if (err || dockerError) {
          reject(err || dockerError);
        }
        resolve();
      });
    });

    return outputTag;
  }
}
