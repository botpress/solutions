export class HideChat extends React.Component {

  componentDidMount() {
    const { store: { currentMessages, composer }, hidden, incomingEventId } = this.props
    const indexAtual = currentMessages.findIndex( message => 
      message && 
      message.incomingEventId == incomingEventId &&
      message.payload && message.payload.component == "HideChat"
    )
    const lastIndexReverse = currentMessages.reverse().findIndex( 
      message => message && message.payload && message.payload.component == "HideChat"
    )
    const count = currentMessages.length - 1
    const finalIndex = lastIndexReverse >= 0 ? count - lastIndexReverse : lastIndexReverse;
    console.log({props: this.props, indexAtual, finalIndex, incomingEventId: incomingEventId })
    if(finalIndex == indexAtual || finalIndex == indexAtual + 1 ) {
      composer.setHidden(hidden)
    }
  }

  render() { return null }
}
