import type { FullToken, GetDefaultToken } from '../../theme/interface';
export interface ComponentToken {
    /**
     * @desc 词槽背景颜色
     * @descEN Slot background color
     */
    colorBgSlot: string;
    /**
     * @desc 词槽文本颜色
     * @descEN Slot text color
     */
    colorTextSlot: string;
    /**
     * @desc 词槽文本占位符颜色
     * @descEN Slot text placeholder color
     */
    colorTextSlotPlaceholder: string;
    /**
     * @desc 词槽边框颜色
     * @descEN Slot border color
     */
    colorBorderSlot: string;
    /**
     * @desc 词槽边框悬浮态颜色
     * @descEN Slot border hover color
     */
    colorBorderSlotHover: string;
    /**
     * @desc 开关选中背景颜色
     * @descEN Switch checked background colo
     */
    switchCheckedBg: string;
    /**
     * @desc 开关选中悬浮态背景颜色
     * @descEN Switch checked hover background color
     */
    switchCheckedHoverBg: string;
    /**
     * @desc 开关未选中悬浮态背景颜色
     * @descEN Switch unchecked hover background color
     */
    switchUncheckedHoverBg: string;
    /**
     * @desc 输入框边框颜色
     * @descEN Input border color
     */
    colorBorderInput: string;
    /**
     * @desc 技能背景颜色
     * @descEN Skill background color
     */
    colorBgSkill: string;
    /**
     * @desc 技能悬浮态背景颜色
     * @descEN Skill hover background color
     */
    colorBgSkillHover: string;
    /**
     * @desc 操作按钮禁用文本颜色
     * @descEN Actions disabled text color
     */
    colorTextActionsDisabled: string;
    /**
     * @desc 操作按钮禁用背景颜色
     * @descEN Actions disabled background color
     */
    colorBgActionsDisabled: string;
}
export interface SenderToken extends FullToken<'Sender'> {
    SenderContentMaxWidth: number | string;
}
export declare const prepareComponentToken: GetDefaultToken<'Sender'>;
declare const _default: (prefixCls: string, rootCls?: string | undefined) => readonly [string, string];
export default _default;
