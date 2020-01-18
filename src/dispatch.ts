import { MiddleWareFn, KoaCtx } from './interface'

export default (tasks: MiddleWareFn[]) => (ctx: KoaCtx, next: MiddleWareFn) => (
  function dispatch(i: number): Promise<void> {
    const fn: MiddleWareFn = i === tasks.length ? next : tasks[i]
    if (!fn) return Promise.resolve()
    try {
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
    } catch (error) {
      return Promise.reject(error)
    }
  }
)(0)