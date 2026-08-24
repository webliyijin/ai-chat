import _extends from "@babel/runtime/helpers/esm/extends";
import { Flex, Skeleton, Spin } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import ImageIcon from "./ImageIcon";
import usePercent from "./usePercent";
const ImageLoading = props => {
  const {
    style,
    className,
    prefixCls,
    spinProps
  } = props;
  const [mergedPercent, percentText] = usePercent(true, typeof spinProps?.percent === 'undefined' ? 'auto' : spinProps?.percent);
  const mergeSinkProps = React.useMemo(() => ({
    size: 'middle',
    showText: true,
    icon: /*#__PURE__*/React.createElement(ImageIcon, {
      color: "rgba(0,0,0,.45)",
      size: spinProps?.size || 'middle'
    }),
    ...spinProps
  }), [spinProps]);
  return /*#__PURE__*/React.createElement("div", {
    className: clsx(`${prefixCls}-image-loading`, className),
    style: style
  }, /*#__PURE__*/React.createElement(Skeleton.Node, {
    styles: {
      root: {
        width: '100%',
        height: '100%'
      },
      content: {
        width: '100%',
        height: '100%'
      }
    },
    rootClassName: clsx(`${prefixCls}-image-skeleton`),
    active: true
  }, /*#__PURE__*/React.createElement(Flex, {
    className: clsx(`${prefixCls}-image-spin`, {
      [`${prefixCls}-image-spin-${mergeSinkProps.size}`]: mergeSinkProps.size
    }),
    align: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Spin, _extends({
    percent: mergedPercent
  }, spinProps)), mergeSinkProps.showText && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-image-spin-text`
  }, percentText)), mergeSinkProps.icon));
};
export default ImageLoading;