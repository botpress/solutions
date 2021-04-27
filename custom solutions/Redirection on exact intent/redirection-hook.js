function hook(bp: typeof sdk, event: sdk.IO.IncomingEvent) {
    /** Your code starts below */
  
  
    /** Configuration **/
    const redirectionConfig = [
      { entity: 'activite', to: { flow: 'inscription_activite', node: 'entry' } },
      { entity: 'contact', to: { flow: 'contact', node: 'entry' } },
      { entity: 'methode_paiement', to: { flow: 'payer', node: 'entry' } }
    ]
    /**
     * fonction redirecting the user if an exact entity is sent to the bot.
     * 
     * 
     **/
    async function handle_redirection() {
      // Check if only 1 entity is present in the message
      if (event.nlu.entities.length === 1) {
        let msgLength = event.preview.length
        let entityLength = event.nlu.entities[0].meta.end - event.nlu.entities[0].meta.start
        // Check if the lenght of this entity is equal to the lenght of the message.
        if (msgLength === entityLength) {
          const intentRedirect = redirectionConfig.find(
            intentRedirect => intentRedirect.entity == event.nlu.entities[0].name
          )
          //redirecting the user
          const sessionId = bp.dialog.createId(event)
          await bp.dialog.jumpTo(sessionId, event, intentRedirect.to.flow + '.flow.json', 'entry')
          await bp.dialog.processEvent(sessionId, event)
        }
      }
    }
    return handle_redirection()
  
    /** Your code ends here */
  }