# Preventing NLU data loss when using Bot Pipelines

## Introduction

### Stage Actions

Documentation on pipelines: [Bot Pipelines · | Developer's Guide](https://botpress.com/docs/pro/pipelines)

One common concern when working with Bot Pipelines is NLU data loss. Especially when using the Misunderstood module to add customer utterances to your bot's training dataset.

When your bot is in production, you use the Misunderstood module to incorporate customer utterances that the bot did not understand. As a consequence, new utterances are added to your Production bot. You do not want to lose those utterances, as they are required to make your bot smarter.

Meanwhile, you may be working on the next version of your bot in the Development stage of your Bot Pipeline. You may add, modify, or delete new intents and QnAs.

When you are satisfied with the Dev version of your bot, you will want to promote it to Staging for verification. At this point, you must incorporate the new customer utterances from the Prod bot into your Dev bot. Otherwise, your Dev bot will be missing a lot of data accumulated in Prod.

You can do this manually: export the NLU data (intents, QnAs) from your Prod bot and merge them by hand into your Dev bot. However, this process is tedious and error-prone.

One better way of solving this problem is through the use of Hooks. By using a custom hook (see instructions below), we can make sure no data is lost when merging data from the Prod bot with the Dev bot.

## Configuration

### Requirements

- Botpress **_v12.17.2_** and above
- **Pro** enabled
- A workspace with **more than one** stage

### Environment Setup

Let's say you have two to N stages in your pipeline. What you want to do is import your bot multiple times so that each stage has its own copy. _Make sure that your bot IDs are suffixed with the stage id. This is how the merge process knows which bot to merge with._

Steps:

1. Make sure all stages actions are set to 'Move'
2. Import your bot
3. Suffix the bot id with the stage id where it is going to be moved
4. Move the bot to the proper stage
5. Repeat step 2 to 4 for each stage

Video: [Environment Setup](Environment%20Setup.mp4)

### Merge Hook

Now, we have to install the hook that implements the merge logic. This custom code will allow a bot from, let’s say, staging to be merged with the one in production. This process makes sure that both bots hold the same NLU data (intents, Q&As, entities) before being promoted.

Steps:

1. Open the _Code Editor_
2. In the _Hooks_ section, click the (+) button
3. Select _Pipeline Hooks_ -> _On Stage Request_
4. Name the file **merge.js**
5. Copy the content of [this](merge.js) file within the newly created file.

_**Note**: Once this is done, make sure to set the stage actions to 'Copy' before promoting a bot. See [Example](#Example) for more information._

Video: [Merge hook](Merge%20hook.mp4)

## Example

For the hook to be triggered, the pipeline action has to be set to 'Copy'. Otherwise, it would be bypassed and the bot would end up being moved to the next stage. The merge process works by using the current and next stage id and the bot naming convention (id + stage id) to determine which bots have to be merged.

Video: [Example](Example.mp4)

## Troubleshooting

When seeing an error message instead of a success message during a bot promotion, a detailed error will be added to the bot logs. The error is most likely caused by a network issue, but it could also be a bug. Since there is no side effect in trying to promote the same bot a second time, the first step should be to try again. If the problem persists, you should then raise a ticket.
