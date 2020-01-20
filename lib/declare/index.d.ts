import { MiddlewareFn, Routes, KoaCtx } from './interface';
declare class Router {
    static readonly methods: string[];
    constructor(prefix: string);
    routes: Routes;
    prefix: string;
    add: (method: string, path: string, fn: MiddlewareFn) => this;
    middleware: (ctx: KoaCtx, next: MiddlewareFn) => Promise<void>;
    all: (path: string, fn: MiddlewareFn) => this;
    get: (path: string, fn: MiddlewareFn) => this;
    del: (path: string, fn: MiddlewareFn) => this;
    put: (path: string, fn: MiddlewareFn) => this;
    post: (path: string, fn: MiddlewareFn) => this;
    petch: (path: string, fn: MiddlewareFn) => this;
    delete: (path: string, fn: MiddlewareFn) => this;
}
export default Router;
