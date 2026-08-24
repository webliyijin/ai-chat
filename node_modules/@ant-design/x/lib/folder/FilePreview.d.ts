import React from 'react';
import type { FolderProps } from '.';
import type { FolderTreeData } from './DirectoryTree';
export interface FileViewProps {
    prefixCls?: string;
    style?: React.CSSProperties;
    classNames?: FolderProps['classNames'];
    styles?: FolderProps['styles'];
    selectedFile?: string[] | null;
    previewRender?: FolderProps['previewRender'];
    fileContent?: string;
    loading?: boolean;
    previewTitle?: FolderProps['previewTitle'];
    getFileNode?: (path: string[]) => {
        title: FolderTreeData['title'];
        path: string;
        content?: string;
    } | undefined;
    emptyRender?: FolderProps['emptyRender'];
}
declare const FileView: React.FC<FileViewProps>;
export default FileView;
