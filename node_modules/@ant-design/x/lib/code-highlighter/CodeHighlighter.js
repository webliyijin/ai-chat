"use strict";

var _interopRequireWildcard3 = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));
var _clsx = require("clsx");
var _react = _interopRequireWildcard3(require("react"));
var _reactSyntaxHighlighter = require("react-syntax-highlighter");
var _prism = require("react-syntax-highlighter/dist/esm/styles/prism");
var _useXComponentConfig = _interopRequireDefault(require("../_util/hooks/use-x-component-config"));
var _actions = _interopRequireDefault(require("../actions"));
var _xProvider = require("../x-provider");
var _style = _interopRequireDefault(require("./style"));
const customOneLight = {
  ..._prism.oneLight,
  'pre[class*="language-"]': {
    ..._prism.oneLight['pre[class*="language-"]'],
    margin: 0
  }
};

// Module-level cache for loaded language highlighters
const highlighterCache = new Map();
// Full Prism highlighter (cached, loaded on demand)
let FullPrismHighlighter = null;
const getAsyncHighlighter = lang => {
  if (!highlighterCache.has(lang)) {
    const LazyHighlighter = /*#__PURE__*/(0, _react.lazy)(async () => {
      try {
        await (specifier => new Promise(r => r(specifier)).then(s => (0, _interopRequireWildcard2.default)(require(s))))(`react-syntax-highlighter/dist/esm/languages/prism/${lang}`);
      } catch (error) {
        console.warn(`[CodeHighlighter] Failed to load language: ${lang}`, error);
      }
      return {
        default: ({
          children,
          ...rest
        }) => /*#__PURE__*/_react.default.createElement(_reactSyntaxHighlighter.PrismLight, (0, _extends2.default)({
          language: lang
        }, rest), children)
      };
    });
    highlighterCache.set(lang, LazyHighlighter);
  }
  return highlighterCache.get(lang);
};
const getFullPrismHighlighter = () => {
  if (!FullPrismHighlighter) {
    FullPrismHighlighter = /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => (0, _interopRequireWildcard2.default)(require('react-syntax-highlighter'))).then(module => ({
      default: props => /*#__PURE__*/_react.default.createElement(module.Prism, props)
    })));
  }
  return FullPrismHighlighter;
};
const CodeHighlighter = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    lang,
    children,
    header,
    prefixCls: customizePrefixCls,
    className,
    classNames = {},
    styles = {},
    style = {},
    highlightProps,
    prismLightMode = true,
    ...restProps
  } = props;

  // ============================ Prefix ============================
  const {
    getPrefixCls,
    direction
  } = (0, _xProvider.useXProviderContext)();
  const prefixCls = getPrefixCls('codeHighlighter', customizePrefixCls);
  const [hashId, cssVarCls] = (0, _style.default)(prefixCls);
  const contextConfig = (0, _useXComponentConfig.default)('codeHighlighter');

  // Get the appropriate highlighter component
  // - prismLightMode = true (default): Use PrismLight with async language loading
  // - prismLightMode = false: Use full Prism (all languages included)
  const Highlighter = prismLightMode ? lang ? getAsyncHighlighter(lang) : _reactSyntaxHighlighter.PrismLight : getFullPrismHighlighter();

  // ============================ Early Returns ============================
  if (!children) {
    return null;
  }

  // No lang means no highlighting needed, return plain code directly
  if (!lang) {
    return /*#__PURE__*/_react.default.createElement("code", null, children);
  }

  // ============================ style ============================
  const mergedCls = (0, _clsx.clsx)(prefixCls, contextConfig.className, className, contextConfig.classNames?.root, classNames.root, hashId, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });
  const mergedStyle = {
    ...contextConfig.style,
    ...styles?.root,
    ...style
  };

  // ============================ render header ============================
  const renderHeader = () => {
    if (header === undefined) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _clsx.clsx)(`${prefixCls}-header`, contextConfig.classNames?.header, classNames.header),
        style: {
          ...contextConfig.styles?.header,
          ...styles.header
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _clsx.clsx)(`${prefixCls}-header-title`, classNames.headerTitle, contextConfig.classNames?.headerTitle),
        style: {
          ...contextConfig.styles?.headerTitle,
          ...styles.headerTitle
        }
      }, lang), /*#__PURE__*/_react.default.createElement(_actions.default.Copy, {
        text: children
      }));
    }
    const headerResult = typeof header === 'function' ? header() : header;
    if (headerResult === false) {
      return null;
    }
    return headerResult;
  };

  // ============================ render ============================
  const codeElement = /*#__PURE__*/_react.default.createElement(Highlighter, (0, _extends2.default)({
    language: lang,
    wrapLines: true,
    style: customOneLight,
    codeTagProps: {
      style: {
        background: 'transparent'
      }
    }
  }, highlightProps), children.replace(/\n$/, ''));
  const highlightedCode = /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: /*#__PURE__*/_react.default.createElement("code", {
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, children.replace(/\n$/, ''))
  }, codeElement);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    ref: ref,
    className: mergedCls,
    style: mergedStyle
  }, restProps), renderHeader(), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.clsx)(`${prefixCls}-code`, contextConfig.classNames?.code, classNames.code),
    style: {
      ...contextConfig.styles.code,
      ...styles.code
    }
  }, highlightedCode));
});
if (process.env.NODE_ENV !== 'production') {
  CodeHighlighter.displayName = 'CodeHighlighter';
}
var _default = exports.default = CodeHighlighter;