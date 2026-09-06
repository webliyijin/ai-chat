import { memo, useState, useEffect, useRef, useCallback } from 'react';
import {
  Bubble,
  Welcome,
  Prompts,
} from '@ant-design/x';
import {
  RobotOutlined,
  RedoOutlined,
  ReloadOutlined,
  ShareAltOutlined,
  SoundOutlined,
  MoreOutlined,
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
  CopyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Typography,
  Spin,
  Flex,
  Tooltip,
  Dropdown,
  message,
  Avatar,
  Skeleton,
} from 'antd';
import { Think } from '@ant-design/x';
import MarkdownBlock from './MarkdownBlock';

const { Title } = Typography;

// ==================== 视口懒渲染（仅针对 AI 富内容） ====================
// 设计目标：锚点依赖每条消息的固定节点（.chat-msg-item 由 Bubble.List 恒久保留，
// scrollIntoView 仍可精确跳转）。富内容（深度思考 / Markdown / 操作栏）体积大，
// 只对“进入可视区 + 上下缓冲带”的消息真正渲染；离开后卸载，回退为轻量占位节点。
// 占位高度优先取该消息最近一次真实渲染时测量到的高度，避免卸载导致滚动总高跳动。

// 可视区上下缓冲（px），提前加载避免滚动时出现空白
const LAZY_VIEW_BUFFER = 520;

// 富内容真实高度缓存：msg.key -> { sig, h }；sig 由内容长度构成，内容变化时回退估算
const richHeightCache = new Map();
// 深度思考折叠状态缓存：懒渲染卸载/重挂后保持用户的展开/收起选择
const thinkExpandedCache = new Map();

const contentSignature = (msg) => `${(msg.content || '').length}:${(msg.thinkContent || '').length}`;

// 无真实高度时的估算值（按文本量粗估行数，代码块折算成多行）
const estimateRichHeight = (msg) => {
  const measure = (text) => {
    const t = (text || '')
      .replace(/```[\s\S]*?```/g, '\n\n代码块\n\n')
      .replace(/\s+/g, ' ');
    return Math.max(1, Math.ceil(t.length / 36));
  };
  const rows = measure(msg.content) + (msg.thinkContent ? measure(msg.thinkContent) + 3 : 0);
  // 行高约 26px + 内边距与底部操作栏
  return Math.min(Math.max(Math.round(rows * 26) + 48, 72), 4000);
};

// 占位预览文本（去掉 markdown 标记，便于扫读）
const getLazyExcerpt = (msg) => {
  const think = msg.thinkContent ? `[思考] ${msg.thinkContent}` : '';
  const raw = think ? `${think} ` : '';
  return (raw + (msg.content || ''))
    .replace(/```[\s\S]*?```/g, '[代码块]')
    .replace(/[#*`>_~\[\]\(\)!|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * AI 消息富内容（完整渲染版）：深度思考 + 答案 Markdown + 操作栏。
 * 折叠思考区块时把状态写入缓存，供懒渲染重新挂载后恢复。
 */
function AiBubbleContent({
  msg,
  isCancelled,
  isLoading,
  speakingKey,
  feedback,
  onFeedback,
  onRegenerate,
  onCopy,
  onSpeak,
  onShare,
  onContinue,
}) {
  const [thinkExpanded, setThinkExpanded] = useState(
    () => thinkExpandedCache.get(msg.key) ?? true
  );
  const handleThinkExpand = useCallback(
    (expanded) => {
      setThinkExpanded(expanded);
      thinkExpandedCache.set(msg.key, expanded);
    },
    [msg.key]
  );

  return (
    <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 深度思考区块：有 thinkContent 则展示 */}
      {msg.thinkContent ? (
        <Think
          title="深度思考"
          loading={!msg.content}
          blink={!msg.content}
          expanded={thinkExpanded}
          onExpand={handleThinkExpand}
        >
          {msg.thinkContent}
        </Think>
      ) : null}
      {/* 思考中占位（think 和 content 都为空，正在等待） */}
      {!msg.thinkContent && !msg.content ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 0',
          color: '#a855f7',
        }}>
          <Spin size="small" />
          <span style={{ fontSize: 13, color: '#7c3aed' }}>
            正在分析问题...
          </span>
        </div>
      ) : null}
      {/* 答案内容 */}
      <MarkdownBlock content={msg.content} />
      {/* 点赞 / 点踩 — 仅在 AI 回答完成后显示 */}
      <Flex alignItems="center" justify="space-between">
        <Flex>
          {msg.content && !isLoading ? (
            <Flex
              style={{ marginTop: 8, paddingTop: 6 }}
              alignItems="center"
              gap={2}
            >
              <Tooltip title="复制">
                <Button
                  type="text"
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => onCopy(msg.content)}
                />
              </Tooltip>
              <Tooltip title="点赞">
                <Button
                  type="text"
                  size="small"
                  icon={
                    feedback === 'like'
                      ? <LikeFilled style={{ color: '#6366f1' }} />
                      : <LikeOutlined />
                  }
                  onClick={() => onFeedback(msg.key, 'like')}
                />
              </Tooltip>
              <Tooltip title="点踩">
                <Button
                  type="text"
                  size="small"
                  icon={
                    feedback === 'dislike'
                      ? <DislikeFilled style={{ color: '#ef4444' }} />
                      : <DislikeOutlined />
                  }
                  onClick={() => onFeedback(msg.key, 'dislike')}
                />
              </Tooltip>
              <Tooltip title="重新生成">
                <Button
                  type="text"
                  size="small"
                  icon={<ReloadOutlined />}
                  onClick={() => onRegenerate(msg.key)}
                />
              </Tooltip>
              <Tooltip title="分享">
                <Button
                  type="text"
                  size="small"
                  icon={<ShareAltOutlined />}
                  onClick={() => onShare(msg.content)}
                />
              </Tooltip>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'speak',
                      icon: <SoundOutlined />,
                      label: speakingKey === msg.key ? '停止朗读' : '朗读',
                    },
                  ],
                  onClick: ({ key }) => {
                    if (key === 'speak') onSpeak(msg.key, msg.content);
                  },
                }}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button type="text" size="small" icon={<MoreOutlined />} />
              </Dropdown>
            </Flex>
          ) : null}
        </Flex>
        <Flex>
          {/* 继续生成：取消后显示在回答下方 */}
          {isCancelled && !isLoading && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '8px 0 4px 48px',
            }}>
              <Button
                type="primary"
                size="small"
                icon={<RedoOutlined />}
                onClick={onContinue}
              >
                继续生成
              </Button>
            </div>
          )}
        </Flex>
      </Flex>
    </div>
  );
}

/**
 * AI 消息富内容（懒渲染版）：仅当消息进入“可视区 + 缓冲带”时渲染 AiBubbleContent；
 * 否则渲染等高的轻量占位节点，用 IntersectionObserver 驱动状态。
 * 外层固定节点始终由 Bubble.List 保留，不影响锚点 scrollIntoView 定位。
 */
const LazyAiContent = memo(function LazyAiContent({ msg, ...contentProps }) {
  const [near, setNear] = useState(false);
  const wrapRef = useRef(null);
  const measureRef = useRef(null);
  // 始终保持最新 msg，供 ResizeObserver 回调读取当前内容签名
  const msgRef = useRef(msg);
  msgRef.current = msg;

  // 观察自身 wrapper 是否进入可视区（rootMargin 上下缓冲）
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setNear(entry.isIntersecting));
      },
      { rootMargin: `${LAZY_VIEW_BUFFER}px 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 真实渲染期间持续测量高度（流式增长也会更新），供占位复用以避免滚动跳动
  useEffect(() => {
    if (!near) return undefined;
    const el = measureRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => {
      const cur = msgRef.current;
      richHeightCache.set(cur.key, { sig: contentSignature(cur), h: el.offsetHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [near, msg.key]);

  if (!near) {
    const sig = contentSignature(msg);
    const cached = richHeightCache.get(msg.key);
    const h = cached && cached.sig === sig ? cached.h : estimateRichHeight(msg);
    const excerpt = getLazyExcerpt(msg);
    return (
      <div ref={wrapRef} className="msg-lazy" style={{ minHeight: h }}>
        {excerpt ? <span className="msg-lazy-text">{excerpt}</span> : null}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="msg-lazy-rich">
      <div ref={measureRef}>
        <AiBubbleContent msg={msg} {...contentProps} />
      </div>
    </div>
  );
});

/**
 * ChatMessages — 聊天消息区域
 * 使用 React.memo 包裹，只在 messages 变化时重新渲染
 * 内部管理滚动状态，通过 forceScrollKey 接收外部滚动重置指令
 */
const ChatMessages = memo(function ChatMessages({
  messages,
  onSend,
  forceScrollKey,
  isCancelled,
  isLoading,
  isSwitching,
  onContinue,
  onRegenerate,
  feedbackMap,
  onFeedback,
  children,
}) {
  const chatBodyRef = useRef(null);
  const bubbleListRef = useRef(null);
  const smoothScrollRef = useRef(false);
  const anchorLockRef = useRef(false);
  const anchorContainerRef = useRef(null);
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // 消息较多时才开启 AI 富内容懒渲染（消息少时全部真渲染，锚点定位最精确）
  const richLazyEnabled = messages.length > 16;

  // ==================== 锚点定位状态 ====================
  const [activeAnchor, setActiveAnchor] = useState(null);
  const [highlightKey, setHighlightKey] = useState(null);

  // 当外部要求强制滚动（发送消息 / 切换会话）时重置
  useEffect(() => {
    setUserScrolledUp(false);
  }, [forceScrollKey]);

  // 消息内容更新时自动滚动（流式输出），除非用户手动上滑
  // 注意：不依赖 userScrolledUp，避免"回到底部"按钮的平滑滚动被瞬间跳转覆盖
  useEffect(() => {
    if (chatBodyRef.current && !userScrolledUp && !smoothScrollRef.current) {
      requestAnimationFrame(() => {
        if (chatBodyRef.current) {
          chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // ==================== 锚点定位逻辑 ====================

  // 生成消息摘要，用于锚点列表展示
  const getAnchorSummary = useCallback((msg) => {
    let text = msg.content || msg.thinkContent || '';
    text = text
      .replace(/```[\s\S]*?```/g, '[代码]')
      .replace(/[#*`>_~\[\]\(\)!]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!text) return msg.role === 'ai' ? 'AI 回复' : '用户消息';
    return text.length > 16 ? `${text.slice(0, 16)}…` : text;
  }, []);

  // 消息列表滚动时，根据可视区域中心更新当前高亮的锚点（仅定位 user 消息）
  // 注意：chat-body 是实际滚动容器（overflow-y: auto），故基于它计算
  const handleAnchorScroll = useCallback(() => {
    // 点击锚点跳转的滚动过程中不跟随激活，保持点击的那条高亮
    if (anchorLockRef.current) return;
    const listEl = chatBodyRef.current;
    if (!listEl) return;
    const itemEls = listEl.querySelectorAll('.chat-msg-item');
    if (!itemEls.length) return;
    const listRect = listEl.getBoundingClientRect();
    const viewportCenter = listRect.top + listRect.height / 2;
    let currentIndex = 0;
    itemEls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      if (elCenter <= viewportCenter) currentIndex = i;
    });
    // 从当前位置向前找最近的 user 消息作为当前锚点
    let anchorKey = null;
    for (let i = currentIndex; i >= 0; i--) {
      if (messages[i]?.role === 'user') {
        anchorKey = messages[i].key;
        break;
      }
    }
    setActiveAnchor((prev) => (prev === anchorKey ? prev : anchorKey));
  }, [messages]);

  // 监听用户滚动行为（chat-body 为实际滚动容器）
  const handleChatScroll = useCallback(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    setUserScrolledUp(!isAtBottom);
    handleAnchorScroll();
  }, [handleAnchorScroll]);

  // 复制文本到剪贴板（navigator.clipboard 优先，降级到 execCommand）
  const handleCopy = useCallback(async (text) => {
    const copy = async () => {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
      // 降级：非安全上下文（http 局域网等）下使用 execCommand
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    };
    try {
      await copy();
      message.success('复制成功');
    } catch (e) {
      message.error('复制失败');
    }
  }, []);

  // 朗读状态：当前正在朗读的消息 key
  const [speakingKey, setSpeakingKey] = useState(null);

  // 去掉 Markdown 符号，供朗读使用
  const stripMarkdown = useCallback((text) => {
    return (text || '')
      .replace(/```[\s\S]*?```/g, '代码块')
      .replace(/[#*`>_~\[\]\(\)]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }, []);

  // 朗读 / 停止朗读（Web Speech API）
  const handleSpeak = useCallback(
    (key, text) => {
      const synth = window.speechSynthesis;
      if (!synth) {
        message.info('当前浏览器不支持语音朗读');
        return;
      }
      // 正在朗读同一条：停止
      if (speakingKey === key) {
        synth.cancel();
        setSpeakingKey(null);
        return;
      }
      const clean = stripMarkdown(text);
      if (!clean) {
        message.info('内容为空，无法朗读');
        return;
      }
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = 'zh-CN';
      utter.onend = () => setSpeakingKey(null);
      utter.onerror = () => setSpeakingKey(null);
      synth.speak(utter);
      setSpeakingKey(key);
    },
    [speakingKey, stripMarkdown]
  );

  // 组件卸载时停止朗读
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // 分享：优先 Web Share API，降级为复制到剪贴板
  const handleShare = useCallback(
    async (text) => {
      const clean = stripMarkdown(text);
      if (!clean) return;
      if (navigator.share) {
        try {
          await navigator.share({ title: 'AI 回答', text: clean });
          return;
        } catch (e) {
          if (e.name === 'AbortError') return; // 用户取消分享
        }
      }
      await handleCopy(clean);
    },
    [handleCopy, stripMarkdown]
  );

  // 将锚点容器的滚动条滚动到激活项位置
  // 激活的是最后一条时直接贴底（会话初始化默认激活最后一条，对应阅读位置在底部）；
  // 否则尽量居中。手动计算只滚动锚点容器，避免 scrollIntoView 误滚动 chat-body
  const scrollAnchorToActive = useCallback(() => {
    const el = anchorContainerRef.current;
    if (!el || !activeAnchor) return;
    const activeEl = el.querySelector('.chat-anchor-item.active');
    if (!activeEl) return;
    const elRect = el.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();
    // 激活项已完全可见时无需滚动
    if (itemRect.top >= elRect.top && itemRect.bottom <= elRect.bottom) return;
    const items = el.querySelectorAll('.chat-anchor-item');
    // 激活最后一条：滚动到最底部
    if (activeEl === items[items.length - 1]) {
      el.scrollTop = el.scrollHeight;
      return;
    }
    // 其他位置：尽量居中
    const targetTop =
      el.scrollTop + (itemRect.top - elRect.top) - (el.clientHeight - itemRect.height) / 2;
    el.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  }, [activeAnchor]);

  // 激活锚点变化时，锚点容器滚动条跟随到激活项位置
  useEffect(() => {
    scrollAnchorToActive();
  }, [scrollAnchorToActive]);

  // hover 展开锚点面板后，锚点容器滚动条根据激活锚点位置滚动到对应位置
  // 若尚无激活锚点（从未滚动过消息），先默认激活最后一条 user 消息，
  // 激活变化会触发上面的"激活锚点变化"effect 完成滚动
  const handleAnchorEnter = useCallback(() => {
    if (!activeAnchor) {
      const lastUser = [...messages].reverse().find((m) => m.role === 'user');
      if (lastUser) setActiveAnchor(lastUser.key);
      return;
    }
    scrollAnchorToActive();
  }, [activeAnchor, messages, scrollAnchorToActive]);

  // 点击锚点：平滑滚动，将目标消息定位到可视区域顶部
  // 跳转滚动期间锁定高亮，滚动结束后恢复跟随
  const handleAnchorClick = useCallback((key) => {
    setActiveAnchor(key);
    setHighlightKey(key);
    anchorLockRef.current = true;
    bubbleListRef.current?.scrollTo({ key, behavior: 'smooth', block: 'start' });
    const el = chatBodyRef.current;
    const unlock = () => {
      anchorLockRef.current = false;
      el?.removeEventListener('scrollend', unlock);
    };
    el?.addEventListener('scrollend', unlock);
    // 兜底：scrollend 未触发（如自定义动画滚动）时按时解除
    setTimeout(unlock, 1500);
  }, []);

  // 跳转目标消息高亮闪烁（短暂高亮后恢复）
  useEffect(() => {
    if (!highlightKey) return;
    const listEl = bubbleListRef.current?.nativeElement;
    const itemEls = listEl?.querySelectorAll('.chat-msg-item');
    const idx = messages.findIndex((m) => m.key === highlightKey);
    const el = itemEls?.[idx];
    if (!el) return;
    el.classList.add('anchor-flash');
    const timer = setTimeout(() => el.classList.remove('anchor-flash'), 1600);
    return () => {
      clearTimeout(timer);
      el.classList.remove('anchor-flash');
    };
  }, [highlightKey, messages]);

  // 组装 AI 消息富内容：消息少时完整渲染；消息多时走视口懒渲染
  const renderAiContent = useCallback(
    (msg) => {
      const props = {
        msg,
        isCancelled,
        isLoading,
        speakingKey,
        feedback: feedbackMap[msg.key],
        onFeedback,
        onRegenerate,
        onCopy: handleCopy,
        onSpeak: handleSpeak,
        onShare: handleShare,
        onContinue,
      };
      return richLazyEnabled ? (
        <LazyAiContent {...props} />
      ) : (
        <AiBubbleContent {...props} />
      );
    },
    [
      richLazyEnabled,
      isCancelled,
      isLoading,
      speakingKey,
      feedbackMap,
      onFeedback,
      onRegenerate,
      handleCopy,
      handleSpeak,
      handleShare,
      onContinue,
    ]
  );

  return (
    <main className="chat-main">
      <div className="chat-header">
        <Title level={4} style={{ margin: 0 }}>
          <RobotOutlined style={{ marginRight: 8 }} />
          AI 智能助手
        </Title>
      </div>

      <div className="chat-body" ref={chatBodyRef} onScroll={handleChatScroll}>
        {isSwitching ? (
          // 切换会话 / 初始加载时的骨架屏兜底
          <div className="chat-skeleton" aria-busy="true">
            <div className="skeleton-msg">
              <Skeleton.Avatar active shape="circle" size={40} />
              <div className="skeleton-bubble skeleton-bubble-ai">
                <div className="skeleton-think">
                  <Skeleton active title={false} paragraph={{ rows: 2, width: ['80%', '55%'] }} />
                </div>
                <Skeleton active title={false} paragraph={{ rows: 3, width: ['92%', '70%', '45%'] }} />
              </div>
            </div>
            <div className="skeleton-msg skeleton-user">
              <div className="skeleton-bubble skeleton-bubble-user">
                <Skeleton active title={false} paragraph={{ rows: 2, width: ['70%', '50%'] }} />
              </div>
              <Skeleton.Avatar active shape="circle" size={40} />
            </div>
            <div className="skeleton-msg">
              <Skeleton.Avatar active shape="circle" size={40} />
              <div className="skeleton-bubble skeleton-bubble-ai">
                <Skeleton active title={false} paragraph={{ rows: 4, width: ['95%', '85%', '60%', '40%'] }} />
              </div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="welcome-container">
            <Welcome
              variant="borderless"
              icon="https://mdn.alipayobjects.com/huamei_iwkav7/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
              title="你好，我是 AI 智能助手"
              description="我可以帮你回答问题、提供建议、编写代码等。请随时向我提问！"
            />
            <Prompts
              title="你可以这样问我："
              items={[
                { key: '1', label: '帮我写一段 React 代码' },
                { key: '2', label: '解释一下什么是机器学习' },
                { key: '3', label: '给我一些产品设计的建议' },
              ]}
              onItemClick={(info) => onSend(info.data.label)}
            />
          </div>
        ) : (
          <div className="messages-container">
            <Bubble.List
              ref={bubbleListRef}
              items={messages.map((msg) => ({
                key: msg.key,
                className: 'chat-msg-item',
                placement: msg.role === 'user' ? 'end' : 'start',
                content: msg.role === 'ai' ? renderAiContent(msg) : msg.content,
                avatar:
                  msg.role === 'user'
                    ? <Avatar icon={<UserOutlined />} style={{ background: '#6366f1' }} />
                    : <Avatar icon={<RobotOutlined />} style={{ background: '#10b981' }} />,
                typing:
                  msg.role === 'ai' ? { step: 2, interval: 50 } : undefined,
              }))}
            />

          </div>
        )}

        {/* 锚点定位：默认只展示短横线，hover 面板展开显示所有消息（名称 + 横线） */}
        {messages.length > 0 && (
          <div
            className="chat-anchor"
            ref={anchorContainerRef}
            onMouseEnter={handleAnchorEnter}
          >
              {messages
                .filter((msg) => msg.role === 'user')
                .map((msg) => {
                  const isActive = activeAnchor === msg.key;
                  return (
                    <div
                      key={msg.key}
                      className={`chat-anchor-item${isActive ? ' active' : ''}`}
                      onClick={() => handleAnchorClick(msg.key)}
                    >
                      <span className="chat-anchor-name">
                        <span className="chat-anchor-text">{getAnchorSummary(msg)}</span>
                      </span>
                      <span className="chat-anchor-line" />
                    </div>
                  );
                })}
          </div>
        )}

        {userScrolledUp && messages.length > 0 && (
          <div className="scroll-to-bottom">
            <Button
              className={`scroll-btn${isLoading ? ' loading' : ''}`}
              type="primary"
              shape="circle"
              icon={<span style={{ fontSize: 18 }}>↓</span>}
              onClick={() => {
                // 不立即隐藏按钮：滚动过程中保持可见，
                // 由 scroll 事件在接近底部时自然更新 userScrolledUp 而消失
                smoothScrollRef.current = true;
                requestAnimationFrame(() => {
                  chatBodyRef.current?.scrollTo({
                    top: chatBodyRef.current.scrollHeight,
                    behavior: 'smooth',
                  });
                });
                // 平滑滚动结束后释放标记，恢复流式自动跟随
                setTimeout(() => {
                  smoothScrollRef.current = false;
                }, 1000);
              }}
            />
          </div>
        )}
      </div>
      {children}
    </main>
  );
});

export default ChatMessages;
