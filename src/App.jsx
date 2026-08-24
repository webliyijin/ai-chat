import { useState } from 'react';
import {
  theme,
  ConfigProvider,
  App as AntApp,
  Modal,
  Input,
} from 'antd';
import useChat from './hooks/useChat';
import ChatSidebar from './components/ChatSidebar';
import ChatMessages from './components/ChatMessages';
import ChatSender from './components/ChatSender';
import './App.css';
import '@ant-design/x-markdown/themes/light.css';
import '@ant-design/x-markdown/themes/dark.css';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const {
    conversations,
    activeKey,
    setActiveKey,
    messages,
    isLoading,
    isCancelled,
    initLoading,
    senderKey,
    forceScrollKey,
    feedbackMap,
    renameModalOpen,
    renameValue,
    setRenameValue,
    closeRenameModal,
    handleSend,
    handleCancelSend,
    handleContinueGenerate,
    handleRegenerate,
    handleFeedback,
    handleNewConversation,
    handleDeleteConversation,
    handleRenameConversation,
    handleRenameConfirm,
  } = useChat();

  // 切换主题
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 12,
        },
      }}
    >
      <AntApp>
        <div className={`app-container ${isDark ? 'dark' : ''}`}>
          <ChatSidebar
            conversations={conversations}
            activeKey={activeKey}
            onActiveChange={setActiveKey}
            initLoading={initLoading}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
            onRenameConversation={handleRenameConversation}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />

          <ChatMessages
            messages={messages}
            onSend={handleSend}
            forceScrollKey={forceScrollKey}
            isCancelled={isCancelled}
            isLoading={isLoading}
            onContinue={handleContinueGenerate}
            onRegenerate={handleRegenerate}
            feedbackMap={feedbackMap}
            onFeedback={handleFeedback}
          >
            <ChatSender
              senderKey={senderKey}
              onSend={handleSend}
              isLoading={isLoading}
              onCancel={handleCancelSend}
            />
          </ChatMessages>
        </div>
        {/* 重命名弹窗 */}
        <Modal
          title="重命名会话"
          open={renameModalOpen}
          onOk={handleRenameConfirm}
          onCancel={closeRenameModal}
          okText="确定"
          cancelText="取消"
          destroyOnHidden
        >
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            placeholder="请输入新的会话名称"
            maxLength={100}
            showCount
            autoFocus
            onPressEnter={handleRenameConfirm}
          />
        </Modal>
      </AntApp>
    </ConfigProvider>
  );
}
