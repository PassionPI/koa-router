export function isString(str: string): void {
  if (typeof str !== 'string') throw new Error(`${str} is not String!`)
}

export function isFunction(fn: Function): void {
  if (typeof fn !== 'function') throw new Error(`${fn} is not Function!`)
}