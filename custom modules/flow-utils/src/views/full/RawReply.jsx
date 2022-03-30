import React from 'react'
import { Input, Label } from 'reactstrap'
import { Tabs, Tab, Row, Col, Alert } from 'react-bootstrap'
import style from './style.scss'
import { BotpressTooltip } from 'botpress/tooltip'
import ArgumentsList from './lib/ArgumentsList'

export class RawReply extends React.Component {
  state = {
    contentType: 'builtin_text',
    payload: { text: '""', typing: 'true' }
  }

  getInitialDataProps = propsKey => this.props.initialData[propsKey]
  getOrDefault = (propsKey, stateKey) => this.getInitialDataProps(propsKey) || this.state[stateKey]
  createSelectOption = data => (data ? { value: data, label: data } : undefined)

  componentDidMount() {
    if (this.props.initialData) {
      this.setState({
        contentType: this.getOrDefault('contentType', 'contentType'),
        payload: this.getOrDefault('payload', 'payload')
      })
    }
  }

  componentDidUpdate() {
    const { contentType, payload } = this.state
    if (contentType && contentType.length && payload && payload != undefined) {
      const data = {
        contentType,
        payload
      }

      this.props.onDataChanged && this.props.onDataChanged(data)
      this.props.onValidChanged && this.props.onValidChanged(true)
    }
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className={style.modalContent}>
        <Row className={style.section}>
          <Col md={12}>
            <Tabs id="requestOptionsTabs" defaultActiveKey="variable" animation={false}>
              <Tab eventKey="variable" title="Memory">
                <Col md={6}>
                  <Label>Content Type</Label>
                  <BotpressTooltip message="What is the name of your array variable" />
                  <Input
                    type="text"
                    name="contentType"
                    value={this.state.contentType}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Tab>
            </Tabs>
          </Col>
        </Row>
        <Row className={style.section}>
          <Col md={12}>
            <Tabs id="requestOptionsTabs" defaultActiveKey="body" animation={false}>
              <Tab eventKey="body" title="Body">
                <Alert className={style.note} bsStyle="info">
                  Payload
                </Alert>
                <ArgumentsList
                  value={this.state.payload}
                  onChange={props => {
                    this.setState({ payload: props })
                  }}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}
