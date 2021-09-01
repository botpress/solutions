function hook(bp: typeof sdk, event: sdk.IO.IncomingEvent) {
  /** Your code starts below */

//BEFORE INCOMING MIDDLEWARE
  
  const DATABASE_TABLE = 'JIO_DB'

  if(event.type === 'visit'){
    bp.logger.info('User Visit' , event)
    bp.database.insertAndRetrieve(DATABASE_TABLE, {
      TargetUsers: event.target
    })
    bp.logger.info('Target User has been inserte')
  } else {
    bp.database(DATABASE_TABLE).delete({
      TargetUsers: event.target
      //Deleting the Users that actually carried on with the conversation
    })
    bp.logger.info('User that is not registered as an event.target === visited has been deleted')
  }

  /** Your code ends here */
}
