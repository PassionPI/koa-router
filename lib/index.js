"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatch_1 = require("./dispatch");
const utils_1 = require("./utils");
const { isString, isFunction, methods } = utils_1.default;
class Router {
    constructor(prefix) {
        this.notFound = (fn) => {
            isFunction(fn);
            this.notFoundTasks.push(fn);
            return this;
        };
        this.add = (method, path, fn) => {
            isString(method), isString(path), isFunction(fn);
            const fullPath = `${this.prefix}${path}`;
            const tasks = this.routes[method][fullPath];
            Array.isArray(tasks)
                ? tasks.push(fn)
                : this.routes[method][fullPath] = [fn];
            return this;
        };
        this.all = (path, fn) => {
            methods.forEach((method) => this.add(method, path, fn), this);
            return this;
        };
        this.get = (path, fn) => this.add('GET', path, fn);
        this.del = (path, fn) => this.add('DEL', path, fn);
        this.put = (path, fn) => this.add('PUT', path, fn);
        this.post = (path, fn) => this.add('POST', path, fn);
        this.petch = (path, fn) => this.add('PETCH', path, fn);
        this.delete = (path, fn) => this.add('DELETE', path, fn);
        this.routes = {};
        this.prefix = prefix || '';
        this.notFoundTasks = [];
        this.middleware = this.middleware.bind(this);
        methods.forEach((method) => this.routes[method] = {});
    }
    middleware(ctx, next) {
        const { path, method } = ctx;
        const tasks = this.routes[method][path];
        Array.isArray(tasks)
            ? dispatch_1.default(tasks)(ctx, next)
            : dispatch_1.default(this.notFoundTasks)(ctx, next);
    }
}
exports.default = Router;
