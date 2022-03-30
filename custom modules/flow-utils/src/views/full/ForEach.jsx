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

export class ForEach extends React.Component {
  state = {
    variableScope: variableScopeOptions[0],
    variableName: 'array',
    indexVariableName: 'currentIndex',
    variableItemName: 'currentItem'
  }

  getInitialDataProps = propsKey => this.props.initialData[propsKey]
  getOrDefault = (propsKey, stateKey) => this.getInitialDataProps(propsKey) || this.state[stateKey]
  createSelectOption = data => (data ? { value: data, label: data } : undefined)

  componentDidMount() {
    if (this.props.initialData) {
      this.setState({
        variableScope: this.createSelectOption(this.getInitialDataProps('memory')) || this.state.variableScope,
        variableName: this.getOrDefault('variableName', 'variableName'),
        indexVariableName: this.getOrDefault('indexVariableName', 'indexVariableName'),
        variableItemName: this.getOrDefault('variableItemName', 'variableItemName')
      })
    }
  }

  componentDidUpdate() {
    const { variableScope, variableName, indexVariableName, variableItemName } = this.state
    if (variableScope && variableName && indexVariableName && variableItemName) {
      const data = {
        variableScope: variableScope.value,
        variableName,
        indexVariableName,
        variableItemName
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
              <Tab eventKey="variable" title="Iterable Variable">
                <Alert className={style.note} bsStyle="info">
                  {'Where is your Iterable Variable (objects or arrays)?'}
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
                  <Label>Iterable Variable Name</Label>
                  <BotpressTooltip message="What is the name of your iterable variable? eg: variable.iterable_variable_name (nested) or iterable_variable_name" />
                  <Input
                    type="text"
                    name="variableName"
                    value={this.state.variableName}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Tab>
              <Tab eventKey="advanced" title="Advanced">
                <Alert className={style.note} bsStyle="info">
                  {
                    'Advanced settings: Change these if you are going to use sequencial loops, otherwise you can stick with default values.'
                  }
                </Alert>
                <Col md={6}>
                  <Label>Variable Index Name</Label>
                  <BotpressTooltip message='Example value assigned to variable: { "index": 0, "currentKey": "objectProperty" }, currentKey will only be present in objects' />
                  <Input
                    type="text"
                    name="indexVariableName"
                    value={this.state.indexVariableName}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <Label>Variable Item Name</Label>
                  <BotpressTooltip message="This variable will contain your item value on each loop, transition to the ForEach node again to get the next value" />
                  <Input
                    type="text"
                    name="variableItemName"
                    value={this.state.variableItemName}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    )
  }
}
