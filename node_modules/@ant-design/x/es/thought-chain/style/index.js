import { unit } from '@ant-design/cssinjs/lib/util';
import { mergeToken } from '@ant-design/cssinjs-utils';
import { FastColor } from '@ant-design/fast-color';
import { blinkMotion, genCollapseMotion } from "../../style";
import { genStyleHooks } from "../../theme/genStyleUtils";
import genThoughtChainItemStyle from "./item";
const genThoughtChainStyle = token => {
  const {
    componentCls,
    calc
  } = token;
  return {
    [componentCls]: {
      [`&${componentCls}-box`]: {
        display: 'flex',
        flexDirection: 'column',
        [`& ${componentCls}-node:last-of-type`]: {
          [`> ${componentCls}-node-icon`]: {
            '&:after': {
              display: 'none'
            }
          }
        }
      },
      [`${componentCls}-node`]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'baseline',
        gap: token.marginSM,
        [`${componentCls}-status-error`]: {
          color: token.colorError
        },
        [`${componentCls}-status-success`]: {
          color: token.colorSuccess
        },
        [`${componentCls}-status-loading`]: {
          color: token.colorPrimary
        }
      },
      [`${componentCls}-node-header`]: {
        display: 'flex',
        flexDirection: 'column'
      },
      [`${componentCls}-node-title`]: {
        fontWeight: 500,
        display: 'flex',
        gap: token.marginXS
      },
      [`${componentCls}-node-collapsible`]: {
        paddingInlineEnd: token.padding,
        cursor: 'pointer'
      },
      [`${componentCls}-node-footer`]: {
        marginBottom: token.margin
      },
      [`${componentCls}-node-content-box`]: {
        marginBottom: token.margin
      },
      [`${componentCls}-node-collapse-icon`]: {
        '& svg': {
          transition: `transform ${token.motionDurationMid} ${token.motionEaseInOut}`
        }
      },
      [`${componentCls}-node-description`]: {
        color: token.colorTextDescription,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        marginBlockEnd: token.margin
      },
      [`${componentCls}-node-icon`]: {
        lineHeight: 1,
        fontSize: token.iconSize,
        '&:after': {
          content: '""',
          position: 'absolute',
          height: unit(calc('100%').sub(calc(token.iconSize).mul(token.lineHeight)).equal()),
          borderInlineStart: `${unit(token.lineWidth)} solid ${token.colorFillContent}`,
          insetInlineStart: unit(calc(token.iconSize).sub(1).div(2).equal()),
          top: unit(calc(token.iconSize).mul(token.lineHeight).equal())
        }
      },
      [`${componentCls}-node-icon-dashed`]: {
        '&:after': {
          borderInlineStart: `${unit(token.lineWidth)} dashed ${token.colorFillContent}`
        }
      },
      [`${componentCls}-node-icon-dotted‌`]: {
        '&:after': {
          borderInlineStart: `${unit(token.lineWidth)} dotted‌ ${token.colorFillContent}`
        }
      },
      [`${componentCls}-node-index-icon`]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        color: token.colorTextSecondary,
        fontSize: token.fontSizeSM,
        width: token.iconSize,
        height: token.iconSize,
        backgroundColor: token.colorFillContent,
        borderRadius: unit(calc(token.iconSize).div(2).equal())
      },
      [`&${componentCls}-rtl`]: {
        direction: 'rtl',
        [`${componentCls}-node-icon`]: {
          '&:after': {
            insetInlineStart: 'unset',
            insetInlineEnd: unit(calc(token.iconSize).sub(1).div(2).equal())
          }
        }
      }
    }
  };
};
export const prepareComponentToken = token => {
  const itemMotionDescription = new FastColor(token.colorTextDescription).setA(0.25).toRgbString();
  const colorTextBlinkDefault = token.colorTextDescription;
  const colorTextBlink = token.colorTextBase;
  const colorErrorTextDescription = new FastColor(token.colorErrorText).setA(0.45).toRgbString();
  const colorErrorTextDisabled = new FastColor(token.colorErrorText).setA(0.45).toRgbString();
  const itemSolidHoverBg = new FastColor(token.colorFillTertiary).setA(0.06).toRgbString();
  const colorErrorTextDescriptionDisabled = new FastColor(token.colorErrorText).setA(0.25).toRgbString();
  const colorDescriptionDisabled = new FastColor(token.colorTextDescription).setA(0.25).toRgbString();
  const colorTitleDisabled = new FastColor(token.colorText).setA(0.45).toRgbString();
  const colorErrorBgDisabled = new FastColor(token.colorErrorBg).setA(0.25).toRgbString();
  const itemOutlinedHoverBg = itemSolidHoverBg;
  const colorSuccessDisabled = new FastColor(token.colorSuccess).setA(0.45).toRgbString();
  const colorPrimaryDisabled = new FastColor(token.colorPrimary).setA(0.45).toRgbString();
  return {
    colorDescriptionDisabled,
    colorPrimaryDisabled,
    colorSuccessDisabled,
    colorTitleDisabled,
    colorErrorTextDisabled,
    colorErrorBgDisabled,
    colorErrorTextDescriptionDisabled,
    itemMotionDescription,
    colorTextBlinkDefault,
    colorTextBlink,
    itemSolidBg: token.colorFillTertiary,
    itemSolidHoverBg,
    itemOutlinedBg: token.colorBgContainer,
    itemOutlinedHoverBg,
    itemBorderRadius: token.borderRadius,
    iconSize: token.fontSize,
    titleFontSize: token.fontSize,
    descriptionFontSize: token.fontSize,
    nodePadding: token.paddingSM,
    titleFontWeight: 500,
    borderColor: token.colorBorder,
    borderWidth: token.lineWidth,
    connectorColor: token.colorFillContent,
    connectorWidth: token.lineWidth,
    colorErrorTextDescription,
    hoverTransitionDuration: `${token.motionDurationMid} ${token.motionEaseInOut}`
  };
};
export default genStyleHooks('ThoughtChain', token => {
  const compToken = mergeToken(token, {});
  const {
    componentCls
  } = token;
  return [genThoughtChainStyle(compToken), genThoughtChainItemStyle(compToken), genCollapseMotion(compToken), blinkMotion(compToken, `${componentCls}-motion-blink`)];
}, prepareComponentToken);