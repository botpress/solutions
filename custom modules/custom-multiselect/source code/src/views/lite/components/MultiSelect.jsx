import React, { useState, useEffect } from 'react'

import './style.css'

function MultiSelect(props) {

  const { keyboard, isLastGroup, isLastOfGroup, onSendData } = props

  const [options, setOptions] = useState(null)

  useEffect(()=> {
    const options = []
    if(props.options) {
      for(let option of props.options) {
        options.push({ ...option, checked: false })
      }
      setOptions(options)
    }
  }, [])

  const buildText = () => {
    return options
      .filter(opt => opt.checked)
      .map(opt => opt.label)
      .join(', ')
  }

  return (
    options &&
    <keyboard.Prepend
      keyboard={
        <MultiSelectKeyboard
          options={options}
          onOptionsUpdated={opts => setOptions(opts)}
          canSubmit={options.some(opt => opt.checked)}
          onSubmit={() => onSendData({ type: 'text', text: buildText() })}
        />
      }
      visible={isLastGroup && isLastOfGroup}
    >
      { props.question}
    </keyboard.Prepend>
  )
}

const MultiSelectKeyboard = props => {
  const { options, onOptionsUpdated, canSubmit, onSubmit } = props
  return (
    <div className="multiselect">
      {options.map((opt, idx) => (
        <Option
          key={opt.label}
          label={opt.label}
          checked={opt.checked}
          onChange={() => {
            const copy = [...options]
            copy[idx] = { ...opt, checked: !opt.checked }
            onOptionsUpdated(copy)
          }}
        />
      ))}
      <button className="trigger" disabled={!canSubmit} onClick={e => onSubmit()}>
        Submit
      </button>
    </div>
  )
}

const Option = props => {
  const { label, checked, onChange } = props
  return (
    <label className="menu-item">
      {label}
      <span className="custom-checkbox">
        <input type="checkbox" checked={checked} onChange={e => onChange()}></input>
        <span className="checkbox">
          <span className="checkmark"></span>
        </span>
      </span>
    </label>
  )
}

export { MultiSelect }