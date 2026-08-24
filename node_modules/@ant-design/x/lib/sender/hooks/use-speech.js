"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useSpeech;
var _util = require("@rc-component/util");
var _react = _interopRequireDefault(require("react"));
var _warning = _interopRequireDefault(require("../../_util/warning"));
function useSpeech(onSpeech, allowSpeech) {
  const onEventSpeech = (0, _util.useEvent)(onSpeech);
  // ========================== Speech Config ==========================
  const [controlledRecording, onControlledRecordingChange, speechInControlled] = _react.default.useMemo(() => {
    if (typeof allowSpeech === 'object') {
      return [allowSpeech.recording, allowSpeech.onRecordingChange, typeof allowSpeech.recording === 'boolean'];
    }
    return [undefined, undefined, false];
  }, [allowSpeech]);

  // ======================== Speech Permission ========================
  const [permissionState, setPermissionState] = _react.default.useState(null);
  _react.default.useEffect(() => {
    if (!speechInControlled && 'permissions' in navigator) {
      let lastPermission = null;
      navigator.permissions.query({
        name: 'microphone'
      }).then(permissionStatus => {
        setPermissionState(permissionStatus.state);

        // Keep the last permission status.
        permissionStatus.onchange = function () {
          setPermissionState(this.state);
        };
        lastPermission = permissionStatus;
      }).catch(error => {
        const message = error instanceof Error ? error.message : String(error);
        (0, _warning.default)(false, 'Sender', `Browser does not support querying microphone permission. ${message}`);
      });
      return () => {
        // Avoid memory leaks
        if (lastPermission) {
          lastPermission.onchange = null;
        }
      };
    }
  }, [speechInControlled]);

  // Ensure that the SpeechRecognition API is available in the browser
  let SpeechRecognition;
  if (!SpeechRecognition && typeof window !== 'undefined') {
    SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  }

  // Convert permission state to a simple type
  const mergedAllowSpeech = !!(speechInControlled || SpeechRecognition && permissionState !== 'denied');

  // ========================== Speech Events ==========================
  const recognitionRef = _react.default.useRef(null);
  const [recording, setRecording] = (0, _util.useControlledState)(false, controlledRecording);
  const forceBreakRef = _react.default.useRef(false);
  const ensureRecognition = () => {
    if (mergedAllowSpeech && !recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.onstart = () => {
        setRecording(true);
      };
      recognition.onend = () => {
        setRecording(false);
      };
      recognition.onresult = event => {
        if (!forceBreakRef.current) {
          const transcript = event.results?.[0]?.[0]?.transcript;
          onEventSpeech(transcript);
        }
        forceBreakRef.current = false;
      };
      recognitionRef.current = recognition;
    }
  };
  const triggerSpeech = (0, _util.useEvent)(forceBreak => {
    // Ignore if `forceBreak` but is not recording
    if (forceBreak && !recording) {
      return;
    }
    forceBreakRef.current = forceBreak;
    if (speechInControlled) {
      // If in controlled mode, do nothing
      onControlledRecordingChange?.(!recording);
    } else {
      ensureRecognition();
      if (recognitionRef.current) {
        if (recording) {
          recognitionRef.current.stop();
          onControlledRecordingChange?.(false);
        } else {
          recognitionRef.current.start();
          onControlledRecordingChange?.(true);
        }
      }
    }
  });
  return [mergedAllowSpeech, triggerSpeech, recording];
}