function createTable() {
  bp.database.createTableIfNotExists('last_nodes', function(table) {
    table
      .increments('id')
      .unsigned()
      .primary()
    table.string('session_id')
    table.string('last_flow')
    table.string('last_node')
  })
}
createTable()
