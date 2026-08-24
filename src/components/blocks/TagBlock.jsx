import { memo } from 'react';
import { Tag } from 'antd';

const tagColorMap = {
  blue: 'blue',
  green: 'green',
  orange: 'orange',
  red: 'red',
  purple: 'purple',
  default: 'default',
};

const TagBlock = memo(function TagBlock({ children, color }) {
  return <Tag color={tagColorMap[color] || 'default'}>{children}</Tag>;
});

export default TagBlock;
