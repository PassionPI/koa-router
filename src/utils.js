const PATH = require('path')

module.exports = {
  attribute: (prefix, path, method) => `${PATH.join(prefix, path)}*.*${method.toUpperCase()}`,

  isString: str => {
    if (typeof str !== 'string') throw new Error(`${str} is not String!`)
  },
  
  isFunction: fn => {
    if (typeof fn !== 'function') throw new Error(`${fn} is not Function!`)
  },
}