export interface MiddlewareFn {
    (ctx?: KoaCtx, next?: MiddlewareFn): Promise<void>;
}
export interface Tasks {
    [url: string]: MiddlewareFn[];
}
export interface Routes {
    [methodName: string]: Tasks;
}
export interface KoaCtx {
    path: string;
    method: string;
    [props: string]: any;
}
