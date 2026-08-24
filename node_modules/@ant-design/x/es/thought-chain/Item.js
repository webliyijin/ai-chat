import _extends from "@babel/runtime/helpers/esm/extends";
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';
import React from 'react';
import useProxyImperativeHandle from "../_util/hooks/use-proxy-imperative-handle";
import { useXProviderContext } from "../x-provider";
import Status, { THOUGHT_CHAIN_ITEM_STATUS } from "./Status";
import useStyle from "./style";
var VARIANT = /*#__PURE__*/function (VARIANT) {
  VARIANT["SOLID"] = "solid";
  VARIANT["OUTLINED"] = "outlined";
  VARIANT["TEXT"] = "text";
  return VARIANT;
}(VARIANT || {});
const Item = /*#__PURE__*/React.forwardRef((props, ref) => {
  // ============================ Info ============================
  const {
    key,
    blink,
    variant = 'solid',
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    classNames,
    style,
    styles,
    title,
    icon,
    status,
    onClick,
    description,
    disabled,
    ...restProps
  } = props;
  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true,
    data: true
  });
  const id = React.useId();

  // ============================= Refs =============================
  const itemRef = React.useRef(null);
  useProxyImperativeHandle(ref, () => {
    return {
      nativeElement: itemRef.current
    };
  });

  // ============================ Prefix ============================

  const {
    getPrefixCls,
    direction
  } = useXProviderContext();
  const prefixCls = getPrefixCls('thought-chain', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const itemCls = `${prefixCls}-item`;
  // ============================ Render ============================
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: itemRef,
    key: key || id,
    onClick: disabled ? undefined : onClick,
    style: style,
    className: clsx(prefixCls, hashId, className, cssVarCls, rootClassName, classNames?.root, itemCls, {
      [`${itemCls}-${variant}`]: variant,
      [`${itemCls}-click`]: !disabled && onClick,
      [`${itemCls}-error`]: status === THOUGHT_CHAIN_ITEM_STATUS.ERROR,
      [`${itemCls}-rtl`]: direction === 'rtl',
      [`${itemCls}-disabled`]: disabled
    })
  }, domProps), (status || icon) && /*#__PURE__*/React.createElement(Status, {
    style: styles?.icon,
    className: classNames?.icon,
    prefixCls: prefixCls,
    icon: icon,
    status: status
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(`${itemCls}-content`, {
      [`${prefixCls}-motion-blink`]: blink
    })
  }, title && /*#__PURE__*/React.createElement("div", {
    style: styles?.title,
    className: clsx(`${itemCls}-title`, classNames?.title, {
      [`${itemCls}-title-with-description`]: description
    })
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: styles?.description,
    className: clsx(`${itemCls}-description`, classNames?.description)
  }, description)));
});
export default Item;