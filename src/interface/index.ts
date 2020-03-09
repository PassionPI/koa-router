export interface MiddlewareFn {
  (ctx?: KoaCtx, next?: MiddlewareFn): Promise<void>
}
export interface Tasks {
  [url: string]: MiddlewareFn[]
}
export interface Routes {
  [methodName: string]: Tasks
}

export interface KoaCtx {
  path: string,
  method: string,
  set(key: string, val: string): void,
  [props: string]: any
}

export interface Props {
  prefix: string,
  headers: [string, string][]
}

export const defaultProps: Props = {
  prefix: '',
  headers: []
}