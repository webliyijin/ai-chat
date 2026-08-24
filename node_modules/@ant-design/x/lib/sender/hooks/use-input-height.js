"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _useToken = _interopRequireDefault(require("../../theme/useToken"));
const SENDER_INPUT_PADDING_HEIGHT = 4.35;
const useInputHeight = (styles, autoSize, editableRef) => {
  const {
    token
  } = (0, _useToken.default)();
  const computedStyle = editableRef.current ? window.getComputedStyle(editableRef.current) : {};
  const lineHeight = parseFloat(`${styles.lineHeight || token.lineHeight}`);
  const fontSize = parseFloat(`${computedStyle?.fontSize || styles.fontSize || token.fontSize}`);
  const height = computedStyle?.lineHeight ? parseFloat(`${computedStyle?.lineHeight}`) : lineHeight * fontSize;
  if (autoSize === false || !autoSize) {
    return {};
  }
  if (autoSize === true) {
    return {
      height: 'auto'
    };
  }
  return {
    minHeight: autoSize.minRows ? (height + SENDER_INPUT_PADDING_HEIGHT) * autoSize.minRows : 'auto',
    maxHeight: autoSize.maxRows ? (height + SENDER_INPUT_PADDING_HEIGHT) * autoSize.maxRows : 'auto',
    overflowY: 'auto'
  };
};
var _default = exports.default = useInputHeight;