import React from 'react'
import { Row, Col, Label, Input } from 'reactstrap'
import { BotpressTooltip } from 'botpress/tooltip'
import Select from 'react-select'

import _ from 'lodash'

export class EndDelegation extends React.Component {
  componentDidMount() {
    this.props.onValidChanged && this.props.onValidChanged(true)
  }

  render() {
    return (
      <div>
        Place the skill on any of the sub bot's flows, where you want to end the delegation. There's no configuration
        needed, just drag and drop. <b>Important:</b> At least one message must be sent to the sub Bot in order to end
        the delegation.
      </div>
    )
  }
}
