"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _antd = require("antd");
var _react = _interopRequireDefault(require("react"));
/**
 * SilentUploader is only wrap children with antd Upload component.
 */
const SilentUploader = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
    children,
    upload,
    className,
    style,
    visible
  } = props;
  const uploadRef = _react.default.useRef(null);
  _react.default.useImperativeHandle(ref, () => uploadRef.current);

  // ============================ Render ============================
  return /*#__PURE__*/_react.default.createElement(_antd.Upload, (0, _extends2.default)({}, upload, {
    showUploadList: false,
    className: className,
    style: {
      ...style,
      ...(visible === false ? {
        display: 'none'
      } : {})
    },
    ref: uploadRef
  }), children);
});
var _default = exports.default = SilentUploader;