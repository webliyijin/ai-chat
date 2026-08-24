import { memo } from 'react';
import { Mermaid } from '@ant-design/x';

/**
 * MermaidBlock — 使用 @ant-design/x 的 Mermaid 组件渲染图表
 */
const MermaidBlock = memo(function MermaidBlock({ children }) {
  if (!children) return null;
  const code = typeof children === 'string' ? children : '';
  return <Mermaid>{code}</Mermaid>;
});

export default MermaidBlock;
