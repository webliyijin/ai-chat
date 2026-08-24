import { memo } from 'react';
import { Sender } from '@ant-design/x';

/**
 * ChatSender — 输入框区域
 * 使用 React.memo 包裹，只在 senderKey / loading 变化时重新渲染
 * 流式输出期间 isLoading 不变，因此不会被 onDelta 高频率触发
 */
const ChatSender = memo(function ChatSender({ senderKey, onSend, isLoading, onCancel }) {
  return (
    <div className="chat-footer">
      <Sender
        key={senderKey}
        placeholder="请输入你的问题..."
        onSubmit={onSend}
        loading={isLoading}
        onCancel={onCancel}
        allowSpeech
      />
    </div>
  );
});

export default ChatSender;
