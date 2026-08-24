import { useControlledState, useEvent } from '@rc-component/util';
import { clsx } from 'clsx';
import React from 'react';
import useXComponentConfig from "../_util/hooks/use-x-component-config";
import { useXProviderContext } from "../x-provider";
import { AttachmentContext } from "./context";
import DropArea from "./DropArea";
import FileList from "./FileList";
import PlaceholderUploader from "./PlaceholderUploader";
import SilentUploader from "./SilentUploader";
import useStyle from "./style";
const Attachments = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    rootClassName,
    className,
    style,
    items,
    children,
    getDropContainer,
    placeholder,
    onChange,
    onRemove,
    overflow,
    disabled,
    maxCount,
    classNames = {},
    styles = {},
    ...uploadProps
  } = props;

  // ============================ PrefixCls ============================
  const {
    getPrefixCls,
    direction
  } = useXProviderContext();
  const prefixCls = getPrefixCls('attachment', customizePrefixCls);

  // ===================== Component Config =========================
  const contextConfig = useXComponentConfig('attachments');
  const {
    classNames: contextClassNames,
    styles: contextStyles
  } = contextConfig;
  const {
    root: rootOfClassNames,
    ...otherClassNames
  } = classNames;
  const {
    root: rootOfStyles,
    ...otherStyles
  } = styles;

  // ============================= Ref =============================
  const containerRef = React.useRef(null);
  const uploadRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    nativeElement: containerRef.current,
    fileNativeElement: uploadRef.current?.nativeElement?.querySelector('input[type="file"]'),
    upload: file => {
      const fileInput = uploadRef.current?.nativeElement?.querySelector('input[type="file"]');
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        fileInput.dispatchEvent(new Event('change', {
          bubbles: true
        }));
      }
    },
    select: options => {
      const fileInput = uploadRef.current?.nativeElement?.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.multiple = options?.multiple ?? false;
        const acceptValue = options?.accept || props.accept;
        fileInput.accept = typeof acceptValue === 'string' ? acceptValue : acceptValue?.format || '';
        fileInput.click();
      }
    }
  }));

  // ============================ Style ============================
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const cssinjsCls = clsx(hashId, cssVarCls);

  // ============================ Upload ============================
  const [fileList, setFileList] = useControlledState([], items);
  const triggerChange = useEvent(info => {
    setFileList(info.fileList);
    onChange?.(info);
  });
  const mergedUploadProps = {
    ...uploadProps,
    fileList,
    maxCount,
    onChange: triggerChange
  };
  const onItemRemove = item => Promise.resolve(typeof onRemove === 'function' ? onRemove(item) : onRemove).then(ret => {
    // Prevent removing file
    if (ret === false) {
      return;
    }
    const newFileList = fileList.filter(fileItem => fileItem.uid !== item.uid);
    triggerChange({
      file: {
        ...item,
        status: 'removed'
      },
      fileList: newFileList
    });
  });
  // ============================ Render ============================
  let renderChildren;
  const getPlaceholderNode = (type, props, ref) => {
    const placeholderContent = typeof placeholder === 'function' ? placeholder(type) : placeholder;
    return /*#__PURE__*/React.createElement(PlaceholderUploader, {
      placeholder: placeholderContent,
      upload: mergedUploadProps,
      prefixCls: prefixCls,
      className: clsx(contextClassNames.placeholder, classNames.placeholder),
      style: {
        ...contextStyles.placeholder,
        ...styles.placeholder,
        ...props?.style
      },
      ref: ref
    });
  };
  if (children) {
    renderChildren = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SilentUploader, {
      upload: mergedUploadProps,
      style: rootOfStyles,
      className: clsx(rootClassName, rootOfClassNames),
      ref: uploadRef
    }, children), /*#__PURE__*/React.createElement(DropArea, {
      getDropContainer: getDropContainer,
      prefixCls: prefixCls,
      style: rootOfStyles,
      className: clsx(cssinjsCls, rootClassName, rootOfClassNames)
    }, getPlaceholderNode('drop')));
  } else {
    const hasFileList = fileList.length > 0;
    renderChildren = /*#__PURE__*/React.createElement("div", {
      className: clsx(prefixCls, cssinjsCls, {
        [`${prefixCls}-rtl`]: direction === 'rtl'
      }, className, rootClassName, rootOfClassNames),
      style: {
        ...styles.root,
        ...style
      },
      dir: direction || 'ltr',
      ref: containerRef
    }, /*#__PURE__*/React.createElement(FileList, {
      prefixCls: prefixCls,
      items: fileList,
      onRemove: onItemRemove,
      overflow: overflow,
      upload: mergedUploadProps,
      classNames: otherClassNames,
      style: !hasFileList ? {
        display: 'none'
      } : {},
      styles: otherStyles
    }), getPlaceholderNode('inline', hasFileList ? {
      style: {
        display: 'none'
      }
    } : undefined, uploadRef), /*#__PURE__*/React.createElement(DropArea, {
      getDropContainer: getDropContainer || (() => containerRef.current),
      prefixCls: prefixCls,
      className: cssinjsCls
    }, getPlaceholderNode('drop')));
  }
  return /*#__PURE__*/React.createElement(AttachmentContext.Provider, {
    value: {
      disabled
    }
  }, renderChildren);
});
if (process.env.NODE_ENV !== 'production') {
  Attachments.displayName = 'Attachments';
}
export default Attachments;