"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = require("react");
const useSlotBuilder = options => {
  const {
    prefixCls,
    placeholder,
    slotDomMap,
    slotConfigMap
  } = options;

  /**
   * 创建技能span元素
   * 用于创建技能输入区域
   */
  const buildSkillSpan = (0, _react.useCallback)(key => {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'false');
    span.dataset.skillKey = key;
    span.dataset.placeholder = placeholder || '';
    span.className = `${prefixCls}-skill`;
    return span;
  }, [prefixCls, placeholder]);

  /**
   * 创建可编辑的slot span元素
   * 用于content类型的slot
   */
  const buildEditSlotSpan = (0, _react.useCallback)(config => {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'true');
    span.dataset.slotKey = config.key;
    span.className = (0, _clsx.default)(`${prefixCls}-slot`, `${prefixCls}-slot-content`);
    return span;
  }, [prefixCls]);

  /**
   * 创建不可编辑的slot span元素
   * 用于普通slot
   */
  const buildSlotSpan = (0, _react.useCallback)(key => {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'false');
    span.dataset.slotKey = key;
    span.className = `${prefixCls}-slot`;
    return span;
  }, [prefixCls]);

  /**
   * 创建占位符span元素
   * 用于slot的前后占位
   */
  const buildSpaceSpan = (0, _react.useCallback)((slotKey, positions) => {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', 'false');
    span.dataset.slotKey = slotKey;
    span.dataset.nodeType = 'nbsp';
    span.className = (0, _clsx.default)(`${prefixCls}-slot-${positions}`, `${prefixCls}-slot-no-width`);
    span.textContent = '\u00A0';
    return span;
  }, [prefixCls]);
  const saveSlotDom = (key, dom) => {
    slotDomMap.current.set(key, dom);
  };
  const getSlotDom = key => {
    return slotDomMap.current.get(key);
  };
  const getSlotLastDom = (slotKey, slotType) => {
    const mergeSlotType = slotType ?? slotConfigMap.get(slotKey)?.type;
    if (mergeSlotType === 'content') {
      return getSlotDom(`${slotKey}_after`);
    }
    return getSlotDom(slotKey);
  };
  return {
    buildSkillSpan,
    buildEditSlotSpan,
    buildSlotSpan,
    buildSpaceSpan,
    saveSlotDom,
    getSlotDom,
    getSlotLastDom
  };
};
var _default = exports.default = useSlotBuilder;