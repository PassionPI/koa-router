export function isString(str: string): string {
  if (typeof str !== 'string') throw new Error(`${str} is not String!`)
  return str
}

export function isFunction(fn: Function): Function {
  if (typeof fn !== 'function') throw new Error(`${fn} is not Function!`)
  return fn
}

export function isKeyValArr(arr: [string, string][]): [string, string][] {
  if (Array.isArray(arr)) {
    arr.forEach(([key, val]) => {
      isString(key), isString(val)
    })
    return arr
  } else if (arr === undefined) {
    return []
  } else {
    throw new Error(`${arr} is not Array!`)
  }
}