"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _util = require("@rc-component/util");
var _antd = require("antd");
var _clsx = require("clsx");
var _react = _interopRequireDefault(require("react"));
var _useXComponentConfig = _interopRequireDefault(require("../_util/hooks/use-x-component-config"));
var _xProvider = require("../x-provider");
var _style = _interopRequireDefault(require("./style"));
var _useActive = _interopRequireDefault(require("./useActive"));
function Suggestion(props) {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    classNames = {},
    styles = {},
    style,
    children,
    open,
    onOpenChange,
    items,
    onSelect,
    block,
    ...otherProps
  } = props;

  // ============================= MISC =============================
  const {
    direction,
    getPrefixCls
  } = (0, _xProvider.useXProviderContext)();
  const prefixCls = getPrefixCls('suggestion', customizePrefixCls);
  const itemCls = `${prefixCls}-item`;
  const isRTL = direction === 'rtl';

  // ===================== Component Config =========================
  const contextConfig = (0, _useXComponentConfig.default)('suggestion');

  // ============================ Styles ============================
  const [hashId, cssVarCls] = (0, _style.default)(prefixCls);

  // =========================== Trigger ============================
  const [mergedOpen, setOpen] = (0, _util.useControlledState)(false, open);
  const [itemList, setItemList] = (0, _util.useControlledState)(typeof items === 'function' ? items() : items, typeof items === 'function' ? undefined : items);
  const triggerOpen = nextOpen => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  const onTrigger = (0, _util.useEvent)(nextInfo => {
    if (nextInfo === false) {
      triggerOpen(false);
    } else {
      if (typeof items === 'function') {
        setItemList(items(nextInfo));
      }
      triggerOpen(true);
    }
  });
  const onClose = () => {
    triggerOpen(false);
  };

  // ============================ Items =============================

  // =========================== Cascader ===========================
  const optionRender = node => {
    return /*#__PURE__*/_react.default.createElement(_antd.Flex, {
      className: itemCls
    }, node.icon && /*#__PURE__*/_react.default.createElement("div", {
      className: `${itemCls}-icon`
    }, node.icon), node.label, node.extra && /*#__PURE__*/_react.default.createElement("div", {
      className: `${itemCls}-extra`
    }, node.extra));
  };
  const onInternalChange = (valuePath, selectedOptions) => {
    if (onSelect) {
      onSelect(valuePath[valuePath.length - 1], selectedOptions);
    }
    triggerOpen(false);
  };

  // ============================= a11y =============================
  const [activePath, onKeyDown] = (0, _useActive.default)(itemList, mergedOpen, isRTL, onClose);

  // =========================== Children ===========================
  const childNode = children?.({
    onTrigger,
    onKeyDown,
    open: mergedOpen
  });

  // ============================ Render ============================
  const onInternalOpenChange = nextOpen => {
    if (!nextOpen) {
      onClose();
    }
  };
  const compatibleProps = {};

  /* istanbul ignore else */

  compatibleProps.onOpenChange = onInternalOpenChange;
  return /*#__PURE__*/_react.default.createElement(_antd.Cascader, (0, _extends2.default)({}, otherProps, {
    options: itemList,
    open: mergedOpen,
    value: activePath,
    multiple: false,
    placement: isRTL ? 'topRight' : 'topLeft'
  }, compatibleProps, {
    optionRender: optionRender,
    rootClassName: (0, _clsx.clsx)(rootClassName, className, classNames.root, prefixCls, hashId, cssVarCls, {
      [`${prefixCls}-block`]: block
    }),
    classNames: {
      root: classNames.root,
      popup: {
        root: classNames.popup
      }
    },
    styles: {
      popup: {
        root: styles.popup
      }
    },
    style: {
      ...contextConfig.style,
      ...styles.root,
      ...style
    },
    onChange: onInternalChange,
    popupMatchSelectWidth: block
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _clsx.clsx)(prefixCls, rootClassName, contextConfig.classNames.content, classNames.content, `${prefixCls}-content`, hashId, cssVarCls),
    style: {
      ...contextConfig.styles.content,
      ...styles.content
    }
  }, childNode));
}
if (process.env.NODE_ENV !== 'production') {
  Suggestion.displayName = 'Suggestion';
}
var _default = exports.default = Suggestion;