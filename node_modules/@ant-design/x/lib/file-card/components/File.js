"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _clsx = require("clsx");
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
const File = props => {
  const {
    styles = {},
    classNames = {},
    prefixCls,
    name,
    namePrefix,
    ext,
    size,
    byte,
    src,
    type,
    description,
    icon,
    iconColor,
    onClick,
    mask
  } = props;
  const compCls = `${prefixCls}-file`;
  const mergedCls = (0, _clsx.clsx)(compCls, classNames.file, {
    [`${compCls}-pointer`]: !!onClick,
    [`${compCls}-small`]: size === 'small'
  });
  const desc = (0, _react.useMemo)(() => {
    const sizeText = typeof byte === 'number' ? (0, _utils.getSize)(byte) : '';
    const descriptionNode = typeof description === 'function' ? description({
      size: sizeText,
      icon,
      src,
      type,
      name,
      namePrefix,
      nameSuffix: ext
    }) : description;
    if (descriptionNode === false) {
      return null;
    }
    return descriptionNode ?? sizeText;
  }, [description, byte, icon, src, type, name, namePrefix, ext]);
  const maskNode = (0, _react.useMemo)(() => {
    const sizeText = typeof byte === 'number' ? (0, _utils.getSize)(byte) : '';
    const maskContent = typeof mask === 'function' ? mask({
      size: sizeText,
      icon,
      src,
      type,
      name,
      namePrefix,
      nameSuffix: ext
    }) : mask;
    return maskContent === false ? null : maskContent;
  }, [mask, byte, icon, src, type, name, namePrefix, ext]);
  const handleClick = _react.default.useCallback(event => {
    if (onClick) {
      const size = typeof byte === 'number' ? (0, _utils.getSize)(byte) : '';
      onClick({
        size,
        icon,
        name,
        namePrefix,
        nameSuffix: ext,
        src,
        type
      }, event);
    }
  }, [onClick, byte, icon, name, namePrefix, ext, src, type]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: mergedCls,
    style: styles.file,
    onClick: handleClick
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.clsx)(`${compCls}-icon`, classNames.icon),
    style: {
      color: iconColor,
      ...styles.icon
    }
  }, icon), /*#__PURE__*/_react.default.createElement("div", {
    className: `${compCls}-content`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.clsx)(`${compCls}-name`, classNames.name),
    style: styles.name
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: `${compCls}-name-prefix`
  }, namePrefix), /*#__PURE__*/_react.default.createElement("span", {
    className: `${compCls}-name-suffix`
  }, ext)), desc !== null && desc !== undefined && /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.clsx)(`${compCls}-description`, classNames.description),
    style: styles.description
  }, desc)), maskNode !== null && maskNode !== undefined && /*#__PURE__*/_react.default.createElement("div", {
    className: `${compCls}-mask`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${compCls}-mask-info`
  }, maskNode)));
};
var _default = exports.default = File;