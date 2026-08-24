import _extends from "@babel/runtime/helpers/esm/extends";
import { useControlledState } from '@rc-component/util';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { Button } from 'antd';
import { clsx } from 'clsx';
import * as React from 'react';
import useProxyImperativeHandle from "../_util/hooks/use-proxy-imperative-handle";
import useXComponentConfig from "../_util/hooks/use-x-component-config";
import { useXProviderContext } from "../x-provider";
import { SenderContext } from "./context";
import useStyle from "./style";
const SenderSwitch = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    children,
    className,
    classNames = {},
    styles = {},
    icon,
    style,
    onChange,
    rootClassName,
    loading,
    defaultValue,
    value: customValue,
    checkedChildren,
    unCheckedChildren,
    disabled,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;
  const {
    styles: contextStyles = {},
    classNames: contextClassNames = {},
    prefixCls: contextPrefixCls
  } = React.useContext(SenderContext);
  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true,
    data: true
  });
  const id = React.useId();

  // ============================ Prefix ============================
  const {
    direction,
    getPrefixCls
  } = useXProviderContext();
  const prefixCls = getPrefixCls('sender', customizePrefixCls || contextPrefixCls);
  const switchCls = `${prefixCls}-switch`;
  const [hashId, cssVarCls] = useStyle(prefixCls);

  // ============================= Refs =============================
  const containerRef = React.useRef(null);
  useProxyImperativeHandle(ref, () => {
    return {
      nativeElement: containerRef.current
    };
  });

  // ============================ Checked ============================
  const [mergedChecked, setMergedChecked] = useControlledState(defaultValue, customValue);

  // ============================ style ============================
  const contextConfig = useXComponentConfig('sender');
  const mergedCls = clsx(prefixCls, switchCls, className, rootClassName, contextConfig.classNames.switch, contextClassNames.switch, classNames.root, hashId, cssVarCls, {
    [`${switchCls}-checked`]: mergedChecked,
    [`${switchCls}-rtl`]: direction === 'rtl'
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: containerRef,
    className: mergedCls,
    key: id,
    style: {
      ...style,
      ...contextConfig.styles.switch,
      ...contextStyles.switch,
      ...styles.root
    }
  }, domProps), /*#__PURE__*/React.createElement(Button, {
    disabled: disabled,
    loading: loading,
    className: clsx(`${switchCls}-content`, classNames.content),
    style: styles.content,
    styles: {
      icon: styles.icon,
      content: styles.title
    },
    classNames: {
      icon: classNames.icon,
      content: classNames.title
    },
    variant: "outlined",
    color: mergedChecked ? 'primary' : 'default',
    icon: icon,
    onClick: () => {
      const newValue = !mergedChecked;
      setMergedChecked(newValue);
      onChange?.(newValue);
    }
  }, mergedChecked ? checkedChildren : unCheckedChildren, children));
});
export default SenderSwitch;