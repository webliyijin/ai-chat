import type { UploadFile, UploadProps } from 'antd';
import React from 'react';
import type { FileCardProps } from '../file-card';
import { SemanticType as FileCardSemanticType } from '../file-card/FileCard';
import { SemanticType as FileCardListSemanticType } from '../file-card/List';
import { type FileListProps } from './FileList';
import { type PlaceholderType } from './PlaceholderUploader';
export type SemanticType = 'list' | 'placeholder' | 'upload';
export interface Attachment<T = any> extends UploadFile<T>, Omit<FileCardProps, 'size' | 'byte' | 'type'> {
    description?: React.ReactNode;
    cardType?: FileCardProps['type'];
}
export interface AttachmentsProps<T = any> extends Omit<UploadProps, 'fileList'> {
    prefixCls?: string;
    rootClassName?: string;
    style?: React.CSSProperties;
    className?: string;
    classNames?: Partial<Record<SemanticType | FileCardSemanticType | FileCardListSemanticType, string>>;
    styles?: Partial<Record<SemanticType | FileCardSemanticType | FileCardListSemanticType, React.CSSProperties>>;
    children?: React.ReactElement;
    disabled?: boolean;
    placeholder?: PlaceholderType | ((type: 'inline' | 'drop') => PlaceholderType);
    getDropContainer?: null | (() => HTMLElement | null | undefined);
    items?: Attachment<T>[];
    overflow?: FileListProps['overflow'];
}
export interface AttachmentsRef {
    nativeElement?: HTMLDivElement | null;
    fileNativeElement?: HTMLInputElement | null;
    upload: (file: File) => void;
    select: (options?: {
        accept?: string;
        multiple?: boolean;
    }) => void;
}
declare const Attachments: React.ForwardRefExoticComponent<AttachmentsProps<any> & React.RefAttributes<AttachmentsRef>>;
export default Attachments;
