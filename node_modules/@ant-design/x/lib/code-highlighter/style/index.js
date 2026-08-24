"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareComponentToken = exports.default = void 0;
var _cssinjsUtils = require("@ant-design/cssinjs-utils");
var _genStyleUtils = require("../../theme/genStyleUtils");
const genCodeHighlighterStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      [`${componentCls}-header`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: token.colorText,
        background: token.colorFillContent,
        padding: token.paddingSM,
        borderStartStartRadius: token.borderRadius,
        borderStartEndRadius: token.borderRadius
      },
      [`${componentCls}-header-title`]: {
        fontSize: token.fontSize,
        fontWeight: token.fontWeightStrong
      },
      [`${componentCls}-code`]: {
        borderEndEndRadius: token.borderRadius,
        borderEndStartRadius: token.borderRadius,
        borderStartStartRadius: 0,
        borderStartEndRadius: 0,
        background: token.colorBgContainer,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderTop: 'none',
        overflow: 'hidden',
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
  colorTextTitle: token.colorText
});
exports.prepareComponentToken = prepareComponentToken;
var _default = exports.default = (0, _genStyleUtils.genStyleHooks)('CodeHighlighter', token => {
  const codeHighlighterToken = (0, _cssinjsUtils.mergeToken)(token, {});
  return [genCodeHighlighterStyle(codeHighlighterToken)];
}, prepareComponentToken);