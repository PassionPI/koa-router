export interface MiddleWareFn {
  (ctx: KoaCtx, next?: MiddleWareFn): void
}
export interface Tasks {
  [url: string]: MiddleWareFn[]
}
export interface Routes {
  [methodName: string]: Tasks
}

export interface KoaCtx {
  path: string,
  method: string,
  [props: string]: any
}