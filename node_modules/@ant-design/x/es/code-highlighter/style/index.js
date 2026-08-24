import { mergeToken } from '@ant-design/cssinjs-utils';
import { genStyleHooks } from "../../theme/genStyleUtils";
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
export const prepareComponentToken = token => ({
  colorBgTitle: token.colorFillContent,
  colorBorderCode: token.colorBorderSecondary,
  colorTextTitle: token.colorText
});
export default genStyleHooks('CodeHighlighter', token => {
  const codeHighlighterToken = mergeToken(token, {});
  return [genCodeHighlighterStyle(codeHighlighterToken)];
}, prepareComponentToken);