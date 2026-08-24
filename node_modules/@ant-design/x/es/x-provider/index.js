import _extends from "@babel/runtime/helpers/esm/extends";
import { StyleContext as CssInJsStyleContext } from '@ant-design/cssinjs';
import IconContext from '@ant-design/icons/lib/components/Context';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import React from 'react';
import LocaleProvider, { ANT_MARK } from "../locale";
import XProviderContext from "./context";
import useXProviderContext, { defaultPrefixCls } from "./hooks/use-x-provider-context";
const XProvider = props => {
  const {
    actions,
    attachments,
    bubble,
    conversations,
    prompts,
    sender,
    suggestion,
    thoughtChain,
    welcome,
    fileCard,
    think,
    theme,
    locale,
    children,
    mermaid,
    codeHighlighter,
    iconPrefixCls,
    ...antdConfProps
  } = props;
  const xProviderProps = React.useMemo(() => {
    return {
      actions,
      attachments,
      bubble,
      conversations,
      prompts,
      sender,
      suggestion,
      thoughtChain,
      fileCard,
      think,
      mermaid,
      codeHighlighter,
      welcome
    };
  }, [actions, attachments, bubble, conversations, prompts, sender, suggestion, thoughtChain, welcome, mermaid, think, fileCard, codeHighlighter]);
  let childNode = children;
  if (locale) {
    childNode = /*#__PURE__*/React.createElement(LocaleProvider, {
      locale: locale,
      _ANT_MARK__: ANT_MARK
    }, childNode);
  }
  const {
    layer
  } = React.useContext(CssInJsStyleContext);
  const memoIconContextValue = React.useMemo(() => ({
    prefixCls: iconPrefixCls,
    csp: antdConfProps.csp,
    layer: layer ? 'antdx' : undefined
  }), [iconPrefixCls, antdConfProps.csp, layer]);
  if (iconPrefixCls || antdConfProps.csp) {
    childNode = /*#__PURE__*/React.createElement(IconContext.Provider, {
      value: memoIconContextValue
    }, childNode);
  }
  return /*#__PURE__*/React.createElement(XProviderContext.Provider, {
    value: xProviderProps
  }, /*#__PURE__*/React.createElement(AntdConfigProvider, _extends({}, antdConfProps, {
    theme: theme,
    locale: locale
  }), childNode));
};
export { useXProviderContext, defaultPrefixCls };
if (process.env.NODE_ENV !== 'production') {
  XProvider.displayName = 'XProvider';
}
export default XProvider;