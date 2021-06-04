export class DownloadTranscriptButton extends React.Component {
  onClick = () => {
    this.props.store.downloadConversation()
  }

  render() {
    return (
      <button className="CustomDownloadTranscriptButton" onClick={this.onClick}>
        Download Conversation Transcript
      </button>
    )
  }
}
