"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _icons = require("@ant-design/icons");
var _antd = require("antd");
var _clsx = require("clsx");
var _react = _interopRequireWildcard(require("react"));
const CarouselCard = props => {
  const {
    prefixCls,
    items,
    activeKey,
    className,
    style
  } = props;
  const compCls = `${prefixCls}-carousel`;
  const [slide, setSlide] = (0, _react.useState)(0);
  const carouselRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/_react.default.createElement("div", {
    style: style,
    className: (0, _clsx.clsx)(`${compCls}-wrapper`, className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${compCls}-title`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${compCls}-btn-wrapper`
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _clsx.clsx)(`${compCls}-btn`, `${compCls}-left-btn`, {
      [`${compCls}-btn-disabled`]: slide === 0
    }),
    onClick: () => carouselRef.current?.prev()
  }, /*#__PURE__*/_react.default.createElement(_icons.LeftOutlined, null)), /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _clsx.clsx)(`${compCls}-btn`, `${compCls}-right-btn`, {
      [`${compCls}-btn-disabled`]: slide === (items?.length || 1) - 1
    }),
    onClick: () => carouselRef.current?.next()
  }, /*#__PURE__*/_react.default.createElement(_icons.RightOutlined, null))), /*#__PURE__*/_react.default.createElement("div", {
    className: `${compCls}-page`
  }, `${slide + 1}/${items?.length || 1}`)), /*#__PURE__*/_react.default.createElement(_antd.Carousel, {
    className: compCls,
    ref: carouselRef,
    arrows: false,
    infinite: false,
    dots: false,
    afterChange: setSlide,
    beforeChange: (_, nextSlide) => setSlide(nextSlide)
  }, items?.map((item, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: item.key || index,
    className: `${compCls}-item`,
    onClick: () => handleClick(item)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${compCls}-item-title-wrapper`
  }, item.icon && /*#__PURE__*/_react.default.createElement("span", {
    className: `${compCls}-item-icon`
  }, item.icon), /*#__PURE__*/_react.default.createElement("span", {
    className: `${compCls}-item-title`
  }, item.title)), item.description && /*#__PURE__*/_react.default.createElement("div", {
    className: `${compCls}-item-description`
  }, item.description)))));
};
var _default = exports.default = CarouselCard;