import React, { Component } from 'react'

import { Button } from './Button'

/**
 * Displays an array of button, and handle when they are clicked
 *
 * @param {object} buttons The list of buttons to display (object with a label and a payload)
 * @param {function} onSendData Called with the required payload to answer the quick reply
 * @param {function} onFileUpload This is called when a file is uploaded
 *
 * @return onSendData is called with the reply
 */
export class QuickReplies extends Component<any> {
  handleButtonClicked = (title, payload) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.props.onSendData?.({
      type: 'quick_reply',
      text: title,
      payload
    })
    this.props.store.composer.setLocked(false)
  }

  renderKeyboard(buttons: any[]) {
    return buttons.map((btn, idx) => {
      if (Array.isArray(btn)) {
        return <div>{this.renderKeyboard(btn)}</div>
      } else {
        return (
          <Button
            key={idx}
            label={btn.label || btn.title}
            payload={btn.payload}
            preventDoubleClick={!btn.allowMultipleClick}
            onButtonClick={this.handleButtonClicked}
            onFileUpload={this.props.onFileUpload}
          />
        )
      }
    })
  }

  render() {
    const buttons = this.props.choices || this.props.quick_replies
    const kbd = <div className={'bpw-keyboard-quick_reply'}>{buttons && this.renderKeyboard(buttons)}</div>
    const Keyboard = this.props.keyboard

    return (
      <Keyboard.Prepend keyboard={kbd} visible={this.props.isLastGroup && this.props.isLastOfGroup}>
        <div className="bpw-bubble-image">
          {this.props.image && (
            <a href={this.props.image} target={'_blank'}>
              <img src={this.props.image} title={''} />
            </a>
          )}
          {this.props.text}
        </div>
      </Keyboard.Prepend>
    )
  }
}
