import React, { memo, useState } from "react";
import { User, Bot, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatMessage = memo(({ message }) => {
  const isUser = message.type === "user";
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Custom components for markdown rendering with enhanced code support
  const markdownComponents = {
    // Style paragraphs with better spacing - but don't wrap block elements
    p: ({ children, node }) => {
      // Check if this paragraph contains block-level elements
      const hasBlockElements = node?.children?.some(child => 
        child.type === 'element' && 
        ['pre', 'div', 'blockquote', 'ul', 'ol', 'table'].includes(child.tagName)
      );
      
      if (hasBlockElements) {
        // If it contains block elements, render as div instead of p
        return <div className="mb-3 leading-relaxed">{children}</div>;
      }
      
      // Check if this paragraph contains text that looks like a section header (ends with colon)
      const text = typeof children === 'string' ? children : 
                   (Array.isArray(children) ? children.join('') : children?.toString() || '');
      const isHeader = text.includes(':') && (text.endsWith(':') || text.match(/:\s*$/));
      
      return (
        <p className={`leading-relaxed ${isHeader ? 'mb-4 mt-4 first:mt-0' : 'mb-3 last:mb-0'}`}>
          {children}
        </p>
      );
    },
    // Style headings
    h1: ({ children }) => (
      <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-md font-semibold mb-2 mt-3 first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-sm font-medium mb-1 mt-2 first:mt-0">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-xs font-medium mb-1 mt-1 first:mt-0">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-xs font-medium mb-1 mt-1 first:mt-0">{children}</h6>
    ),
    // Style lists with proper spacing
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-3 space-y-1 pl-2">{children}</ul>
    ),
    ol: ({ children }) => <div className="mb-3 space-y-1 pl-2">{children}</div>,
    li: ({ children }) => <div className="leading-relaxed">{children}</div>,
    // Style strong/bold text with better prominence for section headers
    strong: ({ children }) => {
      return (
        <strong className="font-bold text-current">
          {children}
        </strong>
      );
    },
    // Style emphasis/italic
    em: ({ children }) => <em className="italic">{children}</em>,
    // Enhanced code handling with syntax highlighting and copy functionality
    code: ({ inline, children, className }) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeString = String(children).replace(/\n$/, "");
      const codeId = `code-${Date.now()}-${Math.random()}`;

      if (!inline && language) {
        // Multi-line code block with syntax highlighting and language detection
        return (
          <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-900">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-xs">
              <span className="font-mono font-semibold">
                {language.toUpperCase()}
              </span>
              <button
                onClick={() => copyToClipboard(codeString, codeId)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                title="Copy code">
                {copiedCode === codeId ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </button>
            </div>
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={language}
              PreTag="div"
              customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
                background: "transparent",
              }}
              showLineNumbers={codeString.split("\n").length > 5}
              wrapLines={true}
              wrapLongLines={true}>
              {codeString}
            </SyntaxHighlighter>
          </div>
        );
      } else if (!inline) {
        // Multi-line code block without language specification
        return (
          <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-900">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-xs">
              <span className="font-mono font-semibold">CODE</span>
              <button
                onClick={() => copyToClipboard(codeString, codeId)}
                className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                title="Copy code">
                {copiedCode === codeId ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-gray-300 font-mono text-sm overflow-x-auto bg-gray-900 leading-relaxed">
              <code>{codeString}</code>
            </pre>
          </div>
        );
      } else {
        // Inline code
        return (
          <code className="bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
            {children}
          </code>
        );
      }
    },
    // Style blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic mb-3 text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    // Handle tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-3">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-300 dark:border-gray-600 px-3 py-2 bg-gray-50 dark:bg-gray-700 font-semibold text-left">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2">
        {children}
      </td>
    ),
    // Handle horizontal rules
    hr: () => <hr className="border-gray-300 dark:border-gray-600 my-4" />,
    // Handle links
    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline">
        {children}
      </a>
    ),
  };

  return (
    <div className={`flex mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}>
        <div className={`flex-shrink-0 ${isUser ? "ml-3" : "mr-3"}`}>
          {isUser ? (
            <User className="w-8 h-8 p-1 rounded-full bg-primary-500 text-white" />
          ) : (
            <Bot className="w-8 h-8 p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white" />
          )}
        </div>
        <div
          className={`px-4 py-3 rounded-lg shadow-sm min-w-0 ${
            isUser
              ? "bg-primary-500 text-white rounded-br-none"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none border border-gray-200 dark:border-gray-700"
          }`}>
          <div className="text-sm break-words">
            {isUser ? (
              // For user messages, keep simple text formatting
              <p className="whitespace-pre-wrap break-words">
                {message.content}
              </p>
            ) : (
              // For AI messages, use markdown rendering with syntax highlighting
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown 
                  components={markdownComponents} 
                  skipHtml={true}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          {message.timestamp && (
            <p className="text-xs mt-2 opacity-70">
              {new Date(message.timestamp).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
