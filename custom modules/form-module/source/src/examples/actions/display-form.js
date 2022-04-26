const serializer = require('serialize-javascript')

/**
 * Small description of your action
 * @title Render Custom Form
 * @category Form
 * @author Botpress
 * @param {string} firstName - An example string variable
 * @param {string} lastName - An example string variable
 * @param {string} phoneNumber - An example string variable
 * @param {string} businessEmail - An example string variable
 */
const myAction = async (firstName, lastName, phoneNumber, businessEmail) => {
  /** These default values can be specified in the action's configuration or left for the user to fill  */
  const defaultValues = {
    firstName,
    lastName,
    phoneNumber,
    businessEmail
  }

  /** A list of the fields and the validation function */
  const formSchema = {
    firstName: {
      fieldName: 'First Name',
      autoComplete: 'given-name',
      dependsOn: [],
      validate: value => {
        if (value.trim() === '') {
          return 'Required'
        }
        if (/[^a-zA-Z -]/.test(value)) {
          return 'Invalid characters'
        }
        if (value.trim().length < 3) {
          return 'First Name needs to be at least three characters'
        }
        return null
      }
    },
    lastName: {
      fieldName: 'Last Name',
      autoComplete: 'family-name',
      dependsOn: [],
      validate: value => {
        if (value.trim() === '') {
          return 'Required'
        }
        if (/[^a-zA-Z -]/.test(value)) {
          return 'Invalid characters'
        }
        if (value.trim().length < 3) {
          return 'Last Name needs to be at least three characters'
        }
        return null
      }
    },
    businessEmail: {
      fieldName: 'Business Email',
      autoComplete: 'email',
      dependsOn: ['firstName', 'lastName'],
      validate: value => {
        if (value.trim() === '') {
          return 'Required'
        }
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!emailPattern.test(String(value).toLowerCase())) {
          return 'Please enter a valid Business Email'
        }

        return null
      }
    },
    phoneNumber: {
      fieldName: 'Phone Number',
      autoComplete: 'tel',
      dependsOn: ['firstName', 'lastName'],
      validate: () => {
        return false
      }
    }
  }

  const payload = [
    {
      type: 'custom',
      module: 'form-module',
      component: 'FormComponent',
      config: {
        label: 'Please fill out the form below and someone from our sales team will get back to you shortly.',
        submitButton: 'Submit',
        schema: serializer(formSchema)
      },
      ...defaultValues
    }
  ]

  bp.events.replyToEvent(event, payload, event.id)
}

return myAction(args.firstName, args.lastName, args.phoneNumber, args.businessEmail)
