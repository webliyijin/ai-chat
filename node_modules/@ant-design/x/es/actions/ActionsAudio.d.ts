import React from 'react';
import type { ActionsItemProps } from './ActionsItem';
export type SemanticType = 'root' | 'default' | 'running' | 'error' | 'loading';
export interface ActionsAudioProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * @desc 状态
     * @descEN status
     */
    status?: ActionsItemProps['status'];
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
declare const ActionsAudio: React.FC<ActionsAudioProps>;
export default ActionsAudio;
