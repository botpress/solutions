import { BuildManager } from "./build";
import { Option, program } from "commander";
import log from "loglevel";

log.setDefaultLevel(log.levels.INFO);

program
  .name("bp_image_build")
  .description("Builds a docker image out of a botpress instance")
  .addOption(
    new Option("-ds, --docker-socket [path]", "docker socket path").default(
      "/var/run/docker.sock"
    )
  )
  .option(
    "-durl, --docker-url [url]",
    "the HTTP(S) url of the docker daemon",
    null
  )
  .option(
    "-dc, --docker-certs [path]",
    "https certificate directory for docker daemon",
    null
  )
  .command("build <bp-url> <bp-auth-token>")
  .description("build an image")
  .addOption(
    new Option(
      "-it, --image-tag [image_tag]",
      "image tag to base the image on, ex: botpress/server:v12_22_2"
    ).default(null, "latest botpress/server release")
  )
  .addOption(
    new Option(
      "-ot, --output-tag [output_tag]",
      "tag of the built output image"
    ).default(null, "randomly generated")
  )
  .action(async (url, authToken, options) => {
    const m = new BuildManager();
    await m.initialize();
    const build = await m.create();

    const bpData = await build.readBP({ url, authToken });
    const outputTag = await build.build(
      bpData,
      options.image_tag,
      options.output_tag
    );

    log.info(`Image has been built with tag ${outputTag}`);
  });
program.parse(process.argv);
