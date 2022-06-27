import React from 'react'
import { Row, Col, Label, Input } from 'reactstrap'
import { BotpressTooltip } from 'botpress/tooltip'
import Select from 'react-select'

import _ from 'lodash'

export class Delegate extends React.Component {
  state = {
    text: undefined,
    bots: undefined,
    intents: [],
    intent: undefined
  }

  componentDidMount() {
    this.fetchIntents().then(() => this.setStateFromProps())
  }

  setStateFromProps = () => {
    const data = this.props.initialData

    if (data) {
      this.setState({
        text: data.text,
        bots: data.bots,
        intent: data.intent
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
    return !_.isEmpty(this.state.bots) && !_.isEmpty(this.state.intent)
  }

  fetchIntents = () => {
    return this.props.bp.axios.get('/nlu/intents').then(({ data }) => {
      const intents = data.filter(x => !x.name.startsWith('__qna'))
      this.setState({ intents })
    })
  }

  render() {
    const intentsOptions = this.state.intents.map(intent => {
      return { value: intent.name, label: intent.name }
    })
    return (
      <div>
        <Row style={{ paddingTop: 5 }}>
          <Col md={6}>
            <Label for="bots">Bots</Label>
            &nbsp;
            <BotpressTooltip
              message='Comma separated list of Bot Ids. If only 1 bot Id is suppled, this will be a point to point communication and confidence will be ignored.
             **Important:** IF there are multiple bots, only bots with a detected intent other than "none" will be considered'
            />
            <Input
              id="bots"
              name="bots"
              type="text"
              value={this.state.bots}
              placeholder="Bots ids"
              onChange={event => this.setState({ bots: event.target.value })}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 5 }}>
          <Col md={6}>
            <Label for="text">Text (Optional)</Label>
            &nbsp;
            <BotpressTooltip message="If set, Text to be used as the first message when initiating a session with a sub bot rather than using event.preview" />
            <Input
              id="text"
              name="text"
              type="text"
              value={this.state.text}
              placeholder="Hi"
              onChange={event => this.setState({ text: event.target.value })}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 5 }}>
          <Col md={5}>
            <Label>Exit intent</Label>
            &nbsp;
            <BotpressTooltip message="Intent to be used by the delegator bot to force the delegation to exit." />
            <Select
              id="intent"
              name="intent"
              isSearchable
              placeholder="Choose an intent or type to search"
              onChange={event => this.setState({ intent: { value: event.value, label: event.label } })}
              value={this.state.intent}
              options={intentsOptions}
            />
          </Col>
        </Row>
      </div>
    )
  }
}
