"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dispatch_1 = require("./dispatch");
const utils_1 = require("./utils");
const interface_1 = require("./interface");
class Router {
    constructor(props = interface_1.defaultProps) {
        this.routes = {};
        this.prefix = props.prefix || '';
        this.headers = utils_1.isKeyValArr(props.headers);
        this.middleware = this.middleware.bind(this);
        Router.methods.forEach((method) => {
            this.routes[method] = {};
        }, this);
    }
    async middleware(ctx, next) {
        const { path, method } = ctx;
        const tasks = this.routes[method][path];
        if (Array.isArray(tasks)) {
            if (Array.isArray(this.headers)) {
                this.headers.forEach(([key, val]) => ctx.set(key, val));
            }
            await dispatch_1.default(tasks)(ctx, next);
        }
        else {
            await next();
        }
    }
    add(method, path, fn) {
        utils_1.isString(method), utils_1.isString(path), utils_1.isFunction(fn);
        const fullPath = `${this.prefix}${path}`;
        const tasks = this.routes[method][fullPath];
        Array.isArray(tasks)
            ? tasks.push(fn)
            : this.routes[method][fullPath] = [fn];
        return this;
    }
    all(path, fn) {
        Router.methods.forEach((method) => {
            this.add(method, path, fn);
        }, this);
        return this;
    }
    get(path, fn) { return this.add('GET', path, fn); }
    del(path, fn) { return this.add('DEL', path, fn); }
    put(path, fn) { return this.add('PUT', path, fn); }
    post(path, fn) { return this.add('POST', path, fn); }
    petch(path, fn) { return this.add('PETCH', path, fn); }
    delete(path, fn) { return this.add('DELETE', path, fn); }
}
Router.methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'DEL'];
exports.default = Router;
