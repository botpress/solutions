import {InlineWidget} from 'react-calendly'
import React from 'react'

export class CalendlyCard extends React.Component { //bp, hideEventTypeDetails, hideLandingPageDetails, height, width
  render() {
    console.log("URL", this.props.url)
    return (
      <div>
        <InlineWidget url={this.props.url} pageSettings={{ hideEventTypeDetails: this.props.hideEventTypeDetails, hideLandingPageDetails: this.props.hideLandingPageDetails }} styles={{ height: this.props.height, width: this.props.width}}/>
      </div>
    )
  }
}
