export const asBytes = (size: string) => {
  if (typeof size === 'number') {
    return size
  }

  size = typeof size === 'string' ? size : '0'

  const matches = size
    .replace(',', '.')
    .toLowerCase()
    .match(/(\d+\.?\d{0,})\s{0,}(mb|gb|pt|kb|b)?/i)

  if (!matches || !matches.length) {
    return 0
  }

  /**/ if (matches[2] === 'b') {
    return Number(matches[1]) * Math.pow(1024, 0)
  } else if (matches[2] === 'kb') {
    return Number(matches[1]) * Math.pow(1024, 1)
  } else if (matches[2] === 'mb') {
    return Number(matches[1]) * Math.pow(1024, 2)
  } else if (matches[2] === 'gb') {
    return Number(matches[1]) * Math.pow(1024, 3)
  } else if (matches[2] === 'tb') {
    return Number(matches[1]) * Math.pow(1024, 4)
  }

  return Number(matches[1])
}
