import { Props, MiddlewareFn, Routes, KoaCtx } from './interface';
declare class Router {
    static readonly methods: string[];
    constructor(props?: Props);
    routes: Routes;
    prefix: string;
    headers: [string, string][];
    middleware(ctx: KoaCtx, next: MiddlewareFn): Promise<void>;
    add(method: string, path: string, fn: MiddlewareFn): this;
    all(path: string, fn: MiddlewareFn): this;
    get(path: string, fn: MiddlewareFn): this;
    del(path: string, fn: MiddlewareFn): this;
    put(path: string, fn: MiddlewareFn): this;
    post(path: string, fn: MiddlewareFn): this;
    petch(path: string, fn: MiddlewareFn): this;
    delete(path: string, fn: MiddlewareFn): this;
}
export default Router;
