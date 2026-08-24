"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Sender = _interopRequireDefault(require("./Sender"));
var _SenderHeader = _interopRequireDefault(require("./SenderHeader"));
var _SenderSwitch = _interopRequireDefault(require("./SenderSwitch"));
const Sender = _Sender.default;
Sender.Header = _SenderHeader.default;
Sender.Switch = _SenderSwitch.default;
var _default = exports.default = Sender;