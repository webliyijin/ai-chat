import { memo } from 'react';
import { Collapse } from 'antd';

const AccordionBlock = memo(function AccordionBlock({ children, title }) {
  return (
    <Collapse
      size="small"
      style={{ margin: '12px 0' }}
      items={[{ key: '1', label: title, children }]}
    />
  );
});

export default AccordionBlock;
