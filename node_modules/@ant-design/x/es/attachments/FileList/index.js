import { PlusOutlined } from '@ant-design/icons';
import omit from '@rc-component/util/lib/omit';
import { Button } from 'antd';
import { clsx } from 'clsx';
import React from 'react';
import useXComponentConfig from "../../_util/hooks/use-x-component-config";
import FileCard from "../../file-card";
import { AttachmentContext } from "../context";
import SilentUploader from "../SilentUploader";
import { previewImage } from "../util";
import Progress from "./Progress";
export default function FileList(props) {
  const {
    prefixCls,
    items,
    onRemove,
    overflow,
    upload,
    className,
    classNames = {},
    styles = {},
    style
  } = props;
  const listCls = `${prefixCls}-list`;

  // ===================== Component Config =========================
  const contextConfig = useXComponentConfig('attachments');
  const {
    classNames: contextClassNames,
    styles: contextStyles
  } = contextConfig;
  const {
    disabled
  } = React.useContext(AttachmentContext);
  const [list, setList] = React.useState([]);
  const getDescription = item => {
    if (item.description) {
      return item.description;
    }
    if (item.status === 'uploading') {
      return `${item.percent ?? 0}%`;
    }
    if (item.status === 'error') {
      return typeof item.response === 'string' ? item.response : 'error';
    }
    return '';
  };
  const getList = async items => {
    const fileCardMap = [];
    for (let i = 0; i < items.length; i++) {
      const desc = getDescription(items[i]);
      let previewImg;
      if (items[i].originFileObj) {
        previewImg = await previewImage(items[i].originFileObj);
      }
      const previewUrl = items[i].thumbUrl || items[i].url || previewImg;
      const cardCls = `${prefixCls}-list-card`;
      const status = items[i].status;
      let preview;
      if (previewUrl && (status === 'uploading' || status === 'error')) {
        const percent = items[i].percent;
        const cover = /*#__PURE__*/React.createElement("div", {
          className: `${cardCls}-file-img-mask`
        }, status === 'uploading' && percent !== undefined && /*#__PURE__*/React.createElement(Progress, {
          percent: percent,
          prefixCls: cardCls
        }), status === 'error' && /*#__PURE__*/React.createElement("div", {
          className: `${cardCls}-desc`
        }, /*#__PURE__*/React.createElement("div", {
          className: `${cardCls}-ellipsis`
        }, desc)));
        preview = {
          cover
        };
      }
      fileCardMap.push({
        key: items[i].uid || i,
        description: desc,
        src: previewUrl,
        classNames: {
          file: clsx(`${cardCls}-status-${status}`, classNames.file),
          description: clsx(`${cardCls}-desc`, classNames.description)
        },
        byte: items[i].size,
        ...omit(items[i], ['type', 'cardType']),
        type: items[i].cardType,
        size: undefined,
        imageProps: {
          preview: preview
        }
      });
    }
    setList(fileCardMap);
  };
  React.useEffect(() => {
    getList(items);
  }, [items]);
  const handleRemove = item => {
    const index = list.findIndex(i => i.key === item.key);
    onRemove(items[index]);
  };
  const showExtension = !disabled && (typeof upload.maxCount === 'undefined' || upload.maxCount > items.length);
  // ================================= Render =================================
  return /*#__PURE__*/React.createElement(FileCard.List, {
    items: list,
    className: clsx(`${prefixCls}-list`, className),
    classNames: {
      root: clsx(classNames.list, contextClassNames.list),
      card: clsx(classNames.card, contextClassNames.card),
      file: clsx(classNames.file, contextClassNames.file),
      description: clsx(classNames.description, contextClassNames.description),
      icon: clsx(classNames.icon, contextClassNames.icon),
      name: clsx(classNames.name, contextClassNames.title)
    },
    styles: {
      root: {
        ...styles.list,
        ...contextStyles.list
      },
      card: {
        ...styles.card,
        ...contextStyles.card
      },
      file: {
        ...styles.file,
        ...contextStyles.file
      },
      description: {
        ...styles.description,
        ...contextStyles.description
      },
      icon: {
        ...styles.icon,
        ...contextStyles.icon
      },
      name: {
        ...styles.name,
        ...contextStyles.title
      }
    },
    style: style,
    removable: !disabled,
    onRemove: handleRemove,
    overflow: overflow,
    extension: /*#__PURE__*/React.createElement(SilentUploader, {
      visible: showExtension,
      upload: upload
    }, /*#__PURE__*/React.createElement(Button, {
      className: clsx(classNames.upload, contextClassNames.upload, `${listCls}-upload-btn`),
      style: {
        ...styles.upload,
        ...contextStyles.upload
      },
      type: "dashed"
    }, /*#__PURE__*/React.createElement(PlusOutlined, {
      className: `${listCls}-upload-btn-icon`
    })))
  });
}