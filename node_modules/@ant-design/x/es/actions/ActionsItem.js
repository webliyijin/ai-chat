import _extends from "@babel/runtime/helpers/esm/extends";
import { CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { Tooltip } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import { useXProviderContext } from "../x-provider";
import useStyle from "./style";
export let ACTIONS_ITEM_STATUS = /*#__PURE__*/function (ACTIONS_ITEM_STATUS) {
  ACTIONS_ITEM_STATUS["LOADING"] = "loading";
  ACTIONS_ITEM_STATUS["ERROR"] = "error";
  ACTIONS_ITEM_STATUS["RUNNING"] = "running";
  ACTIONS_ITEM_STATUS["DEFAULT"] = "default";
  return ACTIONS_ITEM_STATUS;
}({});
const ActionsItem = props => {
  const {
    status = 'default',
    defaultIcon,
    runningIcon,
    label,
    className,
    classNames = {},
    styles = {},
    style,
    prefixCls: customizePrefixCls,
    rootClassName,
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
  const itemCls = `${prefixCls}-button-item`;

  // ============================ Classname ============================

  const mergedCls = clsx(itemCls, hashId, cssVarCls, rootClassName, className, classNames.root, prefixCls, `${prefixCls}-item`, {
    [`${itemCls}-rtl`]: direction === 'rtl',
    [`${classNames[status]}`]: classNames[status]
  });
  const StatusIcon = {
    [ACTIONS_ITEM_STATUS.LOADING]: /*#__PURE__*/React.createElement(LoadingOutlined, null),
    [ACTIONS_ITEM_STATUS.ERROR]: /*#__PURE__*/React.createElement(CloseCircleOutlined, null),
    [ACTIONS_ITEM_STATUS.RUNNING]: runningIcon,
    [ACTIONS_ITEM_STATUS.DEFAULT]: defaultIcon
  };
  const iconNode = status && StatusIcon[status] ? StatusIcon[status] : defaultIcon;
  return /*#__PURE__*/React.createElement(Tooltip, {
    title: label
  }, /*#__PURE__*/React.createElement("div", _extends({}, domProps, {
    className: mergedCls,
    style: {
      ...style,
      ...styles.root,
      ...styles?.[status]
    }
  }), iconNode));
};
export default ActionsItem;