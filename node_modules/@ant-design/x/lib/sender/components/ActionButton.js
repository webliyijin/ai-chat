"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ActionButtonContext = exports.ActionButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _antd = require("antd");
var _clsx = require("clsx");
var _react = _interopRequireWildcard(require("react"));
const ActionButtonContext = exports.ActionButtonContext = /*#__PURE__*/_react.default.createContext(null);
const ActionButton = exports.ActionButton = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    className,
    action,
    onClick,
    ...restProps
  } = props;
  const context = (0, _react.useContext)(ActionButtonContext);
  const {
    prefixCls,
    disabled: rootDisabled,
    setSubmitDisabled
  } = context;
  const mergedDisabled = restProps.disabled ?? rootDisabled ?? context[`${action}Disabled`];
  (0, _react.useEffect)(() => {
    if (action === 'onSend') {
      setSubmitDisabled?.(mergedDisabled);
    }
  }, [mergedDisabled, action, setSubmitDisabled]);
  return /*#__PURE__*/_react.default.createElement(_antd.Button, (0, _extends2.default)({
    type: "text"
  }, restProps, {
    ref: ref,
    onClick: e => {
      if (mergedDisabled) {
        return;
      }
      context[action]?.();
      onClick?.(e);
    },
    disabled: mergedDisabled,
    className: (0, _clsx.clsx)(prefixCls, className, {
      [`${prefixCls}-disabled`]: mergedDisabled
    })
  }));
});
var _default = exports.default = ActionButton;