const base = require('./_base')
const utils = require('./_utils')

function renderElement(data, channel) {
  return {
    type: 'custom',
    module: 'upload-skill',
    component: 'UploadFile',
    ...data
  }
}

module.exports = {
  id: 'upload_file',
  group: 'upload-skill',
  title: 'module.builtin.types.file.title',

  jsonSchema: {
    description: 'module.builtin.types.file.description',
    type: 'object',
    required: ['buttonText'],
    properties: {
      message: {
        type: 'string',
        title: 'Description message'
      },
      buttonText: {
        type: 'string',
        title: 'Text of the file input button'
      },
      ...base.typingIndicators
    }
  },

  uiSchema: {
    buttonText: {
      'ui:field': 'i18n_field'
    },
    description: {
      'ui:field': 'i18n_field'
    },
    message: {
      'ui:field': 'i18n_field'
    }
  },

  computePreviewText: formData => {
    return `File Upload`
  },

  renderElement: renderElement
}
