import _extends from "@babel/runtime/helpers/esm/extends";
import { RightOutlined } from '@ant-design/icons';
import CSSMotion from '@rc-component/motion';
import { useControlledState } from '@rc-component/util';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { Popover } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import useProxyImperativeHandle from "../_util/hooks/use-proxy-imperative-handle";
import useXComponentConfig from "../_util/hooks/use-x-component-config";
import initCollapseMotion from "../_util/motion";
import { useXProviderContext } from "../x-provider";
import CarouselCard from "./components/CarouselCard";
import useStyle from "./style";
const Sources = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    style,
    styles = {},
    className,
    rootClassName,
    classNames = {},
    title,
    expandIconPosition = 'start',
    children,
    inline = false,
    expanded,
    defaultExpanded,
    onExpand,
    activeKey,
    items,
    popoverOverlayWidth = 300,
    ...restProps
  } = props;

  // ============================ Prefix ============================

  const {
    direction,
    getPrefixCls
  } = useXProviderContext();
  const prefixCls = getPrefixCls('sources', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  // ======================= Component Config =======================

  const contextConfig = useXComponentConfig('sources');
  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true,
    data: true
  });

  // ============================= Refs =============================
  const sourcesRef = React.useRef(null);
  useProxyImperativeHandle(ref, () => {
    return {
      nativeElement: sourcesRef.current
    };
  });
  const mergedCls = clsx(prefixCls, contextConfig.className, className, rootClassName, classNames.root, hashId, cssVarCls, {
    [`${prefixCls}-inline`]: inline,
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });

  // ============================  Collapsible ============================

  const [isExpand, setIsExpand] = useControlledState(defaultExpanded ?? true, expanded);
  const collapseMotion = {
    ...initCollapseMotion(),
    motionAppear: false,
    leavedClassName: `${prefixCls}-content-hidden`
  };
  const ContentNode = items ? /*#__PURE__*/React.createElement("ul", {
    className: `${prefixCls}-list`
  }, items.map((item, index) => /*#__PURE__*/React.createElement("li", {
    key: item.key || index,
    className: `${prefixCls}-list-item`,
    onClick: () => props.onClick?.(item)
  }, /*#__PURE__*/React.createElement("a", {
    className: `${prefixCls}-link`,
    href: item.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, item.icon && /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-link-icon`
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-link-title`
  }, item.title))))) : children;
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: sourcesRef
  }, domProps, {
    className: mergedCls,
    style: {
      ...contextConfig.style,
      ...contextConfig.styles.root,
      ...style,
      ...styles.root
    }
  }), inline ? /*#__PURE__*/React.createElement(Popover, {
    content: /*#__PURE__*/React.createElement(CarouselCard, {
      className: clsx(prefixCls, hashId, cssVarCls, classNames.content),
      style: styles.content,
      activeKey: activeKey,
      prefixCls: prefixCls,
      items: items,
      onClick: props.onClick
    }),
    open: inline ? undefined : false,
    styles: {
      container: {
        width: popoverOverlayWidth
      }
    },
    placement: "top",
    forceRender: true
  }, /*#__PURE__*/React.createElement("div", {
    className: clsx(prefixCls, `${prefixCls}-title-wrapper`, classNames.title),
    style: styles.title
  }, /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-title`
  }, title))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: clsx(`${prefixCls}-title-wrapper`, `${prefixCls}-icon-position-${expandIconPosition}`, classNames.title),
    onClick: () => {
      const newExpand = !isExpand;
      setIsExpand(newExpand);
      onExpand?.(newExpand);
    },
    style: styles.title
  }, /*#__PURE__*/React.createElement(RightOutlined, {
    className: `${prefixCls}-title-down-icon`,
    rotate: isExpand ? 90 : 0
  }), /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-title`
  }, title)), /*#__PURE__*/React.createElement(CSSMotion, _extends({}, collapseMotion, {
    visible: isExpand
  }), ({
    className: motionClassName,
    style
  }, motionRef) => /*#__PURE__*/React.createElement("div", {
    className: clsx(`${prefixCls}-content`, motionClassName, classNames.content),
    ref: motionRef,
    style: {
      ...style,
      ...styles.content
    }
  }, ContentNode))));
};
const ForwardSources = /*#__PURE__*/React.forwardRef(Sources);
if (process.env.NODE_ENV !== 'production') {
  ForwardSources.displayName = 'Sources';
}
export default ForwardSources;