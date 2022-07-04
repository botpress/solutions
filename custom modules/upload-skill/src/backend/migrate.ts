import * as sdk from 'botpress/sdk'

import { TABLE_NAME, MODULE_NAME } from '../constants'

const debug = DEBUG(MODULE_NAME)

export default async (bp: typeof sdk) => {
  await bp.database.createTableIfNotExists(TABLE_NAME, table => {
    debug(`Creating database table '${TABLE_NAME}'`)

    table
      .string('id')
      .primary()
      .notNullable()
    table.string('threadId').notNullable()
    table.string('botId').notNullable()
    table.string('name').notNullable()
    table.integer('size').notNullable()
    table.string('mimetype').notNullable()
    table.binary('data').notNullable()
    table.timestamps()
  })
}
