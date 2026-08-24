import { memo } from 'react';

const TagListBlock = memo(function TagListBlock({ children }) {
  return (
    <div style={{ margin: '12px 0', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {children}
    </div>
  );
});

export default TagListBlock;
