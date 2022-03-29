import { FormGroup, Checkbox, InputGroup, Tabs, Tab, TextArea, Intent } from '@blueprintjs/core'
import _, { isDate } from 'lodash'
import React, { useState, FC, useEffect } from 'react'
import { SkillProps } from './typings'

interface DatePickerProps {
  isDateRange: boolean
  isMinToday: boolean
  configJson?: string
}

export const DatePicker: FC<SkillProps<DatePickerProps>> = ({ onValidChanged, initialData, onDataChanged }) => {
  const [isDateRange, setDateRange] = useState(false)
  const [isMinToday, setMinToday] = useState(false)
  const [configJson, setConfigJson] = useState('')
  const [isJsonValid, setJsonValid] = useState(true)

  useEffect(() => {
    if (!_.isEmpty(initialData)) {
      setDateRange(initialData.isDateRange)
      setMinToday(initialData.isMinToday)
      setConfigJson(initialData.configJson)
    }
  }, [])

  const validateJson = () => {
    if (!configJson) {
      setJsonValid(true)
      return
    }

    try {
      JSON.parse(configJson)
      setJsonValid(true)
    } catch (err) {
      console.error(err)
      setJsonValid(false)
    }
  }

  useEffect(() => {
    onDataChanged({ isDateRange, isMinToday, configJson })
    onValidChanged(isJsonValid)
  }, [isDateRange, isMinToday, configJson, isJsonValid])

  return (
    <div>
      <Tabs id="skill-tab">
        <Tab
          id="basic"
          title="Basic"
          panel={
            <div>
              <Checkbox
                checked={isDateRange}
                onChange={el => setDateRange(el.currentTarget.checked)}
                label="User can select a range of dates"
              />

              <Checkbox
                checked={isMinToday}
                onChange={el => setMinToday(el.currentTarget.checked)}
                label="Today is the minimal date a user can pick"
              />

              <FormGroup
                label="Using dates"
                helperText={`Once a selection is made, the date is stored in ${
                  isDateRange ? '{{temp.startDate}} and {{temp.endDate}}' : '{{temp.startDate}}'
                }`}
              >
                <div></div>
              </FormGroup>
            </div>
          }
        />

        <Tab
          id="advanced"
          title="Advanced"
          panel={
            <div>
              <FormGroup
                label="Additional configuration"
                helperText={
                  <span>
                    Since there are a lot of possible configurations for the date picker, this field can contain a JSON
                    string that will be passed to the BlueprinJS' DatePicker to customize it.
                    <a href="https://blueprintjs.com/docs/#datetime" target="_blank">
                      See BlueprintJS documentation
                    </a>
                  </span>
                }
              >
                <TextArea
                  rows={3}
                  small
                  fill
                  intent={isJsonValid ? Intent.NONE : Intent.DANGER}
                  onChange={e => setConfigJson(e.currentTarget.value)}
                  value={configJson}
                  onBlur={e => validateJson()}
                  placeholder={'{\n  "highlightCurrentDay": false\n}'}
                />
              </FormGroup>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
