import type { FullToken, GetDefaultToken } from '../../theme/interface';
export interface ComponentToken {
    /**
     * @desc 实心的 ThoughtChain.Item 背景色
     * @descEN ThoughtChain.Item `solid`'s background color
     */
    itemSolidBg: string;
    /**
     * @desc 实心的 ThoughtChain.Item 悬浮态背景色
     * @descEN ThoughtChain.Item `solid`'s hover background color
     */
    itemSolidHoverBg: string;
    /**
     * @desc 边框模式的 ThoughtChain.Item 背景色
     * @descEN ThoughtChain.Item `outlined`'s background color
     */
    itemOutlinedBg: string;
    /**
     * @desc 边框模式的 ThoughtChain.Item 悬浮态背景色
     * @descEN ThoughtChain.Item `outlined`'s hover background color
     */
    itemOutlinedHoverBg: string;
    /**
     * @desc ThoughtChain.Item 圆角
     * @descEN ThoughtChain.Item's border radius
     */
    itemBorderRadius: number;
    /**
     * @desc 图标容器尺寸
     * @descEN ThoughtChain.Item `outlined`'s hover background color
     */
    iconSize: number;
    /**
     * @desc 思维链节点描述文字的动画颜色
     * @descEN ThoughtChain node description text animation color
     */
    itemMotionDescription: string;
    /**
     * @desc 默认打字动画颜色
     * @descEN Default typing animation color
     */
    colorTextBlinkDefault: string;
    /**
     * @desc 打字动画颜色
     * @descEN Typing animation color
     */
    colorTextBlink: string;
    /**
     * @desc 错误状态描述文字颜色
     * @descEN Error state description text color
     */
    colorErrorTextDescription: string;
    /**
     * @desc 错误状态禁用文字颜色
     * @descEN Error state disabled text color
     */
    colorErrorTextDisabled: string;
    /**
     * @desc 错误状态禁用描述文字颜色
     * @descEN Error state disabled description text color
     */
    colorErrorTextDescriptionDisabled: string;
    /**
     * @desc 错误状态禁用背景色
     * @descEN Error state disabled background color
     */
    colorErrorBgDisabled: string;
    /**
     * @desc 禁用描述文字颜色
     * @descEN Disabled description text color
     */
    colorDescriptionDisabled: string;
    /**
     * @desc 禁用标题文字颜色
     * @descEN Disabled title text color
     */
    colorTitleDisabled: string;
    /**
     * @desc 成功状态禁用颜色
     * @descEN Success state disabled color
     */
    colorSuccessDisabled: string;
    /**
     * @desc 主要状态禁用颜色
     * @descEN Primary state disabled color
     */
    colorPrimaryDisabled: string;
}
export interface ThoughtChainToken extends FullToken<'ThoughtChain'> {
}
export declare const prepareComponentToken: GetDefaultToken<'ThoughtChain'>;
declare const _default: (prefixCls: string, rootCls?: string | undefined) => readonly [string, string];
export default _default;
