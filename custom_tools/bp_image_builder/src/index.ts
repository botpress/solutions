import { BuildManager } from "./build";
import { Option, program } from "commander";
import promptly from "promptly";
import log from "loglevel";
import { getCurrentBotpressImageTag, getLatestBotpressImageTag, isURL } from "./utils";
import auth, { JWT } from "./auth";
import chalk from "chalk";

log.setDefaultLevel(log.levels.INFO);
if (process.env.DEBUG) {
  log.setDefaultLevel(log.levels.TRACE);
}
program
  .command("build <bp_url>")
  .description("build an image")
  .addOption(
    new Option("-ds, --docker-socket [socket_path]", "docker socket path").default("/var/run/docker.sock")
  )
  .option(
    "-durl, --docker-url [docker_url]",
    "the HTTP(S) url of the docker daemon to use for building",
    null
  )
  .option(
    "-dc, --docker-certs [certs_path]",
    "https certificate directory for connecting to the docker daemon via HTTPS",
    null
  )
  .addOption(
    new Option(
      "-it, --image-tag [image_tag]",
      "docker image tag to base the image on, ex: botpress/server:v12_22_2"
    ).default(null, "latest botpress/server release")
  )
  .addOption(
    new Option("-t, --token [auth_token]", "JWT Auth Token to use to pull Botpress data").default(null)
  )
  .addOption(
    new Option("-ot, --output-tag [output_tag]", "tag of the built output image").default(
      null,
      "randomly generated"
    )
  )
  .action(async (url, options) => {
    try {
      const m = new BuildManager();
      await m.initialize();
      const builder = await m.create(options);

      let token: string | undefined = options.token;

      const validURL = isURL(url);

      if (!token && validURL) {
        const jwt = auth.getToken(url);
        if (!jwt) {
          throw new Error(
            "You need to authenticate with Botpress to build an image, either authenticate using the login command or specify an auth token with the -t flag"
          );
        }
        token = jwt.jwt;
      }

      const bpData = await builder.read(url, token);

      if (!options.imageTag && validURL) {
        options.imageTag = await getCurrentBotpressImageTag(url);
      } else if (!options.imageTag) {
        options.imageTag = await getLatestBotpressImageTag();
        log.warn(
          chalk.yellowBright`No botpress version could be detected and no image_tag was specified, defaulting to latest release: ${options.imageTag}`
        );
      }

      try {
        const outputTag = await builder.build(bpData, options.imageTag, options.outputTag, {
          token,
          originHost: url,
        });
        log.info(chalk.greenBright`Image has been built with tag ${outputTag}`);
        log.info(`\nTo try it out run: docker run -it -p 3000:3000 ${outputTag}`);
      } catch (err) {
        throw new Error(`An error occured during the docker build: ${err.message}`);
      }
    } catch (err) {
      log.error(err.message);
    }
  });

program
  .command("login <bp_url> <email> [password]")
  .description("Login using your Botpress credentials")
  .action(async (url, email, password) => {
    if (!password) {
      password = await promptly.password(`Enter password for ${email}: `);
    }
    const jwt = await auth.login("basic", url, { email, password });
    if (jwt) {
      log.info(chalk.green`Logged in successfully as ${email}`);
      return;
    }
    log.error(chalk.redBright`Unable to login due to an unknown error: The token was empty`);
  });

program
  .name("bp_image_build")
  .version("1.0.0")
  .description("Builds a docker image out of a botpress instance")

  .parse(process.argv);
