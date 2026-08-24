import { memo } from 'react';
import { Timeline } from 'antd';

const TimelineItemBlock = memo(function TimelineItemBlock({ children, active }) {
  return (
    <Timeline.Item color={active === 'true' ? 'blue' : 'gray'}>
      {children}
    </Timeline.Item>
  );
});

export default TimelineItemBlock;
