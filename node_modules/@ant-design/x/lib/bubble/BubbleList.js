"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _omit = _interopRequireDefault(require("@rc-component/util/lib/omit"));
var _pickAttrs = _interopRequireDefault(require("@rc-component/util/lib/pickAttrs"));
var _clsx = require("clsx");
var React = _interopRequireWildcard(require("react"));
var _useProxyImperativeHandle = _interopRequireDefault(require("../_util/hooks/use-proxy-imperative-handle"));
var _xProvider = require("../x-provider");
var _Bubble = _interopRequireDefault(require("./Bubble"));
var _context = require("./context");
var _Divider = _interopRequireDefault(require("./Divider"));
var _useCompatibleScroll = require("./hooks/useCompatibleScroll");
var _System = _interopRequireDefault(require("./System"));
var _style = _interopRequireDefault(require("./style"));
function roleCfgIsFunction(roleCfg) {
  return typeof roleCfg === 'function' && roleCfg instanceof Function;
}
const MemoedBubble = /*#__PURE__*/React.memo(_Bubble.default);
const MemoedDividerBubble = /*#__PURE__*/React.memo(_Divider.default);
const MemoedSystemBubble = /*#__PURE__*/React.memo(_System.default);
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
  let bubble = /*#__PURE__*/React.createElement(MemoedBubble, (0, _extends2.default)({
    ref: initBubbleRef,
    style: rootStyle || bubbleStyle,
    className: rootClassName || bubbleClassName,
    classNames: otherClassNames,
    styles: otherStyles
  }, restProps));
  if (role === 'divider') {
    bubble = /*#__PURE__*/React.createElement(MemoedDividerBubble, (0, _extends2.default)({
      ref: initBubbleRef,
      style: rootStyle || dividerStyle,
      className: rootClassName || dividerClassName,
      classNames: otherClassNames,
      styles: otherStyles
    }, restProps));
  } else if (role === 'system') {
    bubble = /*#__PURE__*/React.createElement(MemoedSystemBubble, (0, _extends2.default)({
      ref: initBubbleRef,
      style: rootStyle || systemStyle,
      className: rootClassName || systemClassName,
      classNames: otherClassNames,
      styles: otherStyles
    }, restProps));
  }
  return /*#__PURE__*/React.createElement(_context.BubbleContext.Provider, {
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
  const domProps = (0, _pickAttrs.default)(restProps, {
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
  } = (0, _useCompatibleScroll.useCompatibleScroll)(scrollBoxDom, scrollContentDom);

  // ============================ Prefix ============================
  const {
    getPrefixCls
  } = (0, _xProvider.useXProviderContext)();
  const prefixCls = getPrefixCls('bubble', customizePrefixCls);
  const listPrefixCls = `${prefixCls}-list`;
  const [hashId, cssVarCls] = (0, _style.default)(prefixCls);
  const mergedClassNames = (0, _clsx.clsx)(listPrefixCls, rootClassName, className, classNames.root, hashId, cssVarCls);
  const mergedStyle = {
    ...styles.root,
    ...style
  };

  // ============================= Refs =============================
  (0, _useProxyImperativeHandle.default)(ref, () => {
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
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, domProps, {
    className: mergedClassNames,
    style: mergedStyle,
    ref: listRef
  }), /*#__PURE__*/React.createElement("div", {
    className: (0, _clsx.clsx)(`${listPrefixCls}-scroll-box`, classNames.scroll, {
      [`${listPrefixCls}-autoscroll`]: autoScroll
    }),
    style: styles.scroll,
    ref: node => setScrollBoxDom(node),
    onScroll: onScroll
  }, /*#__PURE__*/React.createElement("div", {
    ref: node => setScrollContentDom(node),
    className: (0, _clsx.clsx)(`${listPrefixCls}-scroll-content`)
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
    return /*#__PURE__*/React.createElement(BubbleListItem, (0, _extends2.default)({
      classNames: (0, _omit.default)(classNames, ['root', 'scroll']),
      styles: (0, _omit.default)(styles, ['root', 'scroll'])
    }, (0, _omit.default)(mergedProps, ['key']), {
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
var _default = exports.default = ForwardBubbleList;