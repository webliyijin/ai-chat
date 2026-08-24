import { memo } from 'react';
import { XMarkdown } from '@ant-design/x-markdown';
import StepBlock from './blocks/StepBlock';
import CardBlock from './blocks/CardBlock';
import ComparisonBlock from './blocks/ComparisonBlock';
import CodeExampleBlock from './blocks/CodeExampleBlock';
import TimelineBlock from './blocks/TimelineBlock';
import TimelineItemBlock from './blocks/TimelineItemBlock';
import AccordionBlock from './blocks/AccordionBlock';
import TagListBlock from './blocks/TagListBlock';
import TagBlock from './blocks/TagBlock';
import MetricsBlock from './blocks/MetricsBlock';
import AlertBlock from './blocks/AlertBlock';
import ThinkBlock from './blocks/ThinkBlock';
import MermaidBlock from './blocks/MermaidBlock';

// Mermaid 代码块 vs 普通代码高亮
const CodeBlock = memo(function CodeBlock({ className, children }) {
  const langMatch = className && className.match(/language-(\w+)/);
  const lang = langMatch ? langMatch[1] : '';

  if (lang === 'mermaid' && typeof children === 'string') {
    return <MermaidBlock>{children}</MermaidBlock>;
  }

  return <CodeExampleBlock className={className}>{children}</CodeExampleBlock>;
});

const components = {
  step: StepBlock,
  card: CardBlock,
  comparison: ComparisonBlock,
  'code-example': CodeExampleBlock,
  code: CodeBlock,
  think: ThinkBlock,
  timeline: TimelineBlock,
  'timeline-item': TimelineItemBlock,
  accordion: AccordionBlock,
  'tag-list': TagListBlock,
  tag: TagBlock,
  metrics: MetricsBlock,
  blockquote: AlertBlock,
};

const MarkdownBlock = memo(function MarkdownBlock({ content }) {
  if (!content) {
    return (
      <span style={{ color: '#999', fontStyle: 'italic' }}>思考中...</span>
    );
  }
  return <XMarkdown content={content} components={components} streaming={{enableAnimation:true}} />;
});

export default MarkdownBlock;
