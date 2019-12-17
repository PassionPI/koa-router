module.exports = taskQueue => (ctx, next) => (
  function dispatch(index) {
    let fn = index === taskQueue.length
      ? next
      : taskQueue[index]

    if (!fn) return Promise.resolve()
    
    try {
      return Promise.resolve(fn(ctx, () => dispatch(index + 1)))
    } catch (error) {
      return Promise.reject(error)
    }
  }
)(0)