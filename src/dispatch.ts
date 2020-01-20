import { MiddlewareFn, KoaCtx } from './interface'

export default (tasks: MiddlewareFn[]): MiddlewareFn => (ctx?: KoaCtx, next?: MiddlewareFn): Promise<void> => (
  function dispatch(i: number): Promise<void> {
    const fn = i === tasks.length ? next : tasks[i]
    if (!fn) return Promise.resolve()
    try {
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
    } catch (error) {
      return Promise.reject(error)
    }
  }
)(0)