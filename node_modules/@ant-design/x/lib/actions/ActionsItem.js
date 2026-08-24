"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ACTIONS_ITEM_STATUS = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _icons = require("@ant-design/icons");
var _pickAttrs = _interopRequireDefault(require("@rc-component/util/lib/pickAttrs"));
var _antd = require("antd");
var _clsx = require("clsx");
var _react = _interopRequireDefault(require("react"));
var _xProvider = require("../x-provider");
var _style = _interopRequireDefault(require("./style"));
let ACTIONS_ITEM_STATUS = exports.ACTIONS_ITEM_STATUS = /*#__PURE__*/function (ACTIONS_ITEM_STATUS) {
  ACTIONS_ITEM_STATUS["LOADING"] = "loading";
  ACTIONS_ITEM_STATUS["ERROR"] = "error";
  ACTIONS_ITEM_STATUS["RUNNING"] = "running";
  ACTIONS_ITEM_STATUS["DEFAULT"] = "default";
  return ACTIONS_ITEM_STATUS;
}({});
const ActionsItem = props => {
  const {
    status = 'default',
    defaultIcon,
    runningIcon,
    label,
    className,
    classNames = {},
    styles = {},
    style,
    prefixCls: customizePrefixCls,
    rootClassName,
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
  const itemCls = `${prefixCls}-button-item`;

  // ============================ Classname ============================

  const mergedCls = (0, _clsx.clsx)(itemCls, hashId, cssVarCls, rootClassName, className, classNames.root, prefixCls, `${prefixCls}-item`, {
    [`${itemCls}-rtl`]: direction === 'rtl',
    [`${classNames[status]}`]: classNames[status]
  });
  const StatusIcon = {
    [ACTIONS_ITEM_STATUS.LOADING]: /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null),
    [ACTIONS_ITEM_STATUS.ERROR]: /*#__PURE__*/_react.default.createElement(_icons.CloseCircleOutlined, null),
    [ACTIONS_ITEM_STATUS.RUNNING]: runningIcon,
    [ACTIONS_ITEM_STATUS.DEFAULT]: defaultIcon
  };
  const iconNode = status && StatusIcon[status] ? StatusIcon[status] : defaultIcon;
  return /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: label
  }, /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({}, domProps, {
    className: mergedCls,
    style: {
      ...style,
      ...styles.root,
      ...styles?.[status]
    }
  }), iconNode));
};
var _default = exports.default = ActionsItem;