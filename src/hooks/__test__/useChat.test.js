import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';

const apiMock = vi.hoisted(() => ({
  getConversations: vi.fn(),
  getMessages: vi.fn(),
  chatStream: vi.fn(),
  renameConversation: vi.fn(),
  deleteConversation: vi.fn(),
  updateFeedback: vi.fn(),
}));

vi.mock('../../api', () => apiMock);

vi.mock('antd', () => ({
  message: { error: vi.fn(), success: vi.fn(), warning: vi.fn() },
  Modal: { confirm: vi.fn() },
}));

import useChat from '../useChat';

describe('useChat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    apiMock.getConversations.mockResolvedValue({ data: [{ id: 'c1', title: '会话1' }] });
    apiMock.getMessages.mockResolvedValue({ data: [] });
    apiMock.chatStream.mockResolvedValue(undefined);
    apiMock.updateFeedback.mockResolvedValue({ success: true });
  });

  it('初始化时加载会话列表并激活第一个会话', async () => {
    apiMock.getMessages.mockResolvedValue({
      data: [{ id: 'm1', role: 'ai', content: '你好', feedback: 'like' }],
    });

    const { result } = renderHook(() => useChat());

    await waitFor(() => {
      expect(result.current.initLoading).toBe(false);
    });

    expect(result.current.conversations).toEqual([{ key: 'c1', label: '会话1' }]);
    expect(result.current.activeKey).toBe('c1');
    expect(result.current.messages).toEqual([
      { key: 'm1', role: 'ai', content: '你好', thinkContent: null, thinkingProcess: null },
    ]);
    expect(result.current.feedbackMap).toEqual({ m1: 'like' });
  });

  it('发送空消息时不调用 chatStream', async () => {
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.initLoading).toBe(false));

    await act(async () => {
      await result.current.handleSend('   ');
    });

    expect(apiMock.chatStream).not.toHaveBeenCalled();
  });

  it('发送消息时添加用户消息并调用 chatStream', async () => {
    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.initLoading).toBe(false));

    await act(async () => {
      await result.current.handleSend('hello');
    });

    expect(apiMock.chatStream).toHaveBeenCalledWith('c1', 'hello', expect.any(Object), expect.any(AbortSignal));
    const msgs = result.current.messages;
    expect(msgs.some((m) => m.role === 'user' && m.content === 'hello')).toBe(true);
    expect(msgs.some((m) => m.role === 'ai' && m.content === '')).toBe(true);
  });

  it('反馈：同类型点击取消，并调用 updateFeedback', async () => {
    apiMock.getMessages.mockResolvedValue({
      data: [{ id: 'm1', role: 'ai', content: 'hi', feedback: 'like' }],
    });

    const { result } = renderHook(() => useChat());
    await waitFor(() => expect(result.current.initLoading).toBe(false));

    await act(async () => {
      await result.current.handleFeedback('m1', 'like');
    });

    expect(apiMock.updateFeedback).toHaveBeenCalledWith('m1', null);
    expect(result.current.feedbackMap).toEqual({});
  });
});
