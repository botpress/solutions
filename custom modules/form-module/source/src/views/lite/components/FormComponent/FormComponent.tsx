import _ from 'lodash'
import React, { FC, useState, useEffect, useCallback } from 'react'
import classes from './FormComponent.scss'

const deserialize = serializedJavascript => eval('(' + serializedJavascript + ')')

interface Schema {
  [key: string]: {
    fieldName: string
    validate: (value: any) => string | undefined
    autoComplete?: string
    dependsOn?: string[]
  }
}

interface Props {
  isLastGroup?: boolean
  isLastOfGroup?: boolean
  store: any
  onSendData: (data: any) => void
  config: {
    label?: string
    customCss?: string
    submitButton?: string
    schema: string
  }
}

export const FormComponent: FC<Props> = props => {
  const [schema, setSchema] = useState<Schema>()
  if (!(props.isLastGroup && props.isLastOfGroup)) {
    return <p>{'[A form was here!]'}</p>
  }

  const [values, setValues] = useState<any>({})
  const [errors, setErrors] = useState({})
  const [shouldShow, setShouldShow] = useState({})
  const [complete, setComplete] = useState(false)

  const setErrorsState = formFields => {
    const formErrors = {}
    Object.keys(schema).forEach(key => {
      const error = schema[key].validate(formFields[key])
      formErrors[key] = error //formFields[key].trim() === '' ? null : error
    })

    setErrors(formErrors)
    return formErrors
  }

  const setShowState = (formFields, errorState, debounceShow?: boolean) => {
    const showInputs = debounceShow || shouldShow

    Object.keys(schema).forEach(key => {
      if (showInputs[key]) {
        // Already been shown, do not remove it
        return
      }

      const dependencies = schema[key].dependsOn
      if (dependencies.length > 0) {
        // Check if there is an error for a dependency in the errorState
        const foundError = !!dependencies.find(key => {
          return !!errorState[key] || formFields[key].trim() === ''
        })

        showInputs[key] = !foundError
        return !foundError
      }
      showInputs[key] = true
    })

    setShouldShow({ ...showInputs })
  }

  useEffect(() => {
    setSchema(deserialize(props.config.schema))
  }, [])

  useEffect(() => {
    if (!schema) {
      return
    }
    props.store.composer.setLocked(true)
    props.store.composer.setHidden(true)

    const formFields = _.pick(props, Object.keys(schema))
    const errorState = setErrorsState(formFields)

    setShowState(formFields, errorState)
    setValues({ ...values, ...formFields })
  }, [schema])

  const delayedSetShowAndError = useCallback(
    _.debounce((values, errorState, shouldShow) => {
      setErrors(errorState)
      setShowState(values, errorState, shouldShow)
    }, 500),
    []
  )

  const handleChange = (key, event) => {
    const newValues = {
      ...values,
      [key]: event.target.value
    }

    const errorState = { ...errors }
    const error = schema[key].validate(newValues[key])
    errorState[key] = error

    setValues(newValues)
    delayedSetShowAndError(newValues, errorState, shouldShow)
    setComplete(!Object.values(errorState).some(x => x !== null && x !== false))
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.onSendData({ type: 'form-data', data: values })
    props.store.composer.setLocked(false)
    props.store.composer.setHidden(false)
  }

  const handleBlur = key => {
    const errorState = { ...errors }
    const error = schema[key].validate(values[key])
    errorState[key] = error
    setShowState(values, errorState)
    setErrors(errorState)
  }

  if (!schema) {
    return null
  }

  return (
    <form onSubmit={handleSubmit} className={classes.Form}>
      {/* <div className={classes.Logo}></div> */}
      <p className={classes.P}>{props.config?.label || ''}</p>
      {Object.entries(values).map(([key, value], index) => (
        <div className={classes.Group} style={!shouldShow[key] ? { height: '0px' } : {}} key={key}>
          <input
            autoFocus={index === 0}
            type="input"
            id="name"
            style={
              shouldShow[key]
                ? { opacity: '1' }
                : { opacity: '0', height: '0px', border: '0px', margin: '0px', cursor: 'default' }
            }
            className={classes.form__field}
            value={value as any}
            placeholder={schema[key].fieldName || ''}
            autoComplete={schema[key].autoComplete}
            onChange={event => {
              handleChange(key, event)
            }}
            onBlur={
              shouldShow[key]
                ? () => handleBlur(key)
                : e => {
                    e.preventDefault()
                  }
            }
          />
          <label
            style={
              shouldShow[key]
                ? { opacity: '1' }
                : { opacity: '0', height: '0px', border: '0px', margin: '0px', cursor: 'default' }
            }
            htmlFor="name"
            className={classes.form__label}
          >
            {schema[key].fieldName || ''}
          </label>
          {
            <div className={classes.Error} style={!errors[key] ? { height: '0px', opacity: '0' } : { opacity: '1' }}>
              {errors[key] && shouldShow[key] ? errors[key] : null}
            </div>
          }
        </div>
      ))}

      <button
        className={complete ? classes.Button : classes.ButtonDisabled}
        disabled={!complete}
        type="submit"
        value="Submit"
      >
        {props.config?.submitButton || 'Submit'}
      </button>
    </form>
  )
}
