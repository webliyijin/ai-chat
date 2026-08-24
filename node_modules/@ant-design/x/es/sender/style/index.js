import { unit } from '@ant-design/cssinjs';
import { mergeToken } from '@ant-design/cssinjs-utils';
import { FastColor } from '@ant-design/fast-color';
import { genStyleHooks } from "../../theme/genStyleUtils";
import genSenderHeaderStyle from "./header";
import genSlotTextAreaStyle from "./slot-textarea";
import genSenderSwitchStyle from "./switch";
const genSenderStyle = token => {
  const {
    antCls,
    componentCls,
    paddingSM,
    paddingXS,
    paddingXXS,
    lineWidth,
    calc
  } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-main`]: {
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box',
        boxShadow: `${token.boxShadowTertiary}`,
        borderRadius: {
          _skip_check_: true,
          value: calc(token.borderRadius).mul(2).equal()
        },
        borderColor: token.colorBorderInput,
        borderWidth: lineWidth,
        borderStyle: 'solid'
      },
      [`&${componentCls}-disabled`]: {
        background: token.colorBgContainerDisabled,
        borderColor: 'transparent'
      },
      // ============================== RTL ==============================
      [`&${componentCls}-rtl`]: {
        direction: 'rtl'
      },
      // ============================ Content ============================
      [`${componentCls}-content`]: {
        display: 'flex',
        gap: paddingXS,
        width: '100%',
        paddingBlock: paddingSM,
        paddingInlineStart: paddingSM,
        paddingInlineEnd: paddingSM,
        boxSizing: 'border-box',
        alignItems: 'flex-end'
      },
      // ============================ Prefix =============================
      [`${componentCls}-prefix`]: {
        flex: 'none'
      },
      // ============================= Input =============================
      [`${componentCls}-input`]: {
        paddingInline: 0,
        borderRadius: 0,
        flex: 'auto',
        alignSelf: 'center',
        caretColor: token.colorPrimary,
        fontSize: token.fontSize
      },
      // ============================ Actions ============================
      [`${componentCls}-actions-list`]: {
        flex: 'none',
        display: 'flex',
        '&-presets': {
          gap: token.paddingXS
        }
      },
      [`${componentCls}-actions-btn`]: {
        [`&-disabled:where(${antCls}-btn-variant-text)`]: {
          color: token.colorTextActionsDisabled,
          borderColor: 'transparent'
        },
        [`&-disabled:not(${antCls}-btn-variant-text)`]: {
          background: token.colorBgActionsDisabled,
          color: token.colorTextLightSolid,
          borderColor: 'transparent'
        },
        '&-loading-button': {
          padding: 0,
          border: 0
        },
        '&-loading-icon': {
          height: token.controlHeight,
          width: token.controlHeight,
          verticalAlign: 'top'
        },
        '&-recording-icon': {
          height: '1.2em',
          width: '1.2em',
          verticalAlign: 'top'
        }
      },
      // ============================ Footer =============================
      [`${componentCls}-footer`]: {
        paddingInlineStart: paddingSM,
        paddingInlineEnd: paddingSM,
        paddingBlockEnd: paddingSM,
        paddingBlockStart: paddingXXS,
        boxSizing: 'border-box'
      }
    }
  };
};
export const prepareComponentToken = token => {
  const {
    colorPrimary,
    colorFillTertiary
  } = token;
  const colorBgSlot = new FastColor(colorPrimary).setA(0.06).toRgbString();
  const colorBgSkill = new FastColor(colorPrimary).setA(0.08).toRgbString();
  const colorBgSkillHover = new FastColor(colorPrimary).setA(0.15).toRgbString();
  const colorTextSlot = colorPrimary;
  const colorTextSlotPlaceholder = new FastColor(colorPrimary).setA(0.25).toRgbString();
  const colorBorderSlotHover = new FastColor(colorPrimary).setA(0.1).toRgbString();
  const colorBorderSlot = colorBgSlot;
  const switchCheckedBg = new FastColor(colorPrimary).setA(0.08).toRgbString();
  const switchUncheckedHoverBg = new FastColor(colorFillTertiary).setA(0.04).toRgbString();
  const switchCheckedHoverBg = new FastColor(colorPrimary).setA(0.1).toRgbString();
  const colorBorderInput = new FastColor(colorFillTertiary).setA(0.1).toRgbString();
  const boxShadowInput = `0 4px 12px 0 ${new FastColor(colorPrimary).setA(0.1).toRgbString()}`;
  const colorBgActionsDisabled = new FastColor(colorPrimary).setA(0.45).toRgbString();
  const colorTextActionsDisabled = colorBgActionsDisabled;
  return {
    colorBgSlot,
    colorBgSkill,
    colorBgSkillHover,
    colorTextSlot,
    colorTextSlotPlaceholder,
    colorBorderSlotHover,
    colorBorderSlot,
    switchCheckedBg,
    switchCheckedHoverBg,
    switchUncheckedHoverBg,
    colorBorderInput,
    boxShadowInput,
    colorBgActionsDisabled,
    colorTextActionsDisabled
  };
};
export default genStyleHooks('Sender', token => {
  const {
    paddingXS,
    calc
  } = token;
  const SenderToken = mergeToken(token, {
    SenderContentMaxWidth: `calc(100% - ${unit(calc(paddingXS).add(32).equal())})`
  });
  return [genSenderStyle(SenderToken), genSenderHeaderStyle(SenderToken), genSenderSwitchStyle(SenderToken), genSlotTextAreaStyle(SenderToken)];
}, prepareComponentToken);