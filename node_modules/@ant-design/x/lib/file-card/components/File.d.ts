import React from 'react';
import { type FileCardProps, SemanticType } from '../FileCard';
interface FileProps {
    styles?: Partial<Record<SemanticType, React.CSSProperties>>;
    classNames?: Partial<Record<SemanticType, string>>;
    prefixCls?: string;
    name?: string;
    namePrefix?: string;
    ext?: string;
    size?: 'small' | 'default';
    byte?: number;
    src?: string;
    type?: FileCardProps['type'];
    description?: FileCardProps['description'];
    icon?: React.ReactNode;
    iconColor?: string;
    onClick?: FileCardProps['onClick'];
    mask?: FileCardProps['mask'];
}
declare const File: React.FC<FileProps>;
export default File;
