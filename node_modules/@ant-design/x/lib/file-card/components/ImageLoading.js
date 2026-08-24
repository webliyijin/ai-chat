"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _antd = require("antd");
var _clsx = require("clsx");
var _react = _interopRequireDefault(require("react"));
var _ImageIcon = _interopRequireDefault(require("./ImageIcon"));
var _usePercent = _interopRequireDefault(require("./usePercent"));
const ImageLoading = props => {
  const {
    style,
    className,
    prefixCls,
    spinProps
  } = props;
  const [mergedPercent, percentText] = (0, _usePercent.default)(true, typeof spinProps?.percent === 'undefined' ? 'auto' : spinProps?.percent);
  const mergeSinkProps = _react.default.useMemo(() => ({
    size: 'middle',
    showText: true,
    icon: /*#__PURE__*/_react.default.createElement(_ImageIcon.default, {
      color: "rgba(0,0,0,.45)",
      size: spinProps?.size || 'middle'
    }),
    ...spinProps
  }), [spinProps]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.clsx)(`${prefixCls}-image-loading`, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement(_antd.Skeleton.Node, {
    styles: {
      root: {
        width: '100%',
        height: '100%'
      },
      content: {
        width: '100%',
        height: '100%'
      }
    },
    rootClassName: (0, _clsx.clsx)(`${prefixCls}-image-skeleton`),
    active: true
  }, /*#__PURE__*/_react.default.createElement(_antd.Flex, {
    className: (0, _clsx.clsx)(`${prefixCls}-image-spin`, {
      [`${prefixCls}-image-spin-${mergeSinkProps.size}`]: mergeSinkProps.size
    }),
    align: "center",
    gap: "small"
  }, /*#__PURE__*/_react.default.createElement(_antd.Spin, (0, _extends2.default)({
    percent: mergedPercent
  }, spinProps)), mergeSinkProps.showText && /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-image-spin-text`
  }, percentText)), mergeSinkProps.icon));
};
var _default = exports.default = ImageLoading;