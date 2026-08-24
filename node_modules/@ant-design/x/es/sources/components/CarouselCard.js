import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { clsx } from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
const CarouselCard = props => {
  const {
    prefixCls,
    items,
    activeKey,
    className,
    style
  } = props;
  const compCls = `${prefixCls}-carousel`;
  const [slide, setSlide] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (carouselRef.current) {
        const current = Math.max(0, items?.findIndex(({
          key
        }) => key === activeKey) ?? 0);
        setSlide(current);
        carouselRef.current.goTo(current, false);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [activeKey, items, setSlide]);
  const handleClick = item => {
    item.url && window.open(item.url, '_blank', 'noopener,noreferrer');
    props.onClick?.(item);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: style,
    className: clsx(`${compCls}-wrapper`, className)
  }, /*#__PURE__*/React.createElement("div", {
    className: `${compCls}-title`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${compCls}-btn-wrapper`
  }, /*#__PURE__*/React.createElement("span", {
    className: clsx(`${compCls}-btn`, `${compCls}-left-btn`, {
      [`${compCls}-btn-disabled`]: slide === 0
    }),
    onClick: () => carouselRef.current?.prev()
  }, /*#__PURE__*/React.createElement(LeftOutlined, null)), /*#__PURE__*/React.createElement("span", {
    className: clsx(`${compCls}-btn`, `${compCls}-right-btn`, {
      [`${compCls}-btn-disabled`]: slide === (items?.length || 1) - 1
    }),
    onClick: () => carouselRef.current?.next()
  }, /*#__PURE__*/React.createElement(RightOutlined, null))), /*#__PURE__*/React.createElement("div", {
    className: `${compCls}-page`
  }, `${slide + 1}/${items?.length || 1}`)), /*#__PURE__*/React.createElement(Carousel, {
    className: compCls,
    ref: carouselRef,
    arrows: false,
    infinite: false,
    dots: false,
    afterChange: setSlide,
    beforeChange: (_, nextSlide) => setSlide(nextSlide)
  }, items?.map((item, index) => /*#__PURE__*/React.createElement("div", {
    key: item.key || index,
    className: `${compCls}-item`,
    onClick: () => handleClick(item)
  }, /*#__PURE__*/React.createElement("div", {
    className: `${compCls}-item-title-wrapper`
  }, item.icon && /*#__PURE__*/React.createElement("span", {
    className: `${compCls}-item-icon`
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    className: `${compCls}-item-title`
  }, item.title)), item.description && /*#__PURE__*/React.createElement("div", {
    className: `${compCls}-item-description`
  }, item.description)))));
};
export default CarouselCard;