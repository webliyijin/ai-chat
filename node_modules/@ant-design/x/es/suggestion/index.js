import _extends from "@babel/runtime/helpers/esm/extends";
import { useControlledState, useEvent } from '@rc-component/util';
import { Cascader, Flex } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import useXComponentConfig from "../_util/hooks/use-x-component-config";
import { useXProviderContext } from "../x-provider";
import useStyle from "./style";
import useActive from "./useActive";
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
  } = useXProviderContext();
  const prefixCls = getPrefixCls('suggestion', customizePrefixCls);
  const itemCls = `${prefixCls}-item`;
  const isRTL = direction === 'rtl';

  // ===================== Component Config =========================
  const contextConfig = useXComponentConfig('suggestion');

  // ============================ Styles ============================
  const [hashId, cssVarCls] = useStyle(prefixCls);

  // =========================== Trigger ============================
  const [mergedOpen, setOpen] = useControlledState(false, open);
  const [itemList, setItemList] = useControlledState(typeof items === 'function' ? items() : items, typeof items === 'function' ? undefined : items);
  const triggerOpen = nextOpen => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  const onTrigger = useEvent(nextInfo => {
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
    return /*#__PURE__*/React.createElement(Flex, {
      className: itemCls
    }, node.icon && /*#__PURE__*/React.createElement("div", {
      className: `${itemCls}-icon`
    }, node.icon), node.label, node.extra && /*#__PURE__*/React.createElement("div", {
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
  const [activePath, onKeyDown] = useActive(itemList, mergedOpen, isRTL, onClose);

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
  return /*#__PURE__*/React.createElement(Cascader, _extends({}, otherProps, {
    options: itemList,
    open: mergedOpen,
    value: activePath,
    multiple: false,
    placement: isRTL ? 'topRight' : 'topLeft'
  }, compatibleProps, {
    optionRender: optionRender,
    rootClassName: clsx(rootClassName, className, classNames.root, prefixCls, hashId, cssVarCls, {
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
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(prefixCls, rootClassName, contextConfig.classNames.content, classNames.content, `${prefixCls}-content`, hashId, cssVarCls),
    style: {
      ...contextConfig.styles.content,
      ...styles.content
    }
  }, childNode));
}
if (process.env.NODE_ENV !== 'production') {
  Suggestion.displayName = 'Suggestion';
}
export default Suggestion;