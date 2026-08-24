import _extends from "@babel/runtime/helpers/esm/extends";
import { Button } from 'antd';
import { clsx } from 'clsx';
import React, { useContext, useEffect } from 'react';
export const ActionButtonContext = /*#__PURE__*/React.createContext(null);
export const ActionButton = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    className,
    action,
    onClick,
    ...restProps
  } = props;
  const context = useContext(ActionButtonContext);
  const {
    prefixCls,
    disabled: rootDisabled,
    setSubmitDisabled
  } = context;
  const mergedDisabled = restProps.disabled ?? rootDisabled ?? context[`${action}Disabled`];
  useEffect(() => {
    if (action === 'onSend') {
      setSubmitDisabled?.(mergedDisabled);
    }
  }, [mergedDisabled, action, setSubmitDisabled]);
  return /*#__PURE__*/React.createElement(Button, _extends({
    type: "text"
  }, restProps, {
    ref: ref,
    onClick: e => {
      if (mergedDisabled) {
        return;
      }
      context[action]?.();
      onClick?.(e);
    },
    disabled: mergedDisabled,
    className: clsx(prefixCls, className, {
      [`${prefixCls}-disabled`]: mergedDisabled
    })
  }));
});
export default ActionButton;