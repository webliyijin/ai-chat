import type { FullToken, GetDefaultToken } from '../../theme/interface';
export interface ComponentToken {
}
export interface FileCardToken extends FullToken<'FileCard'> {
}
export declare const prepareComponentToken: GetDefaultToken<'FileCard'>;
declare const _default: (prefixCls: string, rootCls?: string | undefined) => readonly [string, string];
export default _default;
