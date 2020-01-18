import { MiddleWareFn, KoaCtx } from './interface';
declare const _default: (tasks: MiddleWareFn[]) => (ctx: KoaCtx, next: MiddleWareFn) => Promise<void>;
export default _default;
