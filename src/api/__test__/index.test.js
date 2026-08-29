import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getConversations, getMessages } from '../index';

describe('api/index', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getConversations 构造正确的 URL 并返回数据', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true, data: [{ id: 'c1', title: '会话1' }] }),
    });

    const result = await getConversations({ page: 1 });

    expect(global.fetch).toHaveBeenCalledWith('/api/conversations?page=1', expect.any(Object));
    expect(result.data).toEqual([{ id: 'c1', title: '会话1' }]);
  });

  it('请求失败（success: false）时抛出后端 message', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: false, message: '未授权' }),
    });

    await expect(getMessages('c1')).rejects.toThrow('未授权');
  });

  it('无参数时不追加多余 query', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ({ success: true, data: [] }),
    });

    await getConversations();

    expect(global.fetch).toHaveBeenCalledWith('/api/conversations?', expect.any(Object));
  });
});
