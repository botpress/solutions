const base = require('./_base')

function renderElement(data, channel) {
  const events = []

  if (data.typing) {
    events.push({
      type: 'typing',
      value: data.typing
    })
  }

  return [
    ...events,
    {
      type: 'custom',
      module: 'calendly',
      component: 'CalendlyCard',
      hideEventTypeDetails: data.hideEventTypeDetails,
      hideLandingPageDetails: data.hideLandingPageDetails,
      height: data.height,
      width: data.width,
      url: data.url
    }
  ]
}

module.exports = {
  id: 'calendly-card',
  group: 'Calendly Module',
  title: 'Calendly Card',

  jsonSchema: {
    description: 'Calendly Card',
    type: 'object',
    required: ['width', 'height', 'url'],
    properties: {
      width: {
        type: 'string',
        title: 'Width of the Calendly Card (e.g. 320px or 50%)',
        default: "230px"
      },
      height: {
        type: 'string',
        title: 'Height of the Calendly Card (e.g. 500px)',
        default: "500px"
      },
      url: {
        type: 'string',
        title: 'The URL to your calendly'
      },
      hideEventTypeDetails: {
        type: 'boolean',
        title: 'hide event type details',
        default: true
      },
      hideLandingPageDetails: {
        type: 'boolean',
        title: 'hide landing page details',
        default: true
      },
      ...base.typingIndicators
    }
  },

  uiSchema: {
    url: {
      "ui:placeholder": "https://calendly.com/your_account/15min"
    }
  },
  computePreviewText: formData => `Calendly: ${formData.url}`,

  renderElement
}
