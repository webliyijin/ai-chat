import { memo } from 'react';
import { Timeline } from 'antd';

const TimelineBlock = memo(function TimelineBlock({ children }) {
  return <Timeline style={{ margin: '16px 0' }}>{children}</Timeline>;
});

export default TimelineBlock;
