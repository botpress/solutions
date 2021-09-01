function action(bp: typeof sdk, event: sdk.IO.IncomingEvent, args: any, { user, temp, session } = event.state) {
  /** Your code starts below */

  const tableName = 'JIO_DB'
  this.knex = bp.database

  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} UserName - Nmae of the User
   * @param {any} columnSelector - Column you wish to change 
   * @param {any} currentNode - The new Value to be stored in that column
   */
   
  const myAction = async (UserName, columnSelector,currentNode) => {
    await this.knex(tableName)
      .where('Name' , ' = ' , UserName)
      //the where condition that allows you to access the desried data entry. 
      .update(columnSelector,currentNode)
      //The update will take in the column chosen, in this case the column that stores the node. 
      //Second parameter will be the value you want to change it to, this should be the current node. 
  }

  return myAction(args.UserName, args.columnSelector , args.currentNode)

  /** Your code ends here */
}

