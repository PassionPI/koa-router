
module.exports = Object.freeze({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'DEL'],
  
  isString(str: string): void {
    if (typeof str !== 'string') throw new Error(`${str} is not String!`)
  },
  
  isFunction(fn: Function): void {
    if (typeof fn !== 'function') throw new Error(`${fn} is not Function!`)
  },
})