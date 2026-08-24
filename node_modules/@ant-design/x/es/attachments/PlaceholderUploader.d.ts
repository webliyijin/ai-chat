import { type UploadProps } from 'antd';
import React from 'react';
export interface PlaceholderConfig {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
}
export type PlaceholderType = PlaceholderConfig | React.ReactElement;
export interface PlaceholderProps {
    prefixCls: string;
    placeholder?: PlaceholderType;
    upload?: UploadProps;
    className?: string;
    style?: React.CSSProperties;
}
declare const Placeholder: React.ForwardRefExoticComponent<PlaceholderProps & React.RefAttributes<import("antd/es/upload").UploadRef<any>>>;
export default Placeholder;
