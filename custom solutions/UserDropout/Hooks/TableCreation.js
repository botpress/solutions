function hook(bp: typeof sdk) {
  /** Your code starts below */


    function CreatTable(){
      const tableName = 'Example_DB'
      bp.database.CreatTableIfNotExists(tableName, function(table){
        table.increment('id').primary 
        table.string('FirstName')
        table.string('LastName')
        table.string('TargetUsers')
      })
    }

  /** Your code ends here */
}
