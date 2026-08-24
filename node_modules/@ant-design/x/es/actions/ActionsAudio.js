import _extends from "@babel/runtime/helpers/esm/extends";
import { MutedOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';
import React from 'react';
import { useLocale } from "../locale";
import enUS from "../locale/en_US";
import RecordingIcon from "../sender/components/SpeechButton/RecordingIcon";
import { useXProviderContext } from "../x-provider";
import Item, { ACTIONS_ITEM_STATUS } from "./ActionsItem";
import useStyle from "./style";
const ActionsAudio = props => {
  const {
    status = ACTIONS_ITEM_STATUS.DEFAULT,
    className,
    style,
    prefixCls: customizePrefixCls,
    rootClassName,
    classNames = {},
    styles = {},
    ...otherProps
  } = props;

  // ============================ Prefix ============================

  const {
    direction,
    getPrefixCls
  } = useXProviderContext();
  const prefixCls = getPrefixCls('actions', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const audioCls = `${prefixCls}-audio`;

  // ============================ Classname ============================

  const mergedCls = clsx(prefixCls, audioCls, hashId, cssVarCls, rootClassName, className, classNames.root, {
    [`${audioCls}-rtl`]: direction === 'rtl',
    [`${audioCls}-${status}`]: status
  });

  // ============================ Locale ============================

  const [contextLocale] = useLocale('Actions', enUS.Actions);
  const StatusLabel = {
    [ACTIONS_ITEM_STATUS.LOADING]: contextLocale.audioLoading,
    [ACTIONS_ITEM_STATUS.ERROR]: contextLocale.audioError,
    [ACTIONS_ITEM_STATUS.RUNNING]: contextLocale.audioRunning,
    [ACTIONS_ITEM_STATUS.DEFAULT]: contextLocale.audio
  };
  return /*#__PURE__*/React.createElement(Item, _extends({
    label: status ? StatusLabel[status] : '',
    style: style,
    styles: styles,
    classNames: {
      ...classNames,
      root: mergedCls
    },
    status: status,
    defaultIcon: /*#__PURE__*/React.createElement(MutedOutlined, null),
    runningIcon: /*#__PURE__*/React.createElement(RecordingIcon, {
      className: `${audioCls}-recording-icon`
    })
  }, otherProps));
};
export default ActionsAudio;