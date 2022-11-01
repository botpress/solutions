export class HideChat extends React.Component {
  componentDidMount() {
    const {
      store: { composer },
      hidden,
      isBotMessage,
      isLastGroup
    } = this.props

    if (isBotMessage && isLastGroup) {
      composer.setHidden(hidden)
    }
  }

  render() {
    return null
  }
}
