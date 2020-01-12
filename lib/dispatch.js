module.exports = function (tasks) { return function (ctx, next) { return (function dispatch(i) {
    var fn = i === tasks.length ? next : tasks[i];
    if (!fn)
        return Promise.resolve();
    try {
        return Promise.resolve(fn(ctx, function () { return dispatch(i + 1); }));
    }
    catch (error) {
        return Promise.reject(error);
    }
})(0); }; };
