const BASE_URL = '/api';

async function request(url, options = {}) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error(data.message || '请求失败');
  }
  return data;
}

// 会话接口
export const getConversations = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/conversations?${query}`);
};

export const getConversationById = (id) => request(`/conversations/${id}`);

export const createConversation = (data) =>
  request('/conversations', { method: 'POST', body: JSON.stringify(data) });

export const updateConversation = (id, data) =>
  request(`/conversations/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const renameConversation = (id, title) =>
  request(`/conversations/${id}/rename`, { method: 'PATCH', body: JSON.stringify({ title }) });

export const deleteConversation = (id) =>
  request(`/conversations/${id}`, { method: 'DELETE' });

export const batchDeleteConversations = (ids) =>
  request('/conversations/batch-delete', { method: 'POST', body: JSON.stringify({ ids }) });

// 消息接口
export const getMessages = (conversationId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/conversations/${conversationId}/messages?${query}`);
};

export const addMessages = (conversationId, messages) =>
  request(`/conversations/${conversationId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ messages }),
  });

export const deleteMessage = (conversationId, messageId) =>
  request(`/conversations/${conversationId}/messages/${messageId}`, { method: 'DELETE' });

export const clearMessages = (conversationId) =>
  request(`/conversations/${conversationId}/messages`, { method: 'DELETE' });

// 点赞/点踩
export const updateFeedback = (messageId, feedback) =>
  request(`/messages/${messageId}/feedback`, {
    method: 'PATCH',
    body: JSON.stringify({ feedback }),
  });

// SSE 流式聊天接口
export const chatStream = (conversationId, message, callbacks, signal, isContinue = false) => {
  const {
    onConversation,
    onDelta,
    onThinking,
    onThinkingStep,
    onThinkDelta,
    onThinkEnd,
    onDone,
    onError,
  } = callbacks;

  return fetch(`${BASE_URL}/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, message, isContinue }),
    signal,
  }).then(async (response) => {
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || '请求失败');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let currentEvent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('event: ')) {
          currentEvent = line.slice(7).trim();
        } else if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6).trim());
            switch (currentEvent) {
              case 'conversation':
                onConversation?.(data);
                break;
              case 'delta':
                onDelta?.(data);
                break;
              case 'thinking':
                onThinking?.(data);
                break;
              case 'thinking_step':
                onThinkingStep?.(data);
                break;
              case 'think_delta':
                onThinkDelta?.(data);
                break;
              case 'think_end':
                onThinkEnd?.(data);
                break;
              case 'done':
                onDone?.(data);
                break;
              case 'error':
                onError?.(data);
                break;
            }
          } catch {
            // 忽略 JSON 解析错误
          }
          currentEvent = '';
        }
      }
    }
  });
};
