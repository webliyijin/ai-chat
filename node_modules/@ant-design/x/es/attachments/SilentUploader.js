import _extends from "@babel/runtime/helpers/esm/extends";
import { Upload } from 'antd';
import React from 'react';
/**
 * SilentUploader is only wrap children with antd Upload component.
 */
const SilentUploader = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    children,
    upload,
    className,
    style,
    visible
  } = props;
  const uploadRef = React.useRef(null);
  React.useImperativeHandle(ref, () => uploadRef.current);

  // ============================ Render ============================
  return /*#__PURE__*/React.createElement(Upload, _extends({}, upload, {
    showUploadList: false,
    className: className,
    style: {
      ...style,
      ...(visible === false ? {
        display: 'none'
      } : {})
    },
    ref: uploadRef
  }), children);
});
export default SilentUploader;