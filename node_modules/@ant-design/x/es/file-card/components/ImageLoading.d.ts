import React from 'react';
import { FileCardProps } from '../FileCard';
export type ImageLoadingProps = {
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    spinProps?: FileCardProps['spinProps'];
};
declare const ImageLoading: React.FC<ImageLoadingProps>;
export default ImageLoading;
