  function createTable() {
    bp.database.createTableIfNotExists('last_nodes', function(table) {
      table.string('session_id')
      table.string('last_flow')
      table.string('last_node')
    })
  }
  createTable()
