import dispatchTask from './dispatch'
import { isString, isFunction, isKeyValArr } from './utils'
import { Props, defaultProps, MiddlewareFn, Routes, KoaCtx } from './interface'

class Router {
  static readonly methods: string[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'DEL']
  public constructor(props: Props = defaultProps) {
    this.routes = {}
    this.prefix = props.prefix || ''
    this.headers = isKeyValArr(props.headers)
    this.middleware = this.middleware.bind(this)
    Router.methods.forEach((method: string): void => {
      this.routes[method] = {}
    }, this)
  }
  public routes: Routes;
  public prefix: string;
  public headers: [string, string][];

  public async middleware(ctx: KoaCtx, next: MiddlewareFn): Promise<void> {
    const { path, method } = ctx
    const tasks = this.routes[method][path]
    if (Array.isArray(tasks)) {
      this.headers.forEach(([key, val]) => ctx.set(key, val))
      await dispatchTask(tasks)(ctx, next)
    } else {
      await next()
    }
  }

  public add(method: string, path: string, fn: MiddlewareFn): this {
    isString(method), isString(path), isFunction(fn)
    const fullPath = `${this.prefix}${path}`
    const tasks = this.routes[method][fullPath]
    Array.isArray(tasks)
      ? tasks.push(fn)
      : this.routes[method][fullPath] = [fn]
    return this
  }

  public all(path: string, fn: MiddlewareFn): this {
    Router.methods.forEach((method: string): void => {
      this.add(method, path, fn)
    }, this)
    return this
  }

  public get   (path: string, fn: MiddlewareFn): this { return this.add('GET', path, fn) }
  public del   (path: string, fn: MiddlewareFn): this { return this.add('DEL', path, fn) }
  public put   (path: string, fn: MiddlewareFn): this { return this.add('PUT', path, fn) }
  public post  (path: string, fn: MiddlewareFn): this { return this.add('POST', path, fn) }
  public petch (path: string, fn: MiddlewareFn): this { return this.add('PETCH', path, fn) }
  public delete(path: string, fn: MiddlewareFn): this { return this.add('DELETE', path, fn) }
}

export default Router
