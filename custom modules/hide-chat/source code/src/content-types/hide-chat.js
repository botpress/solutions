function render(data) {
  return [
    {
      type: 'custom',
      module: 'hide-chat',
      component: 'HideChat',
      hidden: data.hidden
    }
  ]
}

function renderElement(data, channel) {
  if (channel === 'web' || channel === 'api') {
    return render(data)
  }

  return [] // TODO
}

module.exports = {
  id: 'custom_hide-chat',
  group: 'Hide Chat',
  title: 'Hide Chat',
  jsonSchema: {
    description: 'Hide/Unhide chat',
    type: 'object',
    required: [],
    properties: {
      hidden: {
        type: 'boolean',
        title: 'Hidden',
        default: false
      }
    }
  },
  uiSchema: {},
  computePreviewText: formData => 'Hide Chat: ' + ( formData.hidden ? 'Yes' : 'No' ),
  renderElement: renderElement
}
