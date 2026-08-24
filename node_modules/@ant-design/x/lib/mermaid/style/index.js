"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareComponentToken = exports.default = void 0;
var _cssinjsUtils = require("@ant-design/cssinjs-utils");
var _genStyleUtils = require("../../theme/genStyleUtils");
const genMermaidStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      [`${componentCls}-header`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: token.colorBgTitle,
        color: token.colorTextTitle,
        padding: token.paddingSM,
        borderStartStartRadius: token.borderRadius,
        borderStartEndRadius: token.borderRadius
      },
      [`${componentCls}-graph`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${token.colorBgTitle}`,
        borderTop: 'none',
        padding: token.paddingSM,
        background: token.colorBgContainer,
        overflow: 'auto',
        borderEndEndRadius: token.borderRadius,
        borderEndStartRadius: token.borderRadius,
        height: '400px'
      },
      [`${componentCls}-graph-hidden`]: {
        display: 'none'
      },
      [`${componentCls}-graph svg`]: {
        maxWidth: '100%',
        maxHeight: '100%',
        height: 'auto',
        width: 'auto'
      },
      [`${componentCls}-code`]: {
        borderEndEndRadius: token.borderRadius,
        borderEndStartRadius: token.borderRadius,
        borderBottom: `1px solid ${token.colorBgTitle}`,
        borderInlineStart: `1px solid ${token.colorBgTitle}`,
        borderInlineEnd: `1px solid ${token.colorBgTitle}`,
        background: token.colorBgContainer,
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingSM,
        overflow: 'auto',
        height: '400px',
        'pre,code': {
          whiteSpace: 'pre',
          fontSize: token.fontSize,
          fontFamily: token.fontFamilyCode,
          lineHeight: 2,
          borderRadius: 0,
          border: 'none'
        },
        "code[class*='language-'],pre[class*='language-']": {
          background: 'none'
        }
      },
      [`&${componentCls}-rtl`]: {
        direction: 'rtl'
      }
    }
  };
};
const prepareComponentToken = token => ({
  colorBgTitle: token.colorFillContent,
  colorBorderCode: token.colorBorderSecondary,
  colorBorderGraph: token.colorBorderSecondary,
  colorTextTitle: token.colorText
});
exports.prepareComponentToken = prepareComponentToken;
var _default = exports.default = (0, _genStyleUtils.genStyleHooks)('Mermaid', token => {
  const mermaidToken = (0, _cssinjsUtils.mergeToken)(token, {});
  return [genMermaidStyle(mermaidToken)];
}, prepareComponentToken);