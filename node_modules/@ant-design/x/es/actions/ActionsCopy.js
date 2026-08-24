import _extends from "@babel/runtime/helpers/esm/extends";
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { Typography } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import { useXProviderContext } from "../x-provider";
import useStyle from "./style";
const {
  Text
} = Typography;
const ActionsCopy = props => {
  const {
    text = '',
    icon,
    className,
    style,
    prefixCls: customizePrefixCls,
    rootClassName,
    classNames = {},
    styles = {},
    ...otherHtmlProps
  } = props;
  const domProps = pickAttrs(otherHtmlProps, {
    attr: true,
    aria: true,
    data: true
  });

  // ============================ Prefix ============================

  const {
    direction,
    getPrefixCls
  } = useXProviderContext();
  const prefixCls = getPrefixCls('actions', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const copyCls = `${prefixCls}-copy`;

  // ============================ Classname ============================

  const mergedCls = clsx(prefixCls, `${prefixCls}-item`, hashId, cssVarCls, rootClassName, className, classNames.root, {
    [`${copyCls}-rtl`]: direction === 'rtl'
  });
  return /*#__PURE__*/React.createElement(Text, _extends({}, domProps, {
    className: mergedCls,
    style: {
      ...style,
      ...styles.root
    },
    prefixCls: copyCls,
    copyable: {
      text,
      icon
    }
  }));
};
export default ActionsCopy;