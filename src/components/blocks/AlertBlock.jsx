import { memo } from 'react';
import { Alert } from 'antd';

const alertTypeMap = {
  tip: 'info',
  warn: 'warning',
  info: 'info',
  error: 'error',
  note: 'info',
};

const AlertBlock = memo(function AlertBlock({ children, type }) {
  return (
    <Alert
      type={alertTypeMap[type] || 'info'}
      message={<div style={{ whiteSpace: 'pre-wrap' }}>{children}</div>}
      style={{ margin: '12px 0' }}
      showIcon
    />
  );
});

export default AlertBlock;
