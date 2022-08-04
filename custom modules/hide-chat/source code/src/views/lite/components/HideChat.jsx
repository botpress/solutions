export class HideChat extends React.Component {
  componentDidMount() {
    const {
      store: { composer },
      hidden,
      isBotMessage,
      isLastOfGroup
    } = this.props

    if (isBotMessage && isLastOfGroup) {
      composer.setHidden(hidden)
    }
  }

  render() {
    return null
  }
}
