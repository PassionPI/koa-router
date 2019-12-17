const dispatchTask = require('./dispatch');
const { isString, isFunction, attribute } = require('./utils')

class Router {
  static methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'DEL']
  constructor(props = {}) {
    this.prefix = props.prefix || ''
    this.routes = {}
    this.notFoundQueue = []
    this.middleware = this.middleware.bind(this)
  }

  middleware(ctx, next) {
    const { path, method } = ctx
    const routeQueue = this.routes[attribute(this.prefix, path, method)]
    Array.isArray(routeQueue)
      ? dispatchTask(routeQueue)(ctx, next)
      : dispatchTask(this.notFoundQueue)(ctx, next)
  }

  notFound = (fn) => {
    isFunction(fn)
    this.notFoundQueue.push(fn)
    return this
  }

  add = (method, path, fn) => {
    isString(method), isString(path), isFunction(fn)
    const routeQueue = this.routes[attribute(this.prefix, path, method)]
    Array.isArray(routeQueue)
      ? routeQueue.push(fn)
      : this.routes[attribute(this.prefix, path, method)] = [fn]
    return this
  }


  all = (path, fn) => Router.methods.forEach(method => this.add(method, path, fn), this)
  get = (path, fn) => this.add('GET', path, fn)
  del = (path, fn) => this.add('DEL', path, fn)
  put = (path, fn) => this.add('PUT', path, fn)
  post = (path, fn) => this.add('POST', path, fn)
  petch = (path, fn) => this.add('PETCH', path, fn)
  delete = (path, fn) => this.add('DELETE', path, fn)

}

module.exports = Router
