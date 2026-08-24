import type { FullToken, GetDefaultToken } from '../../theme/interface';
export interface ComponentToken {
}
export interface SourcesToken extends FullToken<'Sources'> {
}
export declare const prepareComponentToken: GetDefaultToken<'Sources'>;
declare const _default: (prefixCls: string, rootCls?: string | undefined) => readonly [string, string];
export default _default;
