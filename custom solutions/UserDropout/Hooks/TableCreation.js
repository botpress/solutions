function hook(bp: typeof sdk) {
  /** Your code starts below */


    function CreateTable(){
      const tableName = 'Example_DB'
      bp.database.CreateTableIfNotExists(tableName, function(table){
        table.increment('id').primary 
        table.string('FirstName')
        table.string('LastName')
        table.string('TargetUsers')
      })
    }
  CreateTable()

  /** Your code ends here */
}
