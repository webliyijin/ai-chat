"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _icons = require("@ant-design/icons");
var React = _interopRequireWildcard(require("react"));
var _ActionButton = _interopRequireWildcard(require("../ActionButton"));
var _RecordingIcon = _interopRequireDefault(require("./RecordingIcon"));
const SpeechButton = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    speechRecording,
    disabled: rootDisabled,
    onSpeechDisabled,
    prefixCls
  } = React.useContext(_ActionButton.ActionButtonContext);
  const mergedDisabled = props.disabled ?? rootDisabled ?? onSpeechDisabled;
  let icon = null;
  if (speechRecording) {
    icon = /*#__PURE__*/React.createElement(_RecordingIcon.default, {
      className: `${prefixCls}-recording-icon`
    });
  } else if (mergedDisabled) {
    icon = /*#__PURE__*/React.createElement(_icons.AudioMutedOutlined, null);
  } else {
    icon = /*#__PURE__*/React.createElement(_icons.AudioOutlined, null);
  }
  return /*#__PURE__*/React.createElement(_ActionButton.default, (0, _extends2.default)({
    icon: icon,
    variant: "text",
    color: "primary"
  }, props, {
    action: "onSpeech",
    ref: ref
  }));
});
var _default = exports.default = SpeechButton;