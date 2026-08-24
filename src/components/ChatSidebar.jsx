import { memo } from 'react';
import { Conversations } from '@ant-design/x';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';

const ChatSidebar = memo(function ChatSidebar({
  conversations,
  activeKey,
  onActiveChange,
  initLoading,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
  isDark,
  onToggleTheme,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onNewConversation}
          block
          size="large"
        >
          新建对话
        </Button>
      </div>
      <div className="conversations-wrapper">
        {initLoading ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>
            加载中...
          </div>
        ) : conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#999' }}>
            暂无对话，点击上方按钮创建
          </div>
        ) : (
          <Conversations
            activeKey={activeKey}
            onActiveChange={(key) => {
              if (activeKey === key) return
              onActiveChange(key)
            }}
            items={conversations}
            menu={(item) => ({
              items: [
                {
                  label: '重命名',
                  key: 'rename',
                  icon: <EditOutlined />,
                  onClick: () => onRenameConversation(item.key),
                },
                {
                  label: '删除对话',
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => onDeleteConversation(item.key),
                },
              ],
            })}
          />
        )}
      </div>
      <div className="sidebar-footer">
        <Button
          icon={isDark ? <SunOutlined /> : <MoonOutlined />}
          onClick={onToggleTheme}
          block
          shape="round"
        >
          {isDark ? '浅色模式' : '深色模式'}
        </Button>
      </div>
    </aside>
  );
});

export default ChatSidebar;
