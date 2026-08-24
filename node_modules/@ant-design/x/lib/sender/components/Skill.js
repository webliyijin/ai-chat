"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _antd = require("antd");
var _clsx = require("clsx");
var _react = _interopRequireWildcard(require("react"));
const Skill = ({
  removeSkill,
  prefixCls,
  toolTip,
  closable,
  title,
  value
}) => {
  const componentCls = `${prefixCls}-skill`;
  const closeNode = (0, _react.useMemo)(() => {
    if (!closable) {
      return [null];
    }
    const config = typeof closable === 'boolean' ? {} : closable;
    const handleClose = event => {
      if (config.disabled) {
        return;
      }
      event.stopPropagation();
      removeSkill();
      config.onClose?.(event);
    };
    const closeIcon = config.closeIcon || /*#__PURE__*/_react.default.createElement(_icons.CloseOutlined, {
      className: `${componentCls}-close-icon`
    });
    const closeNode = /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _clsx.clsx)(`${componentCls}-close`, {
        [`${componentCls}-close-disabled`]: config.disabled
      }),
      onClick: handleClose,
      role: "button",
      "aria-label": "Close skill",
      tabIndex: 0
    }, closeIcon);
    return closeNode;
  }, [closable, removeSkill]);
  const mergeTitle = title || value;
  const titleNode = toolTip ? /*#__PURE__*/_react.default.createElement(_antd.Tooltip, toolTip, mergeTitle) : mergeTitle;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${componentCls}-wrapper`,
    contentEditable: false
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${componentCls}-tag`,
    contentEditable: false,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: `${componentCls}-tag-text`
  }, titleNode), closeNode), /*#__PURE__*/_react.default.createElement("div", {
    className: `${componentCls}-holder`
  }));
};
Skill.displayName = 'Skill';
var _default = exports.default = Skill;