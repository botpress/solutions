/**
 * @hidden true
 */

const key = args.randomId ? `skill-number-picker-invalid-count-${args.randomId}` : `skill-number-picker-invalid-count`
const value = (temp[key] || 0) + 1
temp[key] = value
