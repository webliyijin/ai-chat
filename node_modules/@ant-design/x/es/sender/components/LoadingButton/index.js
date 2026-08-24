import _extends from "@babel/runtime/helpers/esm/extends";
import { clsx } from 'clsx';
import * as React from 'react';
import ActionButton, { ActionButtonContext } from "../ActionButton";
import StopLoadingIcon from "./StopLoading";
const LoadingButton = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    prefixCls
  } = React.useContext(ActionButtonContext);
  const {
    className
  } = props;
  return /*#__PURE__*/React.createElement(ActionButton, _extends({
    icon: /*#__PURE__*/React.createElement(StopLoadingIcon, {
      className: `${prefixCls}-loading-icon`
    }),
    color: "primary",
    variant: "text",
    shape: "circle"
  }, props, {
    className: clsx(className, `${prefixCls}-loading-button`),
    action: "onCancel",
    ref: ref
  }));
});
export default LoadingButton;