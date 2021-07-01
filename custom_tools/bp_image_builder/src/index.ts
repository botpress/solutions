import { BuildManager } from "./build";
import { Option, program } from "commander";
import promptly from "promptly";
import log from "loglevel";
import { getCurrentBotpressImageTag } from "./utils";
import { loginBasic } from "./auth";

log.setDefaultLevel(log.levels.INFO);

program
  .command("build <bp_url>")
  .description("build an image")
  .addOption(
    new Option(
      "-it, --image-tag [image_tag]",
      "docker image tag to base the image on, ex: botpress/server:v12_22_2"
    ).default(null, "latest botpress/server release")
  )
  .addOption(
    new Option(
      "-t, --token [auth_token]",
      "JWT Auth Token to use to pull Botpress data"
    ).default(null)
  )
  .addOption(
    new Option(
      "-ot, --output-tag [output_tag]",
      "tag of the built output image"
    ).default(null, "randomly generated")
  )
  .action(async (url, options) => {
    try {
      const m = new BuildManager();
      await m.initialize();
      const builder = await m.create(options);

      const bpData = await builder.readBP({ url, authToken: options.token });

      if (!options.imageTag) {
        options.imageTag = await getCurrentBotpressImageTag(url);
      }

      const outputTag = await builder.build(
        bpData,
        options.imageTag,
        options.outputTag
      );

      log.info(`Image has been built with tag ${outputTag}`);
    } catch (err) {
      log.error(err.message);
    }
  });

program
  .command("login <bp_url> <email> [password]")
  .description("Generate a token using your Botpress credentials")
  .action(async (url, email, password) => {
    if (!password) {
      password = await promptly.password(`Enter password for ${email}: `);
    }
    let token = "";
    try {
      token = await loginBasic(url, email, password);
    } catch (err) {
      log.error(err.message);
      return;
    }
    log.info(`TOKEN:\n\n${token}\n\n`);
  });

program
  .name("bp_image_build")
  .description("Builds a docker image out of a botpress instance")
  .addOption(
    new Option(
      "-ds, --docker-socket [socket_path]",
      "docker socket path"
    ).default("/var/run/docker.sock")
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
  .addHelpCommand();

program.parse(process.argv);
