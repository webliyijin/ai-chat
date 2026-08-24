import { memo } from 'react';
import { Card } from 'antd';

const cardColors = {
  info: '#1677ff',
  warn: '#fa8c16',
  success: '#52c41a',
  error: '#ff4d4f',
  tip: '#722ed1',
  note: '#666',
};

const CardBlock = memo(function CardBlock({ children, type, title }) {
  return (
    <Card
      size="small"
      title={title}
      style={{
        margin: '12px 0',
        borderLeft: '3px solid ' + (cardColors[type] || '#1677ff'),
      }}
      styles={{
        header: { borderBottom: 'none', minHeight: 'auto', padding: '8px 12px' },
        body: { padding: '8px 12px' },
      }}
    >
      {children}
    </Card>
  );
});

export default CardBlock;
