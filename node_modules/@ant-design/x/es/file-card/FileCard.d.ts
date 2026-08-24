import type { ImageProps, SpinProps } from 'antd';
import React from 'react';
declare enum CARD_TYPE {
    FILE = "file",
    IMAGE = "image",
    AUDIO = "audio",
    VIDEO = "video"
}
export type SemanticType = 'root' | 'file' | 'icon' | 'name' | 'description';
export type PresetIcons = 'default' | 'excel' | 'image' | 'markdown' | 'pdf' | 'ppt' | 'word' | 'zip' | 'video' | 'audio' | 'java' | 'javascript' | 'python';
type CardInfo = {
    size: string;
    icon: React.ReactNode;
    namePrefix?: string;
    nameSuffix?: string;
    name?: string;
    src?: string;
    type?: `${CARD_TYPE}`;
};
type ExtendNode = false | React.ReactNode | ((info: CardInfo) => React.ReactNode);
export interface FileCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content' | 'onAnimationStart' | 'onAnimationEnd' | 'onClick'> {
    prefixCls?: string;
    style?: React.CSSProperties;
    styles?: Partial<Record<SemanticType, React.CSSProperties>>;
    className?: string;
    classNames?: Partial<Record<SemanticType, string>>;
    rootClassName?: string;
    key?: React.Key;
    name: string;
    byte?: number;
    size?: 'small' | 'default';
    description?: ExtendNode;
    loading?: boolean;
    src?: string;
    mask?: ExtendNode;
    icon?: React.ReactNode | PresetIcons;
    type?: `${CARD_TYPE}`;
    imageProps?: ImageProps;
    spinProps?: SpinProps & {
        showText?: boolean;
        icon?: React.ReactNode;
        size: 'small' | 'default' | 'large';
    };
    videoProps?: Partial<React.JSX.IntrinsicElements['video']>;
    audioProps?: Partial<React.JSX.IntrinsicElements['audio']>;
    onClick?: (info: CardInfo, event: React.MouseEvent<HTMLDivElement>) => void;
}
declare const FileCard: React.FC<FileCardProps>;
export default FileCard;
