import dispatchTask from './dispatch'
import { isString, isFunction } from './utils'
import { MiddlewareFn, Routes, KoaCtx } from './interface'

class Router {
  static readonly methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'DEL']
  public constructor(prefix: string) {
    this.routes = {}
    this.prefix = prefix || ''
    Router.methods.forEach((method: string) => this.routes[method] = {})
  }
  public routes: Routes;
  public prefix: string;

  public add = (method: string, path: string, fn: MiddlewareFn): this => {
    isString(method), isString(path), isFunction(fn)
    const fullPath = `${this.prefix}${path}`
    const tasks = this.routes[method][fullPath]
    Array.isArray(tasks)
      ? tasks.push(fn)
      : this.routes[method][fullPath] = [fn]
    return this
  }

  public middleware = async (ctx: KoaCtx, next: MiddlewareFn): Promise<void> => {
    const { path, method } = ctx
    const tasks = this.routes[method][path]
    Array.isArray(tasks)
      ? await dispatchTask(tasks)(ctx, next)
      : await next()
  }

  public all = (path: string, fn: MiddlewareFn): this => {
    Router.methods.forEach((method: string) => this.add(method, path, fn), this)
    return this
  }

  public get    = (path: string, fn: MiddlewareFn): this => this.add('GET', path, fn)
  public del    = (path: string, fn: MiddlewareFn): this => this.add('DEL', path, fn)
  public put    = (path: string, fn: MiddlewareFn): this => this.add('PUT', path, fn)
  public post   = (path: string, fn: MiddlewareFn): this => this.add('POST', path, fn)
  public petch  = (path: string, fn: MiddlewareFn): this => this.add('PETCH', path, fn)
  public delete = (path: string, fn: MiddlewareFn): this => this.add('DELETE', path, fn)

}

export default Router
