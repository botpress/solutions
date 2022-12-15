export class HideChat extends React.Component {
  componentDidMount() {
    const {
      store: { composer },
      hidden,
      isBotMessage,
      isLastGroup,
      isLastOfGroup
    } = this.props

    if (isBotMessage && ( isLastGroup || isLastOfGroup )) {
      composer.setHidden(hidden)
    }
  }

  render() {
    return null
  }
}
