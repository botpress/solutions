import { Button, InputGroup, ControlGroup } from '@blueprintjs/core'
import React, { useState } from 'react'
import en from '../../translations/en.json'
import fr from '../../translations/fr.json'
import './style.scss'

const Picker = ({ locale, minValue, maxValue, onCancel, onSubmit }) => {
  const [value, setValue] = useState(1)

  const updateValue = newValue => {
    if (newValue < minValue) {
      newValue = minValue
    } else if (newValue > maxValue) {
      newValue = maxValue
    }
    setValue(newValue)
  }

  const submit = () => {
    onSubmit(value)
  }

  const translate = key => (locale === 'fr' ? fr[key] : en[key])

  return (
    <div>
      <ControlGroup>
        <Button icon="minus" onClick={() => updateValue(value - 1)} />
        <InputGroup
          style={{ width: 50 }}
          type="number"
          value={value.toString()}
          onChange={e => updateValue(e.currentTarget.valueAsNumber)}
        />
        <Button icon="plus" onClick={() => updateValue(value + 1)} />
      </ControlGroup>
      <div style={{ display: 'flex', marginTop: 10, justifyContent: 'space-evenly' }}>
        <Button text={translate('cancel')} onClick={onCancel} />
        <Button text={translate('submit')} onClick={submit} />
      </div>
    </div>
  )
}

export default Picker
