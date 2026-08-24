import { memo } from 'react';

const ComparisonBlock = memo(function ComparisonBlock({ children, title }) {
  return (
    <div className="custom-comparison" style={{ margin: '16px 0' }}>
      {title && (
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>{title}</div>
      )}
      {children}
    </div>
  );
});

export default ComparisonBlock;
