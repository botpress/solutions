import { lang } from 'botpress/shared'
import classnames from 'classnames'
import _ from 'lodash'
import React, { Component } from 'react'
import { OverlayTrigger, Tooltip, Table } from 'react-bootstrap'

import style from './parameters.scss'

export interface Parameter {
  [key: string]: string
}

export interface Arguments {
  [key: string]: Parameter
}

interface Definition {
  description: string
  default: ''
  type: 'Unknown'
  required: boolean
}

interface Props {
  value: Parameter
  definitions: Definition[]
  className?: string
  onChange: (args: Parameter) => void
}

interface State {
  arguments: Arguments
}

export default class ParametersTable extends Component<Props, State> {
  state: State

  constructor(props: Props) {
    super(props)
    this.state = { arguments: this.transformArguments(props.value) }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    this.setState({ arguments: this.transformArguments(nextProps.value) })
  }

  transformArguments(params: Parameter): Arguments {
    const valuesArray = [..._.map(params, (value, key) => ({ key, value })), { key: '', value: '' }]
    return _.fromPairs(valuesArray.map((el, i) => [i, el]))
  }

  transformArgumentsToObject(args: Arguments): Parameter {
    const obj = {}
    _.forEach(args, value => {
      obj[value.key] = value.value
    })
    return obj
  }

  onChanged() {
    setImmediate(() => {
      this.props.onChange && this.props.onChange(this.transformArgumentsToObject(this.state.arguments))
    })
  }

  render() {
    const renderRow = (id: string) => {
      const args = this.state.arguments

      const regenerateEmptyRowIfNeeded = () => {
        if (args[id].key === '' && args[id].value === '') {
          args[new Date().getTime()] = { key: '', value: '' }
        }
      }

      const deleteDuplicatedEmptyRows = () => {
        let count = 0
        for (const id in this.state.arguments) {
          const v = this.state.arguments[id]
          if (v.key === '' && v.value === '') {
            count++
          }
          if (count > 1) {
            const clone = { ...this.state.arguments }
            delete clone[id]
            return this.setState({
              arguments: clone
            })
          }
        }
      }

      const editKey = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.value !== '') {
          regenerateEmptyRowIfNeeded()
        } else {
          if (this.state.arguments[id].value === '') {
            setTimeout(deleteDuplicatedEmptyRows, 100)
          }
        }

        this.setState({
          arguments: { ...args, [id]: { key: evt.target.value, value: args[id].value } }
        })

        this.onChanged()
      }

      const editValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.value !== '') {
          regenerateEmptyRowIfNeeded()
        } else {
          if (this.state.arguments[id].key === '') {
            setTimeout(deleteDuplicatedEmptyRows, 100)
          }
        }

        this.setState({
          arguments: { ...args, [id]: { value: evt.target.value, key: args[id].key } }
        })

        this.onChanged()
      }

      const isKeyValid = args[id].key.length > 0 || !args[id].value.length

      const paramName = args[id].key
      const paramValue = args[id].value

      const definition = (_.find(this.props.definitions || [], { name: paramName }) || {
        required: false,
        description: ' No description ',
        default: '',
        type: 'Unknown'
      }) as Definition

      const tooltip = (
        <Tooltip id={`param-${paramName}`}>
          <strong>({definition.type}) </strong> {definition.description}
        </Tooltip>
      )

      const help = (
        <OverlayTrigger placement="bottom" overlay={tooltip}>
          <i className={'material-icons ' + style.keyTip}>help_outline</i>
        </OverlayTrigger>
      )

      const keyClass = classnames(style.key, { [style.invalid]: !isKeyValid, [style.mandatory]: definition.required })

      return (
        <tr key={id}>
          <td className={keyClass}>
            {help}
            <input type="text" disabled={!!definition.required} value={paramName} onChange={editKey} />
          </td>
          <td>
            <input value={paramValue} placeholder={definition.default} onChange={editValue} />
          </td>
        </tr>
      )
    }

    return (
      <Table className={classnames(style.table, this.props.className)}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{_.orderBy(_.keys(this.state.arguments), x => x).map(renderRow)}</tbody>
      </Table>
    )
  }
}
