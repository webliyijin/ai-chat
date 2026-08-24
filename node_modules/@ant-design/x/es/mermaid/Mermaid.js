import { DownloadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Button, Segmented, Tooltip } from 'antd';
import { clsx } from 'clsx';
import throttle from 'lodash.throttle';
import mermaid from 'mermaid';
import React, { useEffect, useRef, useState } from 'react';
import useXComponentConfig from "../_util/hooks/use-x-component-config";
import warning from "../_util/warning";
import Actions from "../actions";
import CodeHighlighter from "../code-highlighter";
import locale_EN from "../locale/en_US";
import useLocale from "../locale/useLocale";
import { useXProviderContext } from "../x-provider";
import useStyle from "./style";
var RenderType = /*#__PURE__*/function (RenderType) {
  RenderType["Code"] = "code";
  RenderType["Image"] = "image";
  return RenderType;
}(RenderType || {});
let uuid = 0;
const Mermaid = /*#__PURE__*/React.memo(props => {
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
  const [renderType, setRenderType] = useState(RenderType.Image);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({
    x: 0,
    y: 0
  });
  const containerRef = useRef(null);
  const id = `mermaid-${uuid++}-${children?.length || 0}`;

  // ============================ locale ============================
  const [contextLocale] = useLocale('Mermaid', locale_EN.Mermaid);

  // ============================ Prefix ============================
  const {
    getPrefixCls,
    direction
  } = useXProviderContext();
  const prefixCls = getPrefixCls('mermaid', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  // ===================== Component Config =========================
  const contextConfig = useXComponentConfig('mermaid');

  // ============================ style ============================
  const mergedCls = clsx(prefixCls, contextConfig.className, contextConfig.classNames?.root, className, classNames.root, hashId, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });

  // ============================ initialize mermaid ============================
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'default',
      fontFamily: 'monospace',
      ...(config || {})
    });
  }, [config]);

  // ============================ render mermaid ============================
  const renderDiagram = throttle(async () => {
    if (!children || !containerRef.current || renderType === RenderType.Code) return;
    try {
      const isValid = await mermaid.parse(children, {
        suppressErrors: true
      });
      if (!isValid) throw new Error('Invalid Mermaid syntax');
      const {
        svg
      } = await mermaid.render(id, children);
      containerRef.current.innerHTML = svg;
    } catch (error) {
      warning(false, 'Mermaid', `Render failed: ${error}`);
    }
  }, 100);
  useEffect(() => {
    if (renderType === RenderType.Code && containerRef.current) {
      // 清理图表内容，避免在代码视图下出现渲染错误
      containerRef.current.innerHTML = '';
    } else {
      renderDiagram();
    }
  }, [children, renderType, config]);
  useEffect(() => {
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
  useEffect(() => {
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
          icon: /*#__PURE__*/React.createElement(ZoomInOutlined, null),
          label: contextLocale.zoomIn,
          onItemClick: handleZoomIn
        }, {
          key: 'zoomOut',
          icon: /*#__PURE__*/React.createElement(ZoomOutOutlined, null),
          label: contextLocale.zoomOut,
          onItemClick: handleZoomOut
        }, {
          key: 'zoomReset',
          actionRender: () => /*#__PURE__*/React.createElement(Tooltip, {
            title: contextLocale.zoomReset
          }, /*#__PURE__*/React.createElement(Button, {
            type: "text",
            size: "small",
            onClick: handleReset
          }, contextLocale.zoomReset))
        });
      }
      if (enableDownload) {
        items.push({
          key: 'download',
          icon: /*#__PURE__*/React.createElement(DownloadOutlined, null),
          label: contextLocale.download,
          onItemClick: handleDownload
        });
      }
    } else {
      if (enableCopy) {
        items.push({
          key: 'copy',
          actionRender: () => /*#__PURE__*/React.createElement(Actions.Copy, {
            text: children
          })
        });
      }
    }
    const allItems = [...items, ...customActions];
    return /*#__PURE__*/React.createElement("div", {
      className: clsx(`${prefixCls}-header`, contextConfig.classNames?.header, classNames?.header),
      style: {
        ...contextConfig.styles?.header,
        ...styles.header
      }
    }, /*#__PURE__*/React.createElement(Segmented, {
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
    }), /*#__PURE__*/React.createElement(Actions, {
      items: allItems
    }));
  };
  const renderContent = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: clsx(`${prefixCls}-graph`, contextConfig.classNames?.graph, renderType === RenderType.Code && `${prefixCls}-graph-hidden`, classNames?.graph),
      style: {
        ...contextConfig.styles?.graph,
        ...styles.graph
      },
      ref: containerRef,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp
    }), renderType === RenderType.Code ? /*#__PURE__*/React.createElement("div", {
      className: clsx(`${prefixCls}-code`, contextConfig.classNames?.code, classNames?.code),
      style: {
        ...contextConfig.styles?.code,
        ...styles.code
      }
    }, /*#__PURE__*/React.createElement(CodeHighlighter, {
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
  return /*#__PURE__*/React.createElement("div", {
    className: mergedCls,
    style: {
      ...style,
      ...contextConfig.style,
      ...contextConfig.styles?.root,
      ...styles.root
    }
  }, renderHeader(), renderContent());
});
export default Mermaid;