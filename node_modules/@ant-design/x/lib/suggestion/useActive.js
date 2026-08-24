"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useActive;
var _util = require("@rc-component/util");
var _react = _interopRequireDefault(require("react"));
/**
 * Since Cascader not support ref active, we use `value` to mock the active item.
 */
function useActive(items, open, rtl, onCancel) {
  const [activePaths, setActivePaths] = _react.default.useState([]);

  /** Get items by column index */
  const getItems = (colIndex, paths = activePaths) => {
    let currentItems = items;
    for (let i = 0; i < colIndex - 1; i += 1) {
      const activePath = paths[i];
      const activeItem = currentItems.find(item => item.value === activePath);
      if (!activeItem) {
        break;
      }
      currentItems = activeItem.children || [];
    }
    return currentItems;
  };
  const offsetRow = offset => {
    const currentColIndex = activePaths.length || 1;
    const currentItems = getItems(currentColIndex);
    const currentRowIndex = currentItems.findIndex(item => item.value === activePaths[currentColIndex - 1]);
    const itemCount = currentItems.length;
    const nextItem = currentItems[(currentRowIndex + offset + itemCount) % itemCount];
    setActivePaths([...activePaths.slice(0, currentColIndex - 1), nextItem.value]);
  };
  const offsetPrev = () => {
    if (activePaths.length > 1) {
      setActivePaths(activePaths.slice(0, activePaths.length - 1));
    }
  };
  const offsetNext = () => {
    const nextItems = getItems(activePaths.length + 1);
    if (nextItems.length) {
      setActivePaths([...activePaths, nextItems[0].value]);
    }
  };
  const onKeyDown = (0, _util.useEvent)(e => {
    if (!open) {
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        offsetRow(1);
        e.preventDefault();
        break;
      case 'ArrowUp':
        offsetRow(-1);
        e.preventDefault();
        break;
      case 'ArrowRight':
        if (rtl) {
          offsetPrev();
        } else {
          offsetNext();
        }
        e.preventDefault();
        break;
      case 'ArrowLeft':
        if (rtl) {
          offsetNext();
        } else {
          offsetPrev();
        }
        e.preventDefault();
        break;
      case 'Enter':
        e.preventDefault();
        return false;
      case 'Escape':
        onCancel();
        e.preventDefault();
        break;
    }
  });
  _react.default.useEffect(() => {
    // 确保 items 是一个数组且至少有一个元素
    if (open && Array.isArray(items) && items.length > 0) {
      setActivePaths([items[0].value]);
    }
  }, [open, items]);
  return [activePaths, onKeyDown];
}