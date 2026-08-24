"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareComponentToken = exports.default = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _cssinjsUtils = require("@ant-design/cssinjs-utils");
var _fastColor = require("@ant-design/fast-color");
var _genStyleUtils = require("../../theme/genStyleUtils");
var _header = _interopRequireDefault(require("./header"));
var _slotTextarea = _interopRequireDefault(require("./slot-textarea"));
var _switch = _interopRequireDefault(require("./switch"));
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
const prepareComponentToken = token => {
  const {
    colorPrimary,
    colorFillTertiary
  } = token;
  const colorBgSlot = new _fastColor.FastColor(colorPrimary).setA(0.06).toRgbString();
  const colorBgSkill = new _fastColor.FastColor(colorPrimary).setA(0.08).toRgbString();
  const colorBgSkillHover = new _fastColor.FastColor(colorPrimary).setA(0.15).toRgbString();
  const colorTextSlot = colorPrimary;
  const colorTextSlotPlaceholder = new _fastColor.FastColor(colorPrimary).setA(0.25).toRgbString();
  const colorBorderSlotHover = new _fastColor.FastColor(colorPrimary).setA(0.1).toRgbString();
  const colorBorderSlot = colorBgSlot;
  const switchCheckedBg = new _fastColor.FastColor(colorPrimary).setA(0.08).toRgbString();
  const switchUncheckedHoverBg = new _fastColor.FastColor(colorFillTertiary).setA(0.04).toRgbString();
  const switchCheckedHoverBg = new _fastColor.FastColor(colorPrimary).setA(0.1).toRgbString();
  const colorBorderInput = new _fastColor.FastColor(colorFillTertiary).setA(0.1).toRgbString();
  const boxShadowInput = `0 4px 12px 0 ${new _fastColor.FastColor(colorPrimary).setA(0.1).toRgbString()}`;
  const colorBgActionsDisabled = new _fastColor.FastColor(colorPrimary).setA(0.45).toRgbString();
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
exports.prepareComponentToken = prepareComponentToken;
var _default = exports.default = (0, _genStyleUtils.genStyleHooks)('Sender', token => {
  const {
    paddingXS,
    calc
  } = token;
  const SenderToken = (0, _cssinjsUtils.mergeToken)(token, {
    SenderContentMaxWidth: `calc(100% - ${(0, _cssinjs.unit)(calc(paddingXS).add(32).equal())})`
  });
  return [genSenderStyle(SenderToken), (0, _header.default)(SenderToken), (0, _switch.default)(SenderToken), (0, _slotTextarea.default)(SenderToken)];
}, prepareComponentToken);