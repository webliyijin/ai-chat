import _extends from "@babel/runtime/helpers/esm/extends";
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import * as React from 'react';
import ActionButton, { ActionButtonContext } from "../ActionButton";
import RecordingIcon from "./RecordingIcon";
const SpeechButton = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    speechRecording,
    disabled: rootDisabled,
    onSpeechDisabled,
    prefixCls
  } = React.useContext(ActionButtonContext);
  const mergedDisabled = props.disabled ?? rootDisabled ?? onSpeechDisabled;
  let icon = null;
  if (speechRecording) {
    icon = /*#__PURE__*/React.createElement(RecordingIcon, {
      className: `${prefixCls}-recording-icon`
    });
  } else if (mergedDisabled) {
    icon = /*#__PURE__*/React.createElement(AudioMutedOutlined, null);
  } else {
    icon = /*#__PURE__*/React.createElement(AudioOutlined, null);
  }
  return /*#__PURE__*/React.createElement(ActionButton, _extends({
    icon: icon,
    variant: "text",
    color: "primary"
  }, props, {
    action: "onSpeech",
    ref: ref
  }));
});
export default SpeechButton;