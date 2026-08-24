"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const genActionsCopyStyle = token => {
  const {
    componentCls
  } = token;
  const copyCls = `${componentCls}-copy`;
  return {
    [componentCls]: {
      [`&${copyCls}-rtl`]: {
        direction: 'rtl'
      },
      [`${copyCls}-copy`]: {
        fontSize: 'inherit',
        [`&:not(${componentCls}-copy-success)`]: {
          color: 'inherit!important'
        }
      }
    }
  };
};
var _default = exports.default = genActionsCopyStyle;