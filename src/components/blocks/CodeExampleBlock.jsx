import { memo } from 'react';
import { CodeHighlighter } from '@ant-design/x';

const CodeExampleBlock = memo(function CodeExampleBlock(props) {
  const { className, children } = props;
  const match = className && className.match(/language-(\w+)/);
  const lang = match ? match[1] : '';
  if (typeof children !== 'string') return null;
  return <CodeHighlighter lang={lang}>{children}</CodeHighlighter>;
});

export default CodeExampleBlock;
