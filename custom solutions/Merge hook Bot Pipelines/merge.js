  /**
   * The goal here is to make sure the copy of the bot (before being promoted to the next stage),
   * contains all Q&As and intents from the current and the next stage bot.
   *
   * For this to work, the pipeline action must be 'Copy' and there must be a copy of the bot on
   * each stages with their ids being {botId}_{stageId}.
   */
  async function process() {
    // This hook only runs when the pipeline action is set to 'Copy'
    if (hookResult.actions && hookResult.actions.length && hookResult.actions[0] !== 'promote_copy') {
      return
    }

    const _ = require('lodash')

    // TODO: Make sure thats all the folders we need to merge
    const QNA_FOLDER = './qna'
    const INTENT_FOLDER = './intents'
    const ENTITY_FOLDER = './entities'
    const folders = [QNA_FOLDER, INTENT_FOLDER, ENTITY_FOLDER]

    const customizer = (objValue, srcValue) => {
      if (_.isArray(objValue)) {
        // Creates an array of unique values
        return _.union(objValue, srcValue)
      }
    }

    const ghostService = bp.ghost.forBot(bot.id)

    // The ID of the bot on the last stage does not contain any suffix
    bot.id = bot.id.replace(bot.pipeline_status.current_stage.id, bot.pipeline_status.stage_request.id)
    // Make sure not to override the bot's name while promoting it
    try {
      const botNext = await bp.bots.getBotById(bot.id)

      if (botNext) {
        bot.name = botNext.name
      }
    } catch (err) {
      bp.logger.error("An error occurred while overriding the bot's name", err)
      throw err
    }

    const ghostServiceNext = bp.ghost.forBot(bot.id)

    for (let folder of folders) {
      let filesNext = []
      try {
        filesNext = await ghostServiceNext.directoryListing(folder, '*.json')
      } catch (err) {
        bp.logger.error("An error occurred while listing the bot's content files", err)
        throw err
      }

      for (let fileNext of filesNext) {
        let content = null

        let fileExists = false
        try {
          fileExists = await ghostService.fileExists(folder, fileNext)
        } catch (err) {
          // Silently fail. The file will be upserted instead.
          bp.logger.warn('Could not validate if the file already exists', err)
        }

        // The file already exists for both bots. Merge both files together.
        if (fileExists) {
          try {
            const obj = await ghostService.readFileAsObject(folder, fileNext)
            const objNext = await ghostServiceNext.readFileAsObject(folder, fileNext)
            const mergedObj = _.mergeWith(obj, objNext, customizer)

            content = JSON.stringify(mergedObj, undefined, 2)
          } catch (err) {
            // Silently fail. The file will be inserted instead.
            bp.logger.warn('Could not merge both files together', err)
          }
        }

        // Either the file does not exists or the merge failed.
        // The premise is that if we cannot merge the files,
        // the one from the next stage bot should now be considered the truth.
        if (!fileExists || content === null) {
          try {
            content = await ghostServiceNext.readFileAsBuffer(folder, fileNext).catch()
          } catch (err) {
            bp.logger.error('Could not fetch the file content', err)
            throw err
          }
        }

        if (content) {
          try {
            await ghostService.upsertFile(folder, fileNext, content)
          } catch (err) {
            // If the file cannot be upserted, there is not much we can do...
            bp.logger.error('An error occurred while upserting the file', err)
            throw err
          }
        }
      }
    }
  }

  return process()