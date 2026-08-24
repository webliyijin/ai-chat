"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _pickAttrs = _interopRequireDefault(require("@rc-component/util/lib/pickAttrs"));
var _antd = require("antd");
var _clsx = require("clsx");
var _react = _interopRequireDefault(require("react"));
var _xProvider = require("../x-provider");
var _style = _interopRequireDefault(require("./style"));
const {
  Text
} = _antd.Typography;
const ActionsCopy = props => {
  const {
    text = '',
    icon,
    className,
    style,
    prefixCls: customizePrefixCls,
    rootClassName,
    classNames = {},
    styles = {},
    ...otherHtmlProps
  } = props;
  const domProps = (0, _pickAttrs.default)(otherHtmlProps, {
    attr: true,
    aria: true,
    data: true
  });

  // ============================ Prefix ============================

  const {
    direction,
    getPrefixCls
  } = (0, _xProvider.useXProviderContext)();
  const prefixCls = getPrefixCls('actions', customizePrefixCls);
  const [hashId, cssVarCls] = (0, _style.default)(prefixCls);
  const copyCls = `${prefixCls}-copy`;

  // ============================ Classname ============================

  const mergedCls = (0, _clsx.clsx)(prefixCls, `${prefixCls}-item`, hashId, cssVarCls, rootClassName, className, classNames.root, {
    [`${copyCls}-rtl`]: direction === 'rtl'
  });
  return /*#__PURE__*/_react.default.createElement(Text, (0, _extends2.default)({}, domProps, {
    className: mergedCls,
    style: {
      ...style,
      ...styles.root
    },
    prefixCls: copyCls,
    copyable: {
      text,
      icon
    }
  }));
};
var _default = exports.default = ActionsCopy;