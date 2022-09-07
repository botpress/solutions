import React from 'react'


export class MyBeforeContainer extends React.Component {
  interval

  componentDidMount() {
    // We need to wait for the current conversation to be loaded before cleaning it
    this.interval = setInterval(() => {
      if(this.props.store.currentConversation) {
        this.props.store.clearMessages()
        this.interval && clearInterval(this.interval)
      }
    }, 50)
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval)
  }

  render() {
    return null
  }
}
