  const LRUCache = require('lru-cache')
  const ms = require('ms')

  async function create() {
    await bp.database.createTableIfNotExists('converse_user_map', table => {
      table.string('botId')
      table.string('converseUserId')
      table.uuid('conversationId').unique()
      table.uuid('userId').unique()
      table.primary(['botId', 'converseUserId'])
    })

    if (!bp.converseMappingCache) {
      bp.converseMappingCache = new LRUCache({ max: 10000, maxAge: ms('5min') })
    }
  }
  return create()