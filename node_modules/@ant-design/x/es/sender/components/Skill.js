import { CloseOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { clsx } from 'clsx';
import React, { useMemo } from 'react';
const Skill = ({
  removeSkill,
  prefixCls,
  toolTip,
  closable,
  title,
  value
}) => {
  const componentCls = `${prefixCls}-skill`;
  const closeNode = useMemo(() => {
    if (!closable) {
      return [null];
    }
    const config = typeof closable === 'boolean' ? {} : closable;
    const handleClose = event => {
      if (config.disabled) {
        return;
      }
      event.stopPropagation();
      removeSkill();
      config.onClose?.(event);
    };
    const closeIcon = config.closeIcon || /*#__PURE__*/React.createElement(CloseOutlined, {
      className: `${componentCls}-close-icon`
    });
    const closeNode = /*#__PURE__*/React.createElement("div", {
      className: clsx(`${componentCls}-close`, {
        [`${componentCls}-close-disabled`]: config.disabled
      }),
      onClick: handleClose,
      role: "button",
      "aria-label": "Close skill",
      tabIndex: 0
    }, closeIcon);
    return closeNode;
  }, [closable, removeSkill]);
  const mergeTitle = title || value;
  const titleNode = toolTip ? /*#__PURE__*/React.createElement(Tooltip, toolTip, mergeTitle) : mergeTitle;
  return /*#__PURE__*/React.createElement("div", {
    className: `${componentCls}-wrapper`,
    contentEditable: false
  }, /*#__PURE__*/React.createElement("div", {
    className: `${componentCls}-tag`,
    contentEditable: false,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("span", {
    className: `${componentCls}-tag-text`
  }, titleNode), closeNode), /*#__PURE__*/React.createElement("div", {
    className: `${componentCls}-holder`
  }));
};
Skill.displayName = 'Skill';
export default Skill;