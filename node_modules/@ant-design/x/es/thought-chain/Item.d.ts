import React from 'react';
import { THOUGHT_CHAIN_ITEM_STATUS } from './Status';
declare enum VARIANT {
    SOLID = "solid",
    OUTLINED = "outlined",
    TEXT = "text"
}
export type SemanticType = 'root' | 'icon' | 'title' | 'description';
export interface ThoughtChainItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
    /**
     * @desc 思维节点唯一标识符
     * @descEN Unique identifier
     */
    key?: string;
    /**
     * @desc 自定义前缀
     * @descEN Prefix
     */
    prefixCls?: string;
    /**
     * @desc 思维节点图标
     * @descEN Thought chain item icon
     */
    icon?: React.ReactNode;
    /**
     * @desc 思维节点标题
     * @descEN Thought chain item title
     */
    title?: React.ReactNode;
    /**
     * @desc 思维节点描述
     * @descEN Thought chain item description
     */
    description?: React.ReactNode;
    /**
     * @desc 根节点样式类
     * @descEN Root node style class.
     */
    rootClassName?: string;
    /**
     * @desc 思维节点状态
     * @descEN Thought chain item status
     */
    status?: `${THOUGHT_CHAIN_ITEM_STATUS}`;
    /**
     * @desc 思维节点变体
     * @descEN Thought chain item variant
     */
    variant?: `${VARIANT}`;
    /**
     * @desc 闪烁
     * @descEN blink
     */
    blink?: boolean;
    /**
     * @desc 自定义样式类名
     * @descEN Custom CSS class name
     */
    className?: string;
    /**
     * @desc 语义化样式类名配置
     * @descEN Semantic class names configuration
     */
    classNames?: Partial<Record<SemanticType, string>>;
    /**
     * @desc 自定义内联样式
     * @descEN Custom inline styles
     */
    style?: React.CSSProperties;
    /**
     * @desc 语义化样式配置
     * @descEN Semantic styles configuration
     */
    styles?: Partial<Record<SemanticType, React.CSSProperties>>;
    /**
     * @desc 是否禁用
     * @descEN Whether disabled
     */
    disabled?: boolean;
}
type ItemRef = {
    nativeElement: HTMLElement;
};
declare const Item: React.ForwardRefExoticComponent<ThoughtChainItemProps & React.RefAttributes<ItemRef>>;
export default Item;
