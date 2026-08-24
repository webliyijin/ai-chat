import { memo } from 'react';

const MetricsBlock = memo(function MetricsBlock({ children }) {
  return <div style={{ margin: '16px 0' }}>{children}</div>;
});

export default MetricsBlock;
