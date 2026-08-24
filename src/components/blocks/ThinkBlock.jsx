import { memo } from 'react';
import { Think } from '@ant-design/x';

/**
 * ThinkBlock — 使用 @ant-design/x 的 Think 组件渲染深度思考区块
 * 在 XMarkdown 的 components 中注册为 think 标签的渲染器
 */
const ThinkBlock = memo(function ThinkBlock({ children }) {
  if (!children) return null;
  return (
    <Think title="深度思考" defaultExpanded={false}>
      {children}
    </Think>
  );
});

export default ThinkBlock;
