import React from 'react';
export type SemanticType = 'root';
export interface ActionsCopyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * @desc 复制的文本
     * @descEN Text to be copied
     */
    text?: string;
    /**
     * @desc 复制图标
     * @descEN Copy icon
     */
    icon?: React.ReactNode;
    /**
     * @desc 自定义样式前缀
     * @descEN Customize the component's prefixCls
     */
    prefixCls?: string;
    /**
     * @desc 根节点样式类
     * @descEN Root node style class.
     */
    rootClassName?: string;
    /**
     * @desc 语义化结构 className
     * @descEN Semantic structure class names
     */
    classNames?: Partial<Record<SemanticType, string>>;
    /**
     * @desc 语义化结构 style
     * @descEN Semantic structure styles
     */
    styles?: Partial<Record<SemanticType, React.CSSProperties>>;
}
declare const ActionsCopy: React.FC<ActionsCopyProps>;
export default ActionsCopy;
