import { useState, useCallback, useEffect, useRef, useTransition } from 'react';
import { message, Modal } from 'antd';
import {
  getConversations,
  renameConversation,
  deleteConversation,
  getMessages,
  chatStream,
  updateFeedback,
} from '../api';

/**
 * 会话核心能力 Hook：管理会话列表、消息流、流式请求、反馈、重命名等。
 */
export default function useChat() {
  const [conversations, setConversations] = useState([]);
  const [activeKey, setActiveKey] = useState('');
  const [messagesMap, setMessagesMap] = useState({});
  const [loadingMap, setLoadingMap] = useState({});
  const [initLoading, setInitLoading] = useState(true);
  // 记录已同步到后端的会话ID
  const syncedRef = useRef(new Set());
  // 用于强制清空输入框
  const [senderKey, setSenderKey] = useState(0);
  // 通知 ChatMessages 强制重置滚动（发送消息 / 切换会话）
  const [forceScrollKey, setForceScrollKey] = useState(0);
  // 取消请求的 AbortController
  const abortControllerRef = useRef(null);
  // 标记被取消的会话（用于显示"继续生成"按钮）
  const [cancelledMap, setCancelledMap] = useState({});
  // 点赞/点踩反馈状态：{ messageKey: 'like' | 'dislike' }
  const [feedbackMap, setFeedbackMap] = useState({});
  // 重命名相关状态
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renamingKey, setRenamingKey] = useState('');
  const [renameValue, setRenameValue] = useState('');
  // 降低流式渲染中的 Markdown 更新优先级，避免滚动卡顿
  const [, startTransition] = useTransition();
  // 保持对 messagesMap 的最新引用，供异步回调使用
  const messagesMapRef = useRef(messagesMap);
  useEffect(() => { messagesMapRef.current = messagesMap; }, [messagesMap]);

  const messages = messagesMap[activeKey] || [];
  const isLoading = loadingMap[activeKey] || false;
  const isCancelled = cancelledMap[activeKey] || false;

  // 初始化：加载会话列表
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const { data } = await getConversations({ pageSize: 100 });
        if (data && data.length > 0) {
          const convs = data.map((c) => ({ key: c.id, label: c.title }));
          setConversations(convs);
          setActiveKey(convs[0].key);
          // 标记已同步
          data.forEach((c) => syncedRef.current.add(c.id));
          // 加载第一个会话的消息
          const { data: msgs } = await getMessages(convs[0].key);
          // 构建 feedback 初始状态
          const initialFeedback = {};
          msgs.forEach((m) => {
            if (m.feedback) initialFeedback[m.id] = m.feedback;
          });
          setFeedbackMap(initialFeedback);
          setMessagesMap((prev) => ({
            ...prev,
            [convs[0].key]: msgs.map((m) => ({
              key: m.id,
              role: m.role === 'ai' ? 'ai' : 'user',
              content: m.content,
              thinkContent: m.thinkContent || null,
              thinkingProcess: m.thinkingProcess || null,
            })),
          }));
        }
      } catch (err) {
        console.error('加载会话列表失败:', err);
      } finally {
        setInitLoading(false);
      }
    };
    loadConversations();
  }, []);

  // 切换会话时加载消息
  useEffect(() => {
    if (!activeKey || messagesMap[activeKey]) return;
    setForceScrollKey((k) => k + 1);
    const loadMsgs = async () => {
      try {
        const { data } = await getMessages(activeKey);
        const fb = {};
        data.forEach((m) => { if (m.feedback) fb[m.id] = m.feedback; });
        setFeedbackMap(fb);
        setMessagesMap((prev) => ({
          ...prev,
          [activeKey]: data.map((m) => ({
            key: m.id,
            role: m.role === 'ai' ? 'ai' : 'user',
            content: m.content,
            thinkContent: m.thinkContent || null,
            thinkingProcess: m.thinkingProcess || null,
          })),
        }));
      } catch (err) {
        console.error('加载消息失败:', err);
        setMessagesMap((prev) => ({ ...prev, [activeKey]: [] }));
      }
    };
    loadMsgs();
  }, [activeKey]);

  // 发送消息
  const handleSend = useCallback(
    async (value) => {
      if (!value?.trim()) return;

      setForceScrollKey((k) => k + 1);
      const convId = activeKey;

      // 发送新消息时清除取消标记
      setCancelledMap((prev) => {
        if (!prev[convId]) return prev;
        const next = { ...prev };
        delete next[convId];
        return next;
      });

      // 创建 AbortController
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const userMsg = {
        key: Date.now(),
        role: 'user',
        content: value,
      };

      // 添加用户消息到界面
      setMessagesMap((prev) => ({
        ...prev,
        [convId]: [...(prev[convId] || []), userMsg],
      }));
      setLoadingMap((prev) => ({ ...prev, [convId]: true }));

      // 创建 AI 消息占位，用于流式填充
      const aiMsgKey = Date.now() + 1;
      const aiMsg = {
        key: aiMsgKey,
        role: 'ai',
        content: '',
        thinkContent: '',
        thinkingSteps: [],
      };
      setMessagesMap((prev) => ({
        ...prev,
        [convId]: [...(prev[convId] || []), aiMsg],
      }));

      // 立即清空输入框
      setSenderKey((k) => k + 1);

      try {
        await chatStream(convId, value, {
          onConversation: (data) => {
            // 标记会话已同步到后端
            syncedRef.current.add(data.id);
            // 更新侧边栏标题
            setConversations((prev) =>
              prev.map((c) => (c.key === data.id ? { ...c, label: data.title } : c))
            );
          },
          onDelta: (data) => {
            startTransition(() => {
              setMessagesMap((prev) => ({
                ...prev,
                [convId]: (prev[convId] || []).map((m) =>
                  m.key === aiMsgKey ? { ...m, content: m.content + data.content } : m
                ),
              }));
            });
          },
          onThinkDelta: (data) => {
            startTransition(() => {
              setMessagesMap((prev) => ({
                ...prev,
                [convId]: (prev[convId] || []).map((m) =>
                  m.key === aiMsgKey
                    ? { ...m, thinkContent: m.thinkContent + data.content }
                    : m
                ),
              }));
            });
          },
          onThinkEnd: () => {
            // 深度思考流结束，标记 thinkContent 不再变化
          },
          onThinkingStep: (data) => {
            startTransition(() => {
              setMessagesMap((prev) => ({
                ...prev,
                [convId]: (prev[convId] || []).map((m) =>
                  m.key === aiMsgKey
                    ? {
                        ...m,
                        thinkingSteps: [
                          ...(m.thinkingSteps || []),
                          data,
                        ],
                      }
                    : m
                ),
              }));
            });
          },
          onDone: (data) => {
            startTransition(() => {
              setMessagesMap((prev) => ({
                ...prev,
                [convId]: (prev[convId] || []).map((m) =>
                  m.key === aiMsgKey
                    ? {
                        ...m,
                        content: data.content,
                        thinkContent: data.thinkContent || m.thinkContent,
                      }
                    : m
                ),
              }));
            });
          },
          onError: (data) => {
            message.error(data.message || '请求失败');
          },
        }, controller.signal);
      } catch (err) {
        // 用户手动取消：保留已有内容，不做错误提示
        if (err.name === 'AbortError') {
          return;
        }
        console.error('发送消息失败:', err);
        message.error('发送消息失败，请重试');
        setMessagesMap((prev) => ({
          ...prev,
          [convId]: (prev[convId] || []).filter(
            (m) => m.key !== userMsg.key && m.key !== aiMsgKey
          ),
        }));
      } finally {
        setLoadingMap((prev) => ({ ...prev, [convId]: false }));
      }
    },
    [activeKey]
  );

  // 取消发送
  const handleCancelSend = useCallback(() => {
    // 终止当前请求
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    // 标记为取消状态，保留已有内容
    setCancelledMap((prev) => ({ ...prev, [activeKey]: true }));
    setLoadingMap((prev) => ({ ...prev, [activeKey]: false }));
  }, [activeKey]);

  // 继续生成
  const handleContinueGenerate = useCallback(() => {
    const convId = activeKey;

    // 清除取消标记
    setCancelledMap((prev) => {
      if (!prev[convId]) return prev;
      const next = { ...prev };
      delete next[convId];
      return next;
    });

    // 创建 AbortController
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoadingMap((prev) => ({ ...prev, [convId]: true }));

    // 找到当前会话中最后一个 AI 消息（即被中断的消息）
    const currentMsgs = messagesMapRef.current[convId] || [];
    const lastAiMsg = [...currentMsgs].reverse().find((m) => m.role === 'ai');
    const aiMsgKey = lastAiMsg?.key;

    if (!aiMsgKey) {
      message.error('未找到可继续的消息');
      setLoadingMap((prev) => ({ ...prev, [convId]: false }));
      return;
    }

    // 发起 continue 请求 — 不创建新用户消息，续接到已有 AI 消息
    chatStream(convId, '', {
      onDelta: (data) => {
        startTransition(() => {
          setMessagesMap((prev) => ({
            ...prev,
            [convId]: (prev[convId] || []).map((m) =>
              m.key === aiMsgKey ? { ...m, content: m.content + data.content } : m
            ),
          }));
        });
      },
      onDone: (data) => {
        startTransition(() => {
          setMessagesMap((prev) => ({
            ...prev,
            [convId]: (prev[convId] || []).map((m) =>
              m.key === aiMsgKey
                ? {
                    ...m,
                    content: data.content,
                    thinkContent: data.thinkContent || m.thinkContent,
                  }
                : m
            ),
          }));
        });
      },
      onError: (data) => {
        message.error(data.message || '继续生成失败');
      },
    }, controller.signal, true).catch((err) => {
      if (err.name === 'AbortError') return;
      console.error('继续生成失败:', err);
      message.error('继续生成失败，请重试');
    }).finally(() => {
      setLoadingMap((prev) => ({ ...prev, [convId]: false }));
    });
  }, [activeKey]);

  // 重新生成：删除指定 AI 回答，基于其前一条用户消息重新请求
  const handleRegenerate = useCallback(
    (aiMsgKey) => {
      const convId = activeKey;
      const currentMsgs = messagesMapRef.current[convId] || [];
      const idx = currentMsgs.findIndex((m) => m.key === aiMsgKey);
      if (idx < 0 || currentMsgs[idx]?.role !== 'ai') return;

      // 找到该 AI 回答之前最近的一条用户消息
      let prompt = '';
      for (let i = idx - 1; i >= 0; i--) {
        if (currentMsgs[i].role === 'user') {
          prompt = currentMsgs[i].content || '';
          break;
        }
      }
      if (!prompt.trim()) {
        message.error('未找到对应的用户问题');
        return;
      }

      // 删除该 AI 回答及之后的消息，保留之前的内容
      setMessagesMap((prev) => ({
        ...prev,
        [convId]: currentMsgs.slice(0, idx),
      }));
      setCancelledMap((prev) => {
        if (!prev[convId]) return prev;
        const next = { ...prev };
        delete next[convId];
        return next;
      });

      // 创建新的 AI 占位消息并重新请求
      const aiMsgKeyNew = Date.now() + 1;
      setMessagesMap((prev) => ({
        ...prev,
        [convId]: [
          ...(prev[convId] || []),
          {
            key: aiMsgKeyNew,
            role: 'ai',
            content: '',
            thinkContent: '',
            thinkingSteps: [],
          },
        ],
      }));
      setLoadingMap((prev) => ({ ...prev, [convId]: true }));

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      chatStream(convId, prompt, {
        onDelta: (data) => {
          startTransition(() => {
            setMessagesMap((prev) => ({
              ...prev,
              [convId]: (prev[convId] || []).map((m) =>
                m.key === aiMsgKeyNew
                  ? { ...m, content: m.content + data.content }
                  : m
              ),
            }));
          });
        },
        onThinkDelta: (data) => {
          startTransition(() => {
            setMessagesMap((prev) => ({
              ...prev,
              [convId]: (prev[convId] || []).map((m) =>
                m.key === aiMsgKeyNew
                  ? { ...m, thinkContent: m.thinkContent + data.content }
                  : m
              ),
            }));
          });
        },
        onThinkingStep: (data) => {
          startTransition(() => {
            setMessagesMap((prev) => ({
              ...prev,
              [convId]: (prev[convId] || []).map((m) =>
                m.key === aiMsgKeyNew
                  ? { ...m, thinkingSteps: [...(m.thinkingSteps || []), data] }
                  : m
              ),
            }));
          });
        },
        onDone: (data) => {
          startTransition(() => {
            setMessagesMap((prev) => ({
              ...prev,
              [convId]: (prev[convId] || []).map((m) =>
                m.key === aiMsgKeyNew
                  ? {
                      ...m,
                      content: data.content,
                      thinkContent: data.thinkContent || m.thinkContent,
                    }
                  : m
              ),
            }));
          });
        },
        onError: (data) => {
          message.error(data.message || '重新生成失败');
        },
      }, controller.signal)
        .catch((err) => {
          if (err.name === 'AbortError') return;
          console.error('重新生成失败:', err);
          message.error('重新生成失败，请重试');
        })
        .finally(() => {
          setLoadingMap((prev) => ({ ...prev, [convId]: false }));
        });
    },
    [activeKey]
  );

  // 点赞 / 点踩反馈
  const handleFeedback = useCallback(async (msgKey, type) => {
    const sameType = feedbackMap[msgKey] === type;
    const apiFeedback = sameType ? null : type;
    // 先更新本地状态
    setFeedbackMap((prev) => {
      if (sameType) {
        const next = { ...prev };
        delete next[msgKey];
        return next;
      }
      return { ...prev, [msgKey]: type };
    });
    // 调用后端接口
    try {
      const res = await updateFeedback(msgKey, apiFeedback);
      console.log(res, 'eeee');
      if (res.success) {
        message.success('感谢反馈！');
      }
    } catch (err) {
      message.error('反馈操作失败');
    }
  }, [feedbackMap]);

  // 新建会话
  const handleNewConversation = useCallback(() => {
    const newKey = Date.now().toString() + Math.random().toString(36).slice(2, 8);
    setConversations((prev) => [...prev, { key: newKey, label: '新对话' }]);
    setMessagesMap((prev) => ({ ...prev, [newKey]: [] }));
    setActiveKey(newKey);
  }, []);

  // 删除会话
  const handleDeleteConversation = useCallback(
    (key) => {
      if (conversations.length <= 1) return;
      Modal.confirm({
        title: '确认删除',
        content: '确定要删除这个对话吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            if (syncedRef.current.has(key)) {
              await deleteConversation(key);
              syncedRef.current.delete(key);
            }
          } catch (err) {
            console.error('删除会话失败:', err);
            message.error('删除会话失败');
            return;
          }
          setConversations((prev) => prev.filter((c) => c.key !== key));
          setMessagesMap((prev) => {
            const newMap = { ...prev };
            delete newMap[key];
            return newMap;
          });
          if (activeKey === key) {
            const remaining = conversations.filter((c) => c.key !== key);
            setActiveKey(remaining[0]?.key || '');
          }
        },
      });
    },
    [conversations, activeKey]
  );

  // 打开重命名弹窗
  const handleRenameConversation = useCallback(
    (key) => {
      const conv = conversations.find((c) => c.key === key);
      setRenamingKey(key);
      setRenameValue(conv?.label || '');
      setRenameModalOpen(true);
    },
    [conversations]
  );

  // 关闭重命名弹窗
  const closeRenameModal = useCallback(() => {
    setRenameModalOpen(false);
    setRenamingKey('');
    setRenameValue('');
  }, []);

  // 确认重命名
  const handleRenameConfirm = useCallback(async () => {
    const trimmed = renameValue.trim();
    if (!trimmed) {
      message.warning('会话名称不能为空');
      return;
    }
    if (trimmed.length > 100) {
      message.warning('会话名称不能超过100个字符');
      return;
    }
    try {
      if (syncedRef.current.has(renamingKey)) {
        await renameConversation(renamingKey, trimmed);
      }
      setConversations((prev) =>
        prev.map((c) => (c.key === renamingKey ? { ...c, label: trimmed } : c))
      );
      message.success('重命名成功');
    } catch (err) {
      console.error('重命名会话失败:', err);
      message.error('重命名失败，请重试');
    } finally {
      closeRenameModal();
    }
  }, [renameValue, renamingKey, closeRenameModal]);

  return {
    // 状态
    conversations,
    activeKey,
    setActiveKey,
    messagesMap,
    messages,
    isLoading,
    isCancelled,
    initLoading,
    senderKey,
    forceScrollKey,
    feedbackMap,
    // 重命名弹窗
    renameModalOpen,
    renameValue,
    setRenameValue,
    closeRenameModal,
    // 操作
    handleSend,
    handleCancelSend,
    handleContinueGenerate,
    handleRegenerate,
    handleFeedback,
    handleNewConversation,
    handleDeleteConversation,
    handleRenameConversation,
    handleRenameConfirm,
  };
}
