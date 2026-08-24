"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _antd = require("antd");
var _clsx = require("clsx");
var _lodash = _interopRequireDefault(require("lodash.throttle"));
var _mermaid = _interopRequireDefault(require("mermaid"));
var _react = _interopRequireWildcard(require("react"));
var _useXComponentConfig = _interopRequireDefault(require("../_util/hooks/use-x-component-config"));
var _warning = _interopRequireDefault(require("../_util/warning"));
var _actions = _interopRequireDefault(require("../actions"));
var _codeHighlighter = _interopRequireDefault(require("../code-highlighter"));
var _en_US = _interopRequireDefault(require("../locale/en_US"));
var _useLocale = _interopRequireDefault(require("../locale/useLocale"));
var _xProvider = require("../x-provider");
var _style = _interopRequireDefault(require("./style"));
var RenderType = /*#__PURE__*/function (RenderType) {
  RenderType["Code"] = "code";
  RenderType["Image"] = "image";
  return RenderType;
}(RenderType || {});
let uuid = 0;
const Mermaid = /*#__PURE__*/_react.default.memo(props => {
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    classNames = {},
    styles = {},
    header,
    children,
    highlightProps,
    config,
    actions = {},
    onRenderTypeChange
  } = props;
  const [renderType, setRenderType] = (0, _react.useState)(RenderType.Image);
  const [scale, setScale] = (0, _react.useState)(1);
  const [position, setPosition] = (0, _react.useState)({
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = (0, _react.useState)(false);
  const [lastMousePos, setLastMousePos] = (0, _react.useState)({
    x: 0,
    y: 0
  });
  const containerRef = (0, _react.useRef)(null);
  const id = `mermaid-${uuid++}-${children?.length || 0}`;

  // ============================ locale ============================
  const [contextLocale] = (0, _useLocale.default)('Mermaid', _en_US.default.Mermaid);

  // ============================ Prefix ============================
  const {
    getPrefixCls,
    direction
  } = (0, _xProvider.useXProviderContext)();
  const prefixCls = getPrefixCls('mermaid', customizePrefixCls);
  const [hashId, cssVarCls] = (0, _style.default)(prefixCls);

  // ===================== Component Config =========================
  const contextConfig = (0, _useXComponentConfig.default)('mermaid');

  // ============================ style ============================
  const mergedCls = (0, _clsx.clsx)(prefixCls, contextConfig.className, contextConfig.classNames?.root, className, classNames.root, hashId, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });

  // ============================ initialize mermaid ============================
  (0, _react.useEffect)(() => {
    _mermaid.default.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'default',
      fontFamily: 'monospace',
      ...(config || {})
    });
  }, [config]);

  // ============================ render mermaid ============================
  const renderDiagram = (0, _lodash.default)(async () => {
    if (!children || !containerRef.current || renderType === RenderType.Code) return;
    try {
      const isValid = await _mermaid.default.parse(children, {
        suppressErrors: true
      });
      if (!isValid) throw new Error('Invalid Mermaid syntax');
      const {
        svg
      } = await _mermaid.default.render(id, children);
      containerRef.current.innerHTML = svg;
    } catch (error) {
      (0, _warning.default)(false, 'Mermaid', `Render failed: ${error}`);
    }
  }, 100);
  (0, _react.useEffect)(() => {
    if (renderType === RenderType.Code && containerRef.current) {
      // 清理图表内容，避免在代码视图下出现渲染错误
      containerRef.current.innerHTML = '';
    } else {
      renderDiagram();
    }
  }, [children, renderType, config]);
  (0, _react.useEffect)(() => {
    const container = containerRef.current;
    if (!container || renderType !== RenderType.Image) return;
    const {
      enableZoom = true
    } = actions;
    if (!enableZoom) return;
    let lastTime = 0;
    const wheelHandler = e => {
      e.preventDefault();
      e.stopPropagation();
      const now = Date.now();
      if (now - lastTime < 16) return;
      lastTime = now;
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
    };
    container.addEventListener('wheel', wheelHandler, {
      passive: false
    });
    return () => {
      container.removeEventListener('wheel', wheelHandler);
    };
  }, [renderType, actions]);
  (0, _react.useEffect)(() => {
    if (containerRef.current && renderType === RenderType.Image) {
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        svg.style.transform = `scale(${scale}) translate(${position.x}px, ${position.y}px)`;
        svg.style.transformOrigin = 'center';
        svg.style.transition = isDragging ? 'none' : 'transform 0.1s ease-out';
        svg.style.cursor = isDragging ? 'grabbing' : 'grab';
      }
    }
  }, [scale, position, renderType, isDragging]);

  // 鼠标拖动事件处理
  const handleMouseDown = e => {
    if (renderType !== RenderType.Image) return;
    e.preventDefault();
    setIsDragging(true);
    setLastMousePos({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleMouseMove = e => {
    if (!isDragging || renderType !== RenderType.Image) return;
    e.preventDefault();
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    setPosition(prev => ({
      x: prev.x + deltaX / scale,
      y: prev.y + deltaY / scale
    }));
    setLastMousePos({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleReset = () => {
    setScale(1);
    setPosition({
      x: 0,
      y: 0
    });
  };

  // ============================ render content ============================
  if (!children) {
    return null;
  }
  const handleDownload = async () => {
    const svgElement = containerRef.current?.querySelector('svg');
    if (!svgElement) return;
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const {
      width,
      height
    } = svgElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      const link = document.createElement('a');
      link.download = `${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1);
      link.click();
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  };
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };
  const renderHeader = () => {
    if (header === null) return null;
    if (header) return header;
    const {
      enableZoom = true,
      enableDownload = true,
      enableCopy = true,
      customActions = []
    } = actions;
    const items = [];
    if (renderType === RenderType.Image) {
      if (enableZoom) {
        items.push({
          key: 'zoomIn',
          icon: /*#__PURE__*/_react.default.createElement(_icons.ZoomInOutlined, null),
          label: contextLocale.zoomIn,
          onItemClick: handleZoomIn
        }, {
          key: 'zoomOut',
          icon: /*#__PURE__*/_react.default.createElement(_icons.ZoomOutOutlined, null),
          label: contextLocale.zoomOut,
          onItemClick: handleZoomOut
        }, {
          key: 'zoomReset',
          actionRender: () => /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
            title: contextLocale.zoomReset
          }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
            type: "text",
            size: "small",
            onClick: handleReset
          }, contextLocale.zoomReset))
        });
      }
      if (enableDownload) {
        items.push({
          key: 'download',
          icon: /*#__PURE__*/_react.default.createElement(_icons.DownloadOutlined, null),
          label: contextLocale.download,
          onItemClick: handleDownload
        });
      }
    } else {
      if (enableCopy) {
        items.push({
          key: 'copy',
          actionRender: () => /*#__PURE__*/_react.default.createElement(_actions.default.Copy, {
            text: children
          })
        });
      }
    }
    const allItems = [...items, ...customActions];
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _clsx.clsx)(`${prefixCls}-header`, contextConfig.classNames?.header, classNames?.header),
      style: {
        ...contextConfig.styles?.header,
        ...styles.header
      }
    }, /*#__PURE__*/_react.default.createElement(_antd.Segmented, {
      options: [{
        label: contextLocale.image,
        value: RenderType.Image
      }, {
        label: contextLocale.code,
        value: RenderType.Code
      }],
      value: renderType,
      onChange: value => {
        setRenderType(value);
        onRenderTypeChange?.(value);
      }
    }), /*#__PURE__*/_react.default.createElement(_actions.default, {
      items: allItems
    }));
  };
  const renderContent = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _clsx.clsx)(`${prefixCls}-graph`, contextConfig.classNames?.graph, renderType === RenderType.Code && `${prefixCls}-graph-hidden`, classNames?.graph),
      style: {
        ...contextConfig.styles?.graph,
        ...styles.graph
      },
      ref: containerRef,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp
    }), renderType === RenderType.Code ? /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _clsx.clsx)(`${prefixCls}-code`, contextConfig.classNames?.code, classNames?.code),
      style: {
        ...contextConfig.styles?.code,
        ...styles.code
      }
    }, /*#__PURE__*/_react.default.createElement(_codeHighlighter.default, {
      lang: "mermaid",
      header: null,
      styles: {
        code: {
          background: 'transparent',
          border: 'none',
          borderRadius: 0
        }
      },
      highlightProps: {
        customStyle: {
          padding: 0,
          background: 'transparent'
        },
        ...highlightProps
      }
    }, children)) : null);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: mergedCls,
    style: {
      ...style,
      ...contextConfig.style,
      ...contextConfig.styles?.root,
      ...styles.root
    }
  }, renderHeader(), renderContent());
});
var _default = exports.default = Mermaid;