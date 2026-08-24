import { mergeToken } from '@ant-design/cssinjs-utils';
import { genStyleHooks } from "../../theme/genStyleUtils";
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
export const prepareComponentToken = token => ({
  colorBgTitle: token.colorFillContent,
  colorBorderCode: token.colorBorderSecondary,
  colorBorderGraph: token.colorBorderSecondary,
  colorTextTitle: token.colorText
});
export default genStyleHooks('Mermaid', token => {
  const mermaidToken = mergeToken(token, {});
  return [genMermaidStyle(mermaidToken)];
}, prepareComponentToken);