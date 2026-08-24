import type { CascaderProps } from 'antd';
import React from 'react';
import { AnyObject } from '../_util/type';
type SemanticType = 'root' | 'content' | 'popup';
export interface SuggestionItem extends AnyObject {
    label: React.ReactNode;
    value: string;
    icon?: React.ReactNode;
    children?: SuggestionItem[];
    extra?: React.ReactNode;
}
export interface RenderChildrenProps<T> {
    onTrigger: (info?: T | false) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    open: boolean;
}
export interface SuggestionProps<T = any> extends Omit<CascaderProps, 'children' | 'onChange' | 'optionRender' | 'value' | 'options' | 'multiple' | 'showSearch' | 'defaultValue' | 'fieldNames' | 'onOpenChange' | 'onDropdownVisibleChange' | 'dropdownMatchSelectWidth' | 'open' | 'rootClassName' | 'placement' | 'styles' | 'classNames'> {
    prefixCls?: string;
    className?: string;
    rootClassName?: string;
    style?: React.CSSProperties;
    children?: (props: RenderChildrenProps<T>) => React.ReactElement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    items: SuggestionItem[] | ((info?: T) => SuggestionItem[]);
    onSelect?: (value: string, info: SuggestionItem[]) => void;
    block?: boolean;
    styles?: Partial<Record<SemanticType, React.CSSProperties>>;
    classNames?: Partial<Record<SemanticType, string>>;
}
declare function Suggestion<T = any>(props: SuggestionProps<T>): React.JSX.Element;
declare namespace Suggestion {
    var displayName: string;
}
export default Suggestion;
