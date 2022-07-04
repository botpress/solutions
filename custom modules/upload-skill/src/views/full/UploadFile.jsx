import React from 'react'
import { Row, Col, Label, Input } from 'reactstrap'
import { BotpressTooltip } from 'botpress/tooltip'
import ContentPickerWidget from 'botpress/content-picker'
import { customAlphabet } from 'nanoid'

import _ from 'lodash'

export class UploadFile extends React.Component {
  state = {
    randomId: customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)(),
    buttonText: undefined,
    description: undefined,
    message: undefined,
    reference: undefined,
    contentElement: undefined
  }

  componentDidMount() {
    this.setStateFromProps()
  }

  setStateFromProps = () => {
    const data = this.props.initialData

    if (data) {
      this.setState({
        contentElement: data.contentElement,
        reference: data.reference
      })
    }
  }

  componentDidUpdate() {
    if (this.isFormValid()) {
      this.props.onDataChanged && this.props.onDataChanged(this.state)
      this.props.onValidChanged && this.props.onValidChanged(true)
    }
  }

  isFormValid() {
    return !_.isEmpty(this.state.reference) && !_.isEmpty(this.state.contentElement)
  }

  handleContentChange = item => {
    this.setState({ contentElement: item.id })
  }

  render() {
    return (
      <div>
        <h5>Change the text</h5>

        <div>
          <ContentPickerWidget
            style={{ zIndex: 0 }}
            name="contentPicker"
            contentType="upload_file"
            id="contentPicker"
            itemId={this.state.contentElement}
            onChange={this.handleContentChange}
            placeholder="Pick content"
          />
        </div>
        <Row>
          <Col md={6}>
            <Label for="reference">Reference</Label>
            &nbsp;
            <BotpressTooltip message="Reference variable in the temp memory where the result will be stored" />
            <Input
              id="reference"
              name="reference"
              type="text"
              value={this.state.reference}
              placeholder="uploadedFile"
              onChange={event => this.setState({ reference: event.target.value })}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
