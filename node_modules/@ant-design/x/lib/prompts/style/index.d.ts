import type { FullToken, GetDefaultToken } from '../../theme/interface';
export interface ComponentToken {
}
export interface PromptsToken extends FullToken<'Prompts'> {
}
export declare const prepareComponentToken: GetDefaultToken<'Prompts'>;
declare const _default: (prefixCls: string, rootCls?: string | undefined) => readonly [string, string];
export default _default;
