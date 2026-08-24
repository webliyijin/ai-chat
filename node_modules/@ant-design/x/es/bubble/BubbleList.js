import _extends from "@babel/runtime/helpers/esm/extends";
import omit from '@rc-component/util/lib/omit';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { clsx } from 'clsx';
import * as React from 'react';
import useProxyImperativeHandle from "../_util/hooks/use-proxy-imperative-handle";
import { useXProviderContext } from "../x-provider";
import Bubble from "./Bubble";
import { BubbleContext } from "./context";
import DividerBubble from "./Divider";
import { useCompatibleScroll } from "./hooks/useCompatibleScroll";
import SystemBubble from "./System";
import useBubbleListStyle from "./style";
function roleCfgIsFunction(roleCfg) {
  return typeof roleCfg === 'function' && roleCfg instanceof Function;
}
const MemoedBubble = /*#__PURE__*/React.memo(Bubble);
const MemoedDividerBubble = /*#__PURE__*/React.memo(DividerBubble);
const MemoedSystemBubble = /*#__PURE__*/React.memo(SystemBubble);
const BubbleListItem = props => {
  const {
    _key,
    bubblesRef,
    extraInfo,
    status,
    role,
    classNames = {},
    styles = {},
    ...restProps
  } = props;
  const initBubbleRef = React.useCallback(node => {
    if (node) {
      bubblesRef.current[_key] = node;
    } else {
      delete bubblesRef.current[_key];
    }
  }, [_key]);
  const {
    root: rootClassName,
    // 从 items 配置中获得
    // 从 Bubble.List 中获得
    bubble: bubbleClassName,
    divider: dividerClassName,
    system: systemClassName,
    ...otherClassNames
  } = classNames;
  const {
    root: rootStyle,
    // 从 items 配置中获得
    // 从 Bubble.List 中获得
    bubble: bubbleStyle,
    divider: dividerStyle,
    system: systemStyle,
    ...otherStyles
  } = styles;

  // items 配置优先级更高，覆盖
  let bubble = /*#__PURE__*/React.createElement(MemoedBubble, _extends({
    ref: initBubbleRef,
    style: rootStyle || bubbleStyle,
    className: rootClassName || bubbleClassName,
    classNames: otherClassNames,
    styles: otherStyles
  }, restProps));
  if (role === 'divider') {
    bubble = /*#__PURE__*/React.createElement(MemoedDividerBubble, _extends({
      ref: initBubbleRef,
      style: rootStyle || dividerStyle,
      className: rootClassName || dividerClassName,
      classNames: otherClassNames,
      styles: otherStyles
    }, restProps));
  } else if (role === 'system') {
    bubble = /*#__PURE__*/React.createElement(MemoedSystemBubble, _extends({
      ref: initBubbleRef,
      style: rootStyle || systemStyle,
      className: rootClassName || systemClassName,
      classNames: otherClassNames,
      styles: otherStyles
    }, restProps));
  }
  return /*#__PURE__*/React.createElement(BubbleContext.Provider, {
    value: {
      key: _key,
      status,
      extraInfo
    }
  }, bubble);
};
const BubbleList = (props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    styles = {},
    classNames = {},
    style,
    items,
    autoScroll = true,
    role,
    onScroll,
    ...restProps
  } = props;
  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true
  });

  // ============================= Refs =============================
  const listRef = React.useRef(null);
  const bubblesRef = React.useRef({});

  // ============================= States =============================
  const [scrollBoxDom, setScrollBoxDom] = React.useState();
  const [scrollContentDom, setScrollContentDom] = React.useState();
  const {
    scrollTo
  } = useCompatibleScroll(scrollBoxDom, scrollContentDom);

  // ============================ Prefix ============================
  const {
    getPrefixCls
  } = useXProviderContext();
  const prefixCls = getPrefixCls('bubble', customizePrefixCls);
  const listPrefixCls = `${prefixCls}-list`;
  const [hashId, cssVarCls] = useBubbleListStyle(prefixCls);
  const mergedClassNames = clsx(listPrefixCls, rootClassName, className, classNames.root, hashId, cssVarCls);
  const mergedStyle = {
    ...styles.root,
    ...style
  };

  // ============================= Refs =============================
  useProxyImperativeHandle(ref, () => {
    return {
      nativeElement: listRef.current,
      scrollBoxNativeElement: scrollBoxDom,
      scrollTo: ({
        key,
        top,
        behavior = 'smooth',
        block
      }) => {
        const {
          scrollHeight,
          clientHeight
        } = scrollBoxDom;
        if (typeof top === 'number') {
          scrollTo({
            top: autoScroll ? -scrollHeight + clientHeight + top : top,
            behavior
          });
        } else if (top === 'bottom') {
          const bottomOffset = autoScroll ? 0 : scrollHeight;
          scrollTo({
            top: bottomOffset,
            behavior
          });
        } else if (top === 'top') {
          const topOffset = autoScroll ? -scrollHeight : 0;
          scrollTo({
            top: topOffset,
            behavior
          });
        } else if (key && bubblesRef.current[key]) {
          scrollTo({
            intoView: {
              behavior,
              block
            },
            intoViewDom: bubblesRef.current[key].nativeElement
          });
        }
      }
    };
  });

  // ============================ Render ============================
  return /*#__PURE__*/React.createElement("div", _extends({}, domProps, {
    className: mergedClassNames,
    style: mergedStyle,
    ref: listRef
  }), /*#__PURE__*/React.createElement("div", {
    className: clsx(`${listPrefixCls}-scroll-box`, classNames.scroll, {
      [`${listPrefixCls}-autoscroll`]: autoScroll
    }),
    style: styles.scroll,
    ref: node => setScrollBoxDom(node),
    onScroll: onScroll
  }, /*#__PURE__*/React.createElement("div", {
    ref: node => setScrollContentDom(node),
    className: clsx(`${listPrefixCls}-scroll-content`)
  }, items.map(item => {
    let mergedProps;
    if (item.role && role) {
      const cfg = role[item.role];
      mergedProps = {
        ...(roleCfgIsFunction(cfg) ? cfg(item) : cfg),
        ...item
      };
    } else {
      mergedProps = item;
    }
    return /*#__PURE__*/React.createElement(BubbleListItem, _extends({
      classNames: omit(classNames, ['root', 'scroll']),
      styles: omit(styles, ['root', 'scroll'])
    }, omit(mergedProps, ['key']), {
      key: item.key,
      _key: item.key,
      bubblesRef: bubblesRef
    }));
  }))));
};
const ForwardBubbleList = /*#__PURE__*/React.forwardRef(BubbleList);
if (process.env.NODE_ENV !== 'production') {
  ForwardBubbleList.displayName = 'BubbleList';
}
export default ForwardBubbleList;