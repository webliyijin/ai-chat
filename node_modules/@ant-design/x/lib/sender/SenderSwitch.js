"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _util = require("@rc-component/util");
var _pickAttrs = _interopRequireDefault(require("@rc-component/util/lib/pickAttrs"));
var _antd = require("antd");
var _clsx = require("clsx");
var React = _interopRequireWildcard(require("react"));
var _useProxyImperativeHandle = _interopRequireDefault(require("../_util/hooks/use-proxy-imperative-handle"));
var _useXComponentConfig = _interopRequireDefault(require("../_util/hooks/use-x-component-config"));
var _xProvider = require("../x-provider");
var _context = require("./context");
var _style = _interopRequireDefault(require("./style"));
const SenderSwitch = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    children,
    className,
    classNames = {},
    styles = {},
    icon,
    style,
    onChange,
    rootClassName,
    loading,
    defaultValue,
    value: customValue,
    checkedChildren,
    unCheckedChildren,
    disabled,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;
  const {
    styles: contextStyles = {},
    classNames: contextClassNames = {},
    prefixCls: contextPrefixCls
  } = React.useContext(_context.SenderContext);
  const domProps = (0, _pickAttrs.default)(restProps, {
    attr: true,
    aria: true,
    data: true
  });
  const id = React.useId();

  // ============================ Prefix ============================
  const {
    direction,
    getPrefixCls
  } = (0, _xProvider.useXProviderContext)();
  const prefixCls = getPrefixCls('sender', customizePrefixCls || contextPrefixCls);
  const switchCls = `${prefixCls}-switch`;
  const [hashId, cssVarCls] = (0, _style.default)(prefixCls);

  // ============================= Refs =============================
  const containerRef = React.useRef(null);
  (0, _useProxyImperativeHandle.default)(ref, () => {
    return {
      nativeElement: containerRef.current
    };
  });

  // ============================ Checked ============================
  const [mergedChecked, setMergedChecked] = (0, _util.useControlledState)(defaultValue, customValue);

  // ============================ style ============================
  const contextConfig = (0, _useXComponentConfig.default)('sender');
  const mergedCls = (0, _clsx.clsx)(prefixCls, switchCls, className, rootClassName, contextConfig.classNames.switch, contextClassNames.switch, classNames.root, hashId, cssVarCls, {
    [`${switchCls}-checked`]: mergedChecked,
    [`${switchCls}-rtl`]: direction === 'rtl'
  });
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: containerRef,
    className: mergedCls,
    key: id,
    style: {
      ...style,
      ...contextConfig.styles.switch,
      ...contextStyles.switch,
      ...styles.root
    }
  }, domProps), /*#__PURE__*/React.createElement(_antd.Button, {
    disabled: disabled,
    loading: loading,
    className: (0, _clsx.clsx)(`${switchCls}-content`, classNames.content),
    style: styles.content,
    styles: {
      icon: styles.icon,
      content: styles.title
    },
    classNames: {
      icon: classNames.icon,
      content: classNames.title
    },
    variant: "outlined",
    color: mergedChecked ? 'primary' : 'default',
    icon: icon,
    onClick: () => {
      const newValue = !mergedChecked;
      setMergedChecked(newValue);
      onChange?.(newValue);
    }
  }, mergedChecked ? checkedChildren : unCheckedChildren, children));
});
var _default = exports.default = SenderSwitch;