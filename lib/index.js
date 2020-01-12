var dispatchTask = require('./dispatch');
var _a = require('./utils'), isString = _a.isString, isFunction = _a.isFunction, methods = _a.methods;
var Router = /** @class */ (function () {
    function Router(prefix) {
        var _this = this;
        this.notFound = function (fn) {
            isFunction(fn);
            _this.notFoundTasks.push(fn);
            return _this;
        };
        this.add = function (method, path, fn) {
            isString(method), isString(path), isFunction(fn);
            var fullPath = "" + _this.prefix + path;
            var tasks = _this.routes[method][fullPath];
            Array.isArray(tasks)
                ? tasks.push(fn)
                : _this.routes[method][fullPath] = [fn];
            return _this;
        };
        this.all = function (path, fn) {
            methods.forEach(function (method) { return _this.add(method, path, fn); }, _this);
            return _this;
        };
        this.get = function (path, fn) { return _this.add('GET', path, fn); };
        this.del = function (path, fn) { return _this.add('DEL', path, fn); };
        this.put = function (path, fn) { return _this.add('PUT', path, fn); };
        this.post = function (path, fn) { return _this.add('POST', path, fn); };
        this.petch = function (path, fn) { return _this.add('PETCH', path, fn); };
        this["delete"] = function (path, fn) { return _this.add('DELETE', path, fn); };
        this.routes = {};
        this.prefix = prefix || '';
        this.notFoundTasks = [];
        this.middleware = this.middleware.bind(this);
        methods.forEach(function (method) { return _this.routes[method] = {}; });
    }
    Router.prototype.middleware = function (ctx, next) {
        var path = ctx.path, method = ctx.method;
        var tasks = this.routes[method][path];
        Array.isArray(tasks)
            ? dispatchTask(tasks)(ctx, next)
            : dispatchTask(this.notFoundTasks)(ctx, next);
    };
    return Router;
}());
module.exports = Router;
