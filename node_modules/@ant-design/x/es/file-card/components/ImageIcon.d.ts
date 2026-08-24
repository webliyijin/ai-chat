import type { SpinProps } from 'antd';
import React from 'react';
import type { DirectionType } from '../../_util/type';
interface ImageIconProps {
    className?: string;
    height?: string;
    width?: string;
    size?: SpinProps['size'];
    color?: string;
    direction?: DirectionType;
}
declare const _default: React.ForwardRefExoticComponent<ImageIconProps & React.RefAttributes<HTMLSpanElement>>;
export default _default;
