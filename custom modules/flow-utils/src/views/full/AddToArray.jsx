import React from 'react'
import { Input, Label } from 'reactstrap'
import { Tabs, Tab, Row, Col, Alert } from 'react-bootstrap'
import Select from 'react-select'
import style from './style.scss'
import { BotpressTooltip } from 'botpress/tooltip'
import { LinkDocumentationProvider } from 'botpress/documentation'

const variableScopeOptions = [
  { label: 'Temp', value: 'temp' },
  { label: 'Session', value: 'session' },
  { label: 'Bot', value: 'bot' },
  { label: 'User', value: 'user' }
]

export class AddToArray extends React.Component {
  state = {
    variableScope: variableScopeOptions[0],
    variableName: 'array',
    value: '{ "prop": 1 }'
  }

  getInitialDataProps = propsKey => this.props.initialData[propsKey]
  getOrDefault = (propsKey, stateKey) => this.getInitialDataProps(propsKey) || this.state[stateKey]
  createSelectOption = data => (data ? { value: data, label: data } : undefined)

  componentDidMount() {
    if (this.props.initialData) {
      this.setState({
        variableScope: this.createSelectOption(this.getInitialDataProps('memory')) || this.state.variableScope,
        variableName: this.getOrDefault('variableName', 'variableName'),
        value: this.getOrDefault('value', 'value')
      })
    }
  }

  componentDidUpdate() {
    const { variableScope, variableName, value } = this.state
    if (variableScope && variableName && value != undefined) {
      const data = {
        variableScope: variableScope.value,
        variableName,
        value
      }

      this.props.onDataChanged && this.props.onDataChanged(data)
      this.props.onValidChanged && this.props.onValidChanged(true)
    }
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleVariableScopeChange = option => {
    this.setState({ variableScope: option })
  }

  render() {
    const paramsHelp = <LinkDocumentationProvider file="main/memory" />

    return (
      <div className={style.modalContent}>
        <Row className={style.section}>
          <Col md={12}>
            <Tabs id="requestOptionsTabs" defaultActiveKey="variable" animation={false}>
              <Tab eventKey="variable" title="Memory">
                <Alert className={style.note} bsStyle="info">
                  {'Select Variable Scope'}
                </Alert>
                <Col md={6}>
                  <Label>Variable Scope</Label>
                  {paramsHelp}
                  <Select
                    id="variableScopeSelect"
                    options={variableScopeOptions}
                    value={this.state.variableScope}
                    onChange={this.handleVariableScopeChange}
                  />
                </Col>
                <Col md={6}>
                  <Label>Variable</Label>
                  <BotpressTooltip message="What is the name of your array variable" />
                  <Input
                    type="text"
                    name="variableName"
                    value={this.state.variableName}
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
              <Tab eventKey="body" title="Value">
                <Alert className={style.note} bsStyle="info">
                  Value to be added in the array, use ${'{'}scope.variableName{'}'} to point to a variable
                </Alert>
                <Input
                  type="textarea"
                  rows="4"
                  id="value"
                  name="value"
                  value={this.state.value}
                  onChange={this.handleInputChange}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}
