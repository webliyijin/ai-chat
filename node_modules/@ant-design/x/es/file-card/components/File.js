import { clsx } from 'clsx';
import React, { useMemo } from 'react';
import { getSize } from "../utils";
const File = props => {
  const {
    styles = {},
    classNames = {},
    prefixCls,
    name,
    namePrefix,
    ext,
    size,
    byte,
    src,
    type,
    description,
    icon,
    iconColor,
    onClick,
    mask
  } = props;
  const compCls = `${prefixCls}-file`;
  const mergedCls = clsx(compCls, classNames.file, {
    [`${compCls}-pointer`]: !!onClick,
    [`${compCls}-small`]: size === 'small'
  });
  const desc = useMemo(() => {
    const sizeText = typeof byte === 'number' ? getSize(byte) : '';
    const descriptionNode = typeof description === 'function' ? description({
      size: sizeText,
      icon,
      src,
      type,
      name,
      namePrefix,
      nameSuffix: ext
    }) : description;
    if (descriptionNode === false) {
      return null;
    }
    return descriptionNode ?? sizeText;
  }, [description, byte, icon, src, type, name, namePrefix, ext]);
  const maskNode = useMemo(() => {
    const sizeText = typeof byte === 'number' ? getSize(byte) : '';
    const maskContent = typeof mask === 'function' ? mask({
      size: sizeText,
      icon,
      src,
      type,
      name,
      namePrefix,
      nameSuffix: ext
    }) : mask;
    return maskContent === false ? null : maskContent;
  }, [mask, byte, icon, src, type, name, namePrefix, ext]);
  const handleClick = React.useCallback(event => {
    if (onClick) {
      const size = typeof byte === 'number' ? getSize(byte) : '';
      onClick({
        size,
        icon,
        name,
        namePrefix,
        nameSuffix: ext,
        src,
        type
      }, event);
    }
  }, [onClick, byte, icon, name, namePrefix, ext, src, type]);
  return /*#__PURE__*/React.createElement("div", {
    className: mergedCls,
    style: styles.file,
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("div", {
    className: clsx(`${compCls}-icon`, classNames.icon),
    style: {
      color: iconColor,
      ...styles.icon
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: `${compCls}-content`
  }, /*#__PURE__*/React.createElement("div", {
    className: clsx(`${compCls}-name`, classNames.name),
    style: styles.name
  }, /*#__PURE__*/React.createElement("span", {
    className: `${compCls}-name-prefix`
  }, namePrefix), /*#__PURE__*/React.createElement("span", {
    className: `${compCls}-name-suffix`
  }, ext)), desc !== null && desc !== undefined && /*#__PURE__*/React.createElement("div", {
    className: clsx(`${compCls}-description`, classNames.description),
    style: styles.description
  }, desc)), maskNode !== null && maskNode !== undefined && /*#__PURE__*/React.createElement("div", {
    className: `${compCls}-mask`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${compCls}-mask-info`
  }, maskNode)));
};
export default File;