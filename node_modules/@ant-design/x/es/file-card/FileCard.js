import _extends from "@babel/runtime/helpers/esm/extends";
import { FileExcelFilled, FileImageFilled, FileMarkdownFilled, FilePdfFilled, FilePptFilled, FileTextFilled, FileWordFilled, FileZipFilled, JavaOutlined, JavaScriptOutlined, PythonOutlined } from '@ant-design/icons';
import pickAttrs from '@rc-component/util/lib/pickAttrs';
import { Image } from 'antd';
import { clsx } from 'clsx';
import React, { useMemo } from 'react';
import useXComponentConfig from "../_util/hooks/use-x-component-config";
import { useXProviderContext } from "../x-provider";
import File from "./components/File";
import ImageLoading from "./components/ImageLoading";
import AudioIcon from "./icons/audio";
import VideoIcon from "./icons/video";
import useStyle from "./style";
import { matchExt } from "./utils";
var CARD_TYPE = /*#__PURE__*/function (CARD_TYPE) {
  CARD_TYPE["FILE"] = "file";
  CARD_TYPE["IMAGE"] = "image";
  CARD_TYPE["AUDIO"] = "audio";
  CARD_TYPE["VIDEO"] = "video";
  return CARD_TYPE;
}(CARD_TYPE || {});
const IMAGE_EXT = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg', 'jfif'];
const AUDIO_EXT = ['mp3', 'wav', 'flac', 'ape', 'aac', 'ogg'];
const VIDEO_EXT = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'];
const PRESET_FILE_ICONS = [{
  icon: /*#__PURE__*/React.createElement(FileExcelFilled, null),
  color: '#22b35e',
  ext: ['xlsx', 'xls'],
  key: 'excel'
}, {
  icon: /*#__PURE__*/React.createElement(FileImageFilled, null),
  color: '#8c8c8c',
  ext: IMAGE_EXT,
  key: 'image'
}, {
  icon: /*#__PURE__*/React.createElement(FileMarkdownFilled, null),
  color: '#8c8c8c',
  ext: ['md', 'mdx'],
  key: 'markdown'
}, {
  icon: /*#__PURE__*/React.createElement(FilePdfFilled, null),
  color: '#ff4d4f',
  ext: ['pdf'],
  key: 'pdf'
}, {
  icon: /*#__PURE__*/React.createElement(FilePptFilled, null),
  color: '#ff6e31',
  ext: ['ppt', 'pptx'],
  key: 'ppt'
}, {
  icon: /*#__PURE__*/React.createElement(FileWordFilled, null),
  color: '#1677ff',
  ext: ['doc', 'docx'],
  key: 'word'
}, {
  icon: /*#__PURE__*/React.createElement(FileZipFilled, null),
  color: '#fab714',
  ext: ['zip', 'rar', '7z', 'tar', 'gz'],
  key: 'zip'
}, {
  icon: /*#__PURE__*/React.createElement(VideoIcon, null),
  color: '#ff4d4f',
  ext: VIDEO_EXT,
  key: 'video'
}, {
  icon: /*#__PURE__*/React.createElement(AudioIcon, null),
  color: '#ff6e31',
  ext: AUDIO_EXT,
  key: 'audio'
}, {
  icon: /*#__PURE__*/React.createElement(JavaOutlined, null),
  color: '#1677ff',
  ext: ['java'],
  key: 'java'
}, {
  icon: /*#__PURE__*/React.createElement(JavaScriptOutlined, null),
  color: '#fab714',
  ext: ['js'],
  key: 'javascript'
}, {
  icon: /*#__PURE__*/React.createElement(PythonOutlined, null),
  color: '#fab714',
  ext: ['py'],
  key: 'python'
}];
const DEFAULT_ICON = {
  icon: /*#__PURE__*/React.createElement(FileTextFilled, null),
  color: '#8c8c8c',
  ext: ['default'],
  key: 'default'
};
const FileCard = props => {
  const {
    prefixCls: customizePrefixCls,
    style,
    styles = {},
    className,
    rootClassName,
    classNames = {},
    name,
    byte,
    size,
    description,
    icon: customIcon,
    src,
    mask,
    loading,
    type: customType,
    onClick,
    imageProps,
    videoProps,
    audioProps,
    spinProps,
    ...restProps
  } = props;
  const domProps = pickAttrs(restProps, {
    attr: true,
    aria: true,
    data: true
  });
  const {
    direction,
    getPrefixCls
  } = useXProviderContext();
  const prefixCls = getPrefixCls('file-card', customizePrefixCls);
  const contextConfig = useXComponentConfig('fileCard');
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const mergedCls = clsx(prefixCls, contextConfig.className, className, rootClassName, classNames.root, hashId, cssVarCls, {
    [`${prefixCls}-rtl`]: direction === 'rtl'
  });
  const [namePrefix, nameSuffix] = useMemo(() => {
    const nameStr = name || '';
    const match = nameStr.match(/^(.*)\.[^.]+$/);
    return match ? [match[1], nameStr.slice(match[1].length)] : [nameStr, ''];
  }, [name]);
  const [icon, iconColor] = useMemo(() => {
    if (typeof customIcon === 'string') {
      const match = PRESET_FILE_ICONS.find(item => item.key === customIcon);
      if (match) {
        return [match.icon, match.color];
      }
    }
    for (const item of PRESET_FILE_ICONS) {
      if (matchExt(nameSuffix, item.ext)) {
        return [item.icon, item.color];
      }
    }
    return [DEFAULT_ICON.icon, DEFAULT_ICON.color];
  }, [nameSuffix]);
  const fileType = useMemo(() => {
    if (customType) {
      return customType;
    }
    if (matchExt(nameSuffix, IMAGE_EXT)) {
      return CARD_TYPE.IMAGE;
    }
    if (matchExt(nameSuffix, AUDIO_EXT)) {
      return CARD_TYPE.AUDIO;
    }
    if (matchExt(nameSuffix, VIDEO_EXT)) {
      return CARD_TYPE.VIDEO;
    }
    return CARD_TYPE.FILE;
  }, [nameSuffix, customType]);
  let ContentNode = null;
  if (fileType === CARD_TYPE.IMAGE) {
    ContentNode = /*#__PURE__*/React.createElement("div", {
      className: clsx(`${prefixCls}-image`, classNames.file, {
        [`${prefixCls}-loading`]: loading
      }),
      style: styles.file
    }, /*#__PURE__*/React.createElement(Image, _extends({
      rootClassName: clsx(`${prefixCls}-image-img`),
      width: styles?.file?.width,
      height: styles?.file?.height,
      alt: name,
      src: src
    }, imageProps)), loading && /*#__PURE__*/React.createElement(ImageLoading, {
      spinProps: spinProps,
      prefixCls: prefixCls,
      style: styles.file
    }));
  } else if (fileType === CARD_TYPE.VIDEO) {
    ContentNode = /*#__PURE__*/React.createElement("video", _extends({
      src: src,
      controls: true,
      style: styles.file,
      className: clsx(`${prefixCls}-video`, classNames.file)
    }, videoProps));
  } else if (fileType === CARD_TYPE.AUDIO) {
    ContentNode = /*#__PURE__*/React.createElement("audio", _extends({
      src: src,
      controls: true,
      style: styles.file,
      className: clsx(`${prefixCls}-audio`, classNames.file)
    }, audioProps));
  } else {
    ContentNode = /*#__PURE__*/React.createElement(File, {
      prefixCls: prefixCls,
      namePrefix: namePrefix,
      name: name,
      type: fileType,
      src: src,
      ext: nameSuffix,
      size: size,
      byte: byte,
      description: description,
      icon: customIcon && typeof customIcon !== 'string' ? customIcon : icon,
      iconColor: iconColor,
      onClick: onClick,
      mask: mask,
      classNames: classNames,
      styles: styles
    });
  }
  return /*#__PURE__*/React.createElement("div", _extends({}, domProps, {
    className: mergedCls,
    style: {
      ...contextConfig.style,
      ...style,
      ...styles.root
    }
  }), ContentNode);
};
if (process.env.NODE_ENV !== 'production') {
  FileCard.displayName = 'FileCard';
}
export default FileCard;