import type { FullToken, GetDefaultToken } from '../../theme/interface';
export interface ComponentToken {
    /**
     * @desc 目录背景色
     * @descEN Background color of directory
     */
    colorBgDirectory: string;
}
export interface FolderToken extends FullToken<'Folder'> {
}
export declare const prepareComponentToken: GetDefaultToken<'Folder'>;
declare const _default: (prefixCls: string, rootCls?: string | undefined) => readonly [string, string];
export default _default;
