import { type MermaidConfig } from 'mermaid';
import React from 'react';
import type { ItemType } from '../actions/interface';
import type { CodeHighlighterProps } from '../code-highlighter/interface';
export type MermaidType = 'root' | 'header' | 'graph' | 'code';
export interface MermaidProps {
    children: string;
    header?: React.ReactNode | null;
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    highlightProps?: CodeHighlighterProps['highlightProps'];
    config?: MermaidConfig;
    actions?: {
        enableZoom?: boolean;
        enableDownload?: boolean;
        enableCopy?: boolean;
        customActions?: ItemType[];
    };
    classNames?: Partial<Record<MermaidType, string>>;
    styles?: Partial<Record<MermaidType, React.CSSProperties>>;
    onRenderTypeChange?: (value: RenderType) => void;
}
declare enum RenderType {
    Code = "code",
    Image = "image"
}
declare const Mermaid: React.FC<MermaidProps>;
export default Mermaid;
