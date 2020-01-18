"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (tasks) => (ctx, next) => (function dispatch(i) {
    const fn = i === tasks.length ? next : tasks[i];
    if (!fn)
        return Promise.resolve();
    try {
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
    }
    catch (error) {
        return Promise.reject(error);
    }
})(0);
