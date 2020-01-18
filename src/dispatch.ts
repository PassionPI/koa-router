export default (tasks: Function[]) => (ctx: any, next: Function) => (
  function dispatch(i: number) {
    const fn = i === tasks.length ? next : tasks[i]
    if (!fn) return Promise.resolve()
    try {
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)))
    } catch (error) {
      return Promise.reject(error)
    }
  }
)(0)