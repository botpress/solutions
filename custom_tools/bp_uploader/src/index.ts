import { program, Option } from "commander";
import promptly from "promptly";
import log from "loglevel";
import chalk from "chalk";
import auth from "./auth";
import { upload } from "./uploader";

log.setLevel(log.levels.INFO);

if (process.env.DEBUG) {
  log.setLevel(log.levels.TRACE);
}

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
  .command("upload-bot <bp_url> <bot_folder_path>")
  .description("Upload a single bot folder to Botpress")
  .addOption(
    new Option("-id, --bot-id [bot_id]", "Id used for the new bot").default(
      null,
      "Get from bot.config.json file"
    )
  )
  .addOption(
    new Option("-w, --workspace [workspace_id]", "Workspace to upload the bot to").default(
      "default"
    )
  )
  .addOption(
    new Option("-o, --overwrite", "Overwrite the bot if it exists").default(false)
  )
  .action(async (url, botFolderPath, options) => {
    const { jwt } = auth.getToken(url);
    if (!jwt) {
      log.error(chalk.redBright`Please login to ${url} using the login command first`);
      return;
    }
    log.info(`Uploading ${botFolderPath} to ${url}`);
    try {
      await upload(url, botFolderPath, jwt, log, options.botId, options.workspace, options.overwrite);
    } catch (err) {
      log.error(`An error occured during bot upload: `, err);
      return;
    }
    log.info(chalk.green`Uploaded ${botFolderPath} to ${url}`);
  });

program
  .name("bp_uploader")
  .version("1.0.1")
  .description("Upload data to a Botpress instance")
  .parse(process.argv);
