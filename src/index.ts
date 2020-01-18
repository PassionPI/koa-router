import dispatchTask from './dispatch'
import { isString, isFunction } from './utils'
import { MiddleWareFn, Routes, KoaCtx } from './interface'

class Router {
  static readonly methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'DEL']
  public constructor(prefix: string) {
    this.routes = {}
    this.prefix = prefix || ''
    this.notFoundTasks = []
    Router.methods.forEach((method: string) => this.routes[method] = {})
  }
  private routes: Routes;
  private prefix: string;
  private notFoundTasks: MiddleWareFn[];

  private add = (method: string, path: string, fn: MiddleWareFn): this => {
    isString(method), isString(path), isFunction(fn)
    const fullPath = `${this.prefix}${path}`
    const tasks = this.routes[method][fullPath]
    Array.isArray(tasks)
      ? tasks.push(fn)
      : this.routes[method][fullPath] = [fn]
    return this
  }

  public middleware = (ctx: KoaCtx, next: MiddleWareFn): void => {
    const { path, method } = ctx
    const tasks = this.routes[method][path]
    Array.isArray(tasks)
      ? dispatchTask(tasks)(ctx, next)
      : dispatchTask(this.notFoundTasks)(ctx, next)
  }

  public notFound = (fn: MiddleWareFn): this => {
    isFunction(fn)
    this.notFoundTasks.push(fn)
    return this
  }

  public all = (path: string, fn: MiddleWareFn): this => {
    Router.methods.forEach((method: string) => this.add(method, path, fn), this)
    return this
  }

  public get    = (path: string, fn: MiddleWareFn): this => this.add('GET', path, fn)
  public del    = (path: string, fn: MiddleWareFn): this => this.add('DEL', path, fn)
  public put    = (path: string, fn: MiddleWareFn): this => this.add('PUT', path, fn)
  public post   = (path: string, fn: MiddleWareFn): this => this.add('POST', path, fn)
  public petch  = (path: string, fn: MiddleWareFn): this => this.add('PETCH', path, fn)
  public delete = (path: string, fn: MiddleWareFn): this => this.add('DELETE', path, fn)

}

export default Router
