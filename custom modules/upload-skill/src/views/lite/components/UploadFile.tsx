import React, { Component } from 'react'
import { asBytes } from '../../../backend/utils'
import { FileInput } from './FileInput'

/**
 * Displays an array of button, and handle when they are clicked
 *
 * @param {object} buttons The list of buttons to display (object with a label and a payload)
 * @param {function} onSendData Called with the required payload to answer the quick reply
 * @param {function} onFileUpload This is called when a file is uploaded
 *
 * @return onSendData is called with the reply
 */
export class UploadFile extends Component<any> {
  handleFileUpload = async (event: any) => {
    if (!event.target.files) {
      return
    }

    let payload = {
      reference: this.props.reference,
      file: undefined,
      error: undefined
    }

    try {
      const { axios } = this.props.bp

      let file = event.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('botId', this.props.botId)
      formData.append('threadId', this.props.threadId)

      const { data } = await axios.post('/mod/upload-skill/upload', formData)
      if (!data.url) {
        const url = `/api/v1/bots/${this.props.botId}/mod/upload-skill-public/media/${data.id}`
        payload.file = {
          url,
          ...data
        }
      } else {
        payload.file = data
      }
    } catch (error) {
      payload.error = error.message
    }

    this.props.onSendData &&
      this.props.onSendData({
        type: 'uploadFile',
        payload
      })
  }

  renderKeyboard() {
    return (
      <button className={'bpw-button bpw-file-button'}>
        <FileInput
          name={'uploadField'}
          accept={this.props.allowedMimeTypes}
          className={'bpw-file-message'}
          placeholder={'placeHolder'}
          onFileChanged={this.handleFileUpload}
        />
        <span>{this.props.buttonText}</span>
      </button>
    )
  }

  render() {
    const kbd = <div className={'bpw-keyboard-quick_reply'}>{this.renderKeyboard()}</div>
    const Keyboard = this.props.keyboard

    return (
      <Keyboard.Prepend keyboard={kbd} visible={this.props.isLastGroup && this.props.isLastOfGroup}>
        {this.props.message}
      </Keyboard.Prepend>
    )
  }
}
