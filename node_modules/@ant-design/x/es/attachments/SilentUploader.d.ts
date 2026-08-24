import { type UploadProps } from 'antd';
import React from 'react';
export interface SilentUploaderProps {
    children: React.ReactElement;
    upload: UploadProps;
    visible?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
/**
 * SilentUploader is only wrap children with antd Upload component.
 */
declare const SilentUploader: React.ForwardRefExoticComponent<SilentUploaderProps & React.RefAttributes<import("antd/es/upload").UploadRef<any>>>;
export default SilentUploader;
