import React, { useState } from 'react'
import { Row, Col, Label, Input } from 'reactstrap'
import { BotpressTooltip } from 'botpress/tooltip'
import ContentPickerWidget from 'botpress/content-picker'
import _ from 'lodash'
import { Checkbox } from '@blueprintjs/core'
import { lang } from 'botpress/shared'
export class InputEmail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: undefined,
      reference: undefined,
      contentElement: undefined,
      multiple: false
    }
  }

  componentDidMount() {
    this.setStateFromProps()
  }

  setStateFromProps = () => {
    const data = this.props.initialData

    if (data) {
      this.setState({
        contentElement: data.contentElement,
        reference: data.reference,
        multiple: data.multiple
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
        <Row style={{ paddingTop: 5 }}>
          <Col md={6}>
            <Label for="reference">{lang.tr('module.validate-email.changeText')}</Label>
            &nbsp;
            <BotpressTooltip message={lang.tr('module.validate-email.contentTitle')} />
          </Col>
        </Row>
        <div>
          <ContentPickerWidget
            style={{ zIndex: 0 }}
            name="contentPicker"
            contentType="builtin_text"
            id="contentPicker"
            itemId={this.state.contentElement}
            onChange={this.handleContentChange}
            placeholder={lang.tr('module.validate-email.pickContent')}
          />
        </div>
        <Row style={{ paddingTop: 5 }}>
          <Col md={6}>
            <Label for="reference">{lang.tr('module.validate-email.referenceTitle')}</Label>
            &nbsp;
            <BotpressTooltip message={lang.tr('module.validate-email.reference')} />
            <Input
              id="reference"
              name="reference"
              type="text"
              value={this.state.reference}
              placeholder={lang.tr('module.validate-email.referenceTitle')}
              onChange={event => this.setState({ reference: event.target.value })}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 5 }}>
          <Col md={6} style={{ display: 'flex' }}>
            <div>
              <Checkbox
                id="multiple"
                name="multiple"
                checked={this.state.multiple}
                onClick={event => {
                  const { checked } = event.target
                  this.setState({ multiple: checked })
                }}
              />
            </div>
            <Label for="reference">{lang.tr('module.validate-email.multipleTitle')}</Label>
            &nbsp;
            <BotpressTooltip message={lang.tr('module.validate-email.multiple')} />
          </Col>
        </Row>
        <Col md={6}>
          <Row style={{ paddingTop: 5 }}>
            &nbsp;
            <Label for="reference">{lang.tr('module.validate-email.train')}</Label>
            &nbsp;
          </Row>
        </Col>
      </div>
    )
  }
}
