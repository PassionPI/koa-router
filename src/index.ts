const dispatchTask = require('./dispatch')
const { methods } = require('./config')
const { isString, isFunction } = require('./utils')

interface Props {
  prefix: string
}

module.exports = class Router {
  prefix: string;
  routes: any;
  notFoundTasks: Function[];

  constructor(props: Props) {
    this.prefix = props.prefix || ''
    this.routes = {}
    this.notFoundTasks = []
    this.middleware = this.middleware.bind(this)

    methods.forEach((method: string) => this.routes[method] = {})
  }

  middleware(ctx: any, next: Function) {
    const { path, method } = ctx
    const tasks = this.routes[method][path]
    Array.isArray(tasks)
      ? dispatchTask(tasks)(ctx, next)
      : dispatchTask(this.notFoundTasks)(ctx, next)
  }

  notFound = (fn: Function) => {
    isFunction(fn)
    this.notFoundTasks.push(fn)
    return this
  }

  add = (method: string, path: string, fn: Function) => {
    isString(method), isString(path), isFunction(fn)
    const fullPath = `${this.prefix}${path}`
    const tasks = this.routes[method][fullPath]
    Array.isArray(tasks)
      ? tasks.push(fn)
      : this.routes[method][fullPath] = [fn]
    return this
  }

  all = (path: string, fn: Function) => {
    methods.forEach((method: string) => this.add(method, path, fn), this)
    return this
  }

  get    = (path: string, fn: Function) => this.add('GET', path, fn)
  del    = (path: string, fn: Function) => this.add('DEL', path, fn)
  put    = (path: string, fn: Function) => this.add('PUT', path, fn)
  post   = (path: string, fn: Function) => this.add('POST', path, fn)
  petch  = (path: string, fn: Function) => this.add('PETCH', path, fn)
  delete = (path: string, fn: Function) => this.add('DELETE', path, fn)

}

