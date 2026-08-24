import { memo } from 'react';

const StepBlock = memo(function StepBlock({ children, index, title }) {
  return (
    <div className="custom-step" style={{ padding: '12px 0' }}>
      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: '#1677ff' }}>
        步骤 {index}：{title}
      </div>
      <div style={{ paddingLeft: 12 }}>{children}</div>
    </div>
  );
});

export default StepBlock;
