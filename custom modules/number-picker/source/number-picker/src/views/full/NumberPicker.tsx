import { Button, FormGroup, Checkbox, NumericInput, InputGroup, Tabs, Tab } from '@blueprintjs/core'
// @ts-ignore
import ContentPickerWidget from 'botpress/content-picker'
import _ from 'lodash'
import { customAlphabet } from 'nanoid'
import React, { useState, FC, useEffect } from 'react'
import { NumberPickerProps } from '../../backend/numberPicker'
import { SkillProps } from './typings'

export const NumberPicker: FC<SkillProps<NumberPickerProps>> = ({ initialData, onDataChanged, onValidChanged }) => {
  const [minValue, setMinValue] = useState(undefined)
  const [maxValue, setMaxValue] = useState(undefined)
  const [retries, setRetries] = useState(1)
  const [questionId, setQuestionId] = useState(undefined)
  const [varName, setVarName] = useState('extractedNumber')
  const [onInvalidContentId, setOnInvalidContentId] = useState('')
  const [showExit, setShowExit] = useState(false)
  const [roundOutput, setRoundOutput] = useState(true)
  const [sendPicker, setSendPicker] = useState(false)
  const [randomId, setRandomId] = useState(customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)())

  useEffect(() => {
    if (_.isEmpty(initialData)) {
      return
    }

    setMinValue(initialData.minValue)
    setMaxValue(initialData.maxValue)
    setRetries(initialData.retries)
    setQuestionId(initialData.questionId)
    setVarName(initialData.varName)
    setOnInvalidContentId(initialData.onInvalidContentId)
    setShowExit(initialData.showExit)
    setRoundOutput(initialData.roundOutput)
    setRandomId(initialData.randomId)
    setSendPicker(initialData.sendPicker)
  }, [])

  useEffect(() => {
    onDataChanged({
      minValue,
      maxValue,
      retries,
      questionId,
      varName,
      randomId,
      onInvalidContentId,
      showExit,
      roundOutput,
      sendPicker
    })

    const isValid = questionId !== undefined && varName !== undefined
    onValidChanged(isValid)
  }, [
    minValue,
    maxValue,
    retries,
    questionId,
    varName,
    onInvalidContentId,
    showExit,
    roundOutput,
    randomId,
    sendPicker
  ])

  return (
    <div>
      <Tabs id="skill-tab">
        <Tab
          id="basic"
          title="Basic"
          panel={
            <div>
              <FormGroup label="Question to ask *">
                <ContentPickerWidget
                  itemId={questionId}
                  onChange={item => setQuestionId(item.id)}
                  placeholder="Pick the question to ask to the user"
                />
              </FormGroup>

              <FormGroup label="On invalid answer, say this">
                <ContentPickerWidget
                  itemId={onInvalidContentId}
                  onChange={item => setOnInvalidContentId(item.id)}
                  placeholder="Send this when its an invalid answer"
                />
              </FormGroup>

              <FormGroup
                label="Name of the temp variable to store the number *"
                helperText={`The extracted value will be stored in {{temp.${varName}}}`}
              >
                <InputGroup id="variableName" value={varName} onChange={e => setVarName(e.currentTarget.value)} />
              </FormGroup>

              <FormGroup label="Minimum value" helperText="Can be empty, a number or a variable, ex: {{temp.minValue}}">
                <InputGroup onChange={e => setMinValue(e.currentTarget.value)} value={minValue} placeholder="0" />
              </FormGroup>

              <FormGroup label="Maximum value" helperText="Can be empty, a number or a variable, ex: {{temp.maxValue}}">
                <InputGroup onChange={e => setMaxValue(e.currentTarget.value)} value={maxValue} placeholder="100" />
              </FormGroup>

              <Checkbox
                checked={showExit}
                onChange={el => setShowExit(el.currentTarget.checked)}
                label="Suggest button to abort prompt"
              />

              <Checkbox
                checked={sendPicker}
                onChange={el => setSendPicker(el.currentTarget.checked)}
                label="Send a number picker component"
              />
            </div>
          }
        />

        <Tab
          id="advanced"
          title="Advanced"
          panel={
            <div>
              <Checkbox
                checked={roundOutput}
                onChange={el => setRoundOutput(el.currentTarget.checked)}
                label="Round the extracted value"
              />

              <Checkbox
                checked={showExit}
                onChange={el => setShowExit(el.currentTarget.checked)}
                label="Suggest button to abort prompt"
              />

              <FormGroup label="Max number of retries">
                <NumericInput
                  id="inputMaxRetries"
                  min={0}
                  max={10}
                  onValueChange={value => setRetries(value)}
                  value={retries}
                />
              </FormGroup>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
