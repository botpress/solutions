  /**
   * Sets the value of an Nth level field on an object.
   * @title Set nested value
   * @category Custom
   * @author Botpress
   * @param {string} scope - either temp, session, or user
   * @param {string} key - The field's directory, separated with dots like "data.response.field1"
   * @param {any} value - What to set the final value to
   */
  const setNestedValue = (scope, key, value) => {
    const inputKeys = key.split('.')
    let movingKey = event.state[scope]
    for (let i = 0; i < inputKeys.length; i++) {
      const currentKey = inputKeys[i]

      if (i === inputKeys.length - 1) {
        console.log(value)
        movingKey[currentKey] = value
        return
      }
      console.log(currentKey)
      if (!movingKey[currentKey]) {
        movingKey[currentKey] = {}
      }

      movingKey = movingKey[currentKey]
    }
  }
  return setNestedValue(args.scope, args.key, args.value)
