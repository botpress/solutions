function action(bp: typeof sdk, event: sdk.IO.IncomingEvent, args: any, { user, temp, session } = event.state) {
  /** Your code starts below */

  /**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Mohsen
   * @param {string} first - User first name
   * @param {string} last  - User last name
   * @param {string} Node  - Current node in the flow
   */

  async function myAction(first, last, Node) {
    await bp.database.insertAndRetrieve('jio', {
      UserName: first,
      LastName: last,
      CurrentNode: Node

      //example of what could be inserted in the data table, entries will depend on what is being tracked.
    })
  }
  return myAction(args.first, args.last, args.Node)

  /** Your code ends here */
}
