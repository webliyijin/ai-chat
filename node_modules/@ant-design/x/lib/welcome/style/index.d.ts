import type { FullToken, GetDefaultToken } from '../../theme/interface';
export interface ComponentToken {
}
export interface WelcomeToken extends FullToken<'Welcome'> {
}
export declare const prepareComponentToken: GetDefaultToken<'Welcome'>;
declare const _default: (prefixCls: string, rootCls?: string | undefined) => readonly [string, string];
export default _default;
