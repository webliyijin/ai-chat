import type { FullToken, GetDefaultToken } from '../../theme/interface';
export interface ComponentToken {
    /**
     * @desc 标题背景颜色
     * @descEN Title background color
     */
    colorBgTitle: string;
    /**
     * @desc 标题文本颜色
     * @descEN Title text color
     */
    colorTextTitle: string;
    /**
     * @desc 代码块边框颜色
     * @descEN Code block border color
     */
    colorBorderCode: string;
}
export interface CodeHighlighterToken extends FullToken<'CodeHighlighter'> {
}
export declare const prepareComponentToken: GetDefaultToken<'CodeHighlighter'>;
declare const _default: (prefixCls: string, rootCls?: string | undefined) => readonly [string, string];
export default _default;
