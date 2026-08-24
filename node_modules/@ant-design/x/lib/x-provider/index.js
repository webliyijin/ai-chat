"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
Object.defineProperty(exports, "defaultPrefixCls", {
  enumerable: true,
  get: function () {
    return _useXProviderContext.defaultPrefixCls;
  }
});
Object.defineProperty(exports, "useXProviderContext", {
  enumerable: true,
  get: function () {
    return _useXProviderContext.default;
  }
});
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _cssinjs = require("@ant-design/cssinjs");
var _Context = _interopRequireDefault(require("@ant-design/icons/lib/components/Context"));
var _antd = require("antd");
var _react = _interopRequireDefault(require("react"));
var _locale = _interopRequireWildcard(require("../locale"));
var _context = _interopRequireDefault(require("./context"));
var _useXProviderContext = _interopRequireWildcard(require("./hooks/use-x-provider-context"));
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
  const xProviderProps = _react.default.useMemo(() => {
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
    childNode = /*#__PURE__*/_react.default.createElement(_locale.default, {
      locale: locale,
      _ANT_MARK__: _locale.ANT_MARK
    }, childNode);
  }
  const {
    layer
  } = _react.default.useContext(_cssinjs.StyleContext);
  const memoIconContextValue = _react.default.useMemo(() => ({
    prefixCls: iconPrefixCls,
    csp: antdConfProps.csp,
    layer: layer ? 'antdx' : undefined
  }), [iconPrefixCls, antdConfProps.csp, layer]);
  if (iconPrefixCls || antdConfProps.csp) {
    childNode = /*#__PURE__*/_react.default.createElement(_Context.default.Provider, {
      value: memoIconContextValue
    }, childNode);
  }
  return /*#__PURE__*/_react.default.createElement(_context.default.Provider, {
    value: xProviderProps
  }, /*#__PURE__*/_react.default.createElement(_antd.ConfigProvider, (0, _extends2.default)({}, antdConfProps, {
    theme: theme,
    locale: locale
  }), childNode));
};
if (process.env.NODE_ENV !== 'production') {
  XProvider.displayName = 'XProvider';
}
var _default = exports.default = XProvider;