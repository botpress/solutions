const base = require('./_base')
const utils = require('./_utils')

function renderElement(data, channel) {
  return {
    type: 'custom',
    module: 'extended-choice-skill',
    component: 'QuickReplies',
    ...data
  }
}

module.exports = {
  id: 'extended-choice-skill',
  group: 'Custom',
  title: 'module.extended-choice-skill.title',

  jsonSchema: {
    description: 'module.builtin.types.singleChoice.description',
    type: 'object',
    required: ['choices'],
    properties: {
      image: {
        type: 'string',
        $subtype: 'image',
        $filter: '.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*',
        title: 'module.builtin.types.image.title'
      },
      text: {
        type: 'string',
        title: 'message'
      },
      isDropdown: {
        type: 'boolean',
        title: 'Show as a dropdown'
      },
      dropdownPlaceholder: {
        type: 'string',
        title: 'Dropdown placeholder',
        default: 'Select...'
      },
      choices: {
        type: 'array',
        title: 'module.builtin.types.singleChoice.choice',
        minItems: 1,
        maxItems: 10,
        items: {
          type: 'object',
          required: ['title', 'value'],
          properties: {
            title: {
              description: 'module.builtin.types.singleChoice.itemTitle',
              type: 'string',
              title: 'Message'
            },
            value: {
              description: 'module.builtin.types.singleChoice.itemValue',
              type: 'string',
              title: 'Value'
            }
          }
        }
      },
      ...base.useMarkdown,
      disableFreeText: {
        type: 'boolean',
        title: 'module.builtin.disableFreeText',
        default: false
      },
      ...base.typingIndicators
    }
  },

  uiSchema: {
    text: {
      'ui:field': 'i18n_field',
      $subtype: 'textarea'
    },
    choices: {
      'ui:field': 'i18n_array'
    }
  },
  computePreviewText: formData => {
    let imagePrev = ''
    if (!formData.image) {
      const link = utils.formatURL(formData.BOT_URL, formData.image)
      const title = formData.title ? ' | ' + formData.title : ''

      if (utils.isUrl(link)) {
        const fileName = utils.extractFileName(formData.image)
        imagePrev = `Image: [![${formData.title || ''}](<${link}>)](<${link}>) - (${fileName}) ${title}`
      } else {
        imagePrev = `Expression: ${link}${title}`
      }
    }

    return formData.choices && formData.text && `${imagePrev} Choices (${formData.choices.length}) ${formData.text}`
  },
  renderElement: renderElement,
  hidden: true
}
