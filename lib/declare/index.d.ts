import { MiddleWareFn, KoaCtx } from './interface';
declare class Router {
    static readonly methods: string[];
    constructor(prefix: string);
    private routes;
    private prefix;
    private notFoundTasks;
    private add;
    middleware: (ctx: KoaCtx, next: MiddleWareFn) => void;
    notFound: (fn: MiddleWareFn) => this;
    all: (path: string, fn: MiddleWareFn) => this;
    get: (path: string, fn: MiddleWareFn) => this;
    del: (path: string, fn: MiddleWareFn) => this;
    put: (path: string, fn: MiddleWareFn) => this;
    post: (path: string, fn: MiddleWareFn) => this;
    petch: (path: string, fn: MiddleWareFn) => this;
    delete: (path: string, fn: MiddleWareFn) => this;
}
export default Router;
