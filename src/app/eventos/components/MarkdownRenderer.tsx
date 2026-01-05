
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Components } from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  variant?: "full" | "preview" | "compact";
  className?: string;
  maxLines?: number;
}

/**
 * Si quieres permitir HTML controlado, ampliamos el schema.
 * Si NO necesitas HTML, puedes remover rehypeRaw y dejar solo sanitize.
 */
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a || []),
      ["target", "_blank"],
      ["rel", "noopener noreferrer"],
    ],
  },
};

const clampClassMap: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

export const MarkdownRenderer = ({
  content,
  variant = "full",
  className = "",
  maxLines,
}: MarkdownRendererProps) => {
  const baseStyles: Record<NonNullable<MarkdownRendererProps["variant"]>, string> =
    {
      full: "prose prose-lg max-w-none",
      preview: "prose prose-base max-w-none",
      compact: "prose prose-sm max-w-none",
    };

  const colorClasses =
    "prose-headings:text-church-blue-900 prose-p:text-church-blue-700 prose-a:text-church-gold-600 prose-strong:text-church-gold-600 prose-ul:text-church-blue-700 prose-ol:text-church-blue-700";

  const clampClass = maxLines ? clampClassMap[maxLines] : "";

  const wrapperClasses = [baseStyles[variant], colorClasses, clampClass, className]
    .filter(Boolean)
    .join(" ");

  const fullComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-church-gold-600 mt-6 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-church-gold-600 mt-5 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-church-blue-800 mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-church-blue-800 mt-3 mb-2">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-church-blue-700 text-lg">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-church-blue-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-church-blue-700">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-bold text-church-gold-600">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-church-blue-800">{children}</em>,

    // ✅ FIX <a>
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-church-gold-600 hover:text-church-gold-700 underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-church-gold-400 pl-4 italic my-4 text-church-blue-600 bg-church-sky-50 py-3 rounded-r-lg">
        {children}
      </blockquote>
    ),

    // ✅ code inline y bloque (pre)
    code: ({ children }) => (
      <code className="bg-church-sky-100 px-2 py-1 rounded text-sm font-mono text-church-blue-800">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="block bg-church-blue-900 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
        {children}
      </pre>
    ),

    hr: () => <hr className="my-6 border-t-2 border-church-gold-300" />,

    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-church-sky-200 border border-church-sky-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-church-sky-100">{children}</thead>,
    th: ({ children }) => (
      <th className="px-4 py-2 text-left text-sm font-semibold text-church-blue-900">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-sm text-church-blue-700 border-t border-church-sky-200">
        {children}
      </td>
    ),
  };

  const compactComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-xl font-bold text-church-gold-600 mt-3 mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-lg font-bold text-church-gold-600 mt-2 mb-1">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-base font-bold text-church-blue-800 mt-2 mb-1">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-sm font-bold text-church-blue-800 mt-1 mb-1">{children}</h4>
    ),
    p: ({ children }) => <p className="mb-2 leading-relaxed text-church-blue-700">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-2 space-y-1 text-church-blue-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-2 space-y-1 text-church-blue-700">{children}</ol>
    ),
    li: ({ children }) => <li className="ml-2">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-church-gold-600">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-church-blue-800">{children}</em>,

    // ✅ FIX <a>
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-church-gold-600 hover:text-church-gold-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-church-gold-400 pl-2 italic my-2 text-church-blue-600 text-sm">
        {children}
      </blockquote>
    ),

    code: ({ children }) => (
      <code className="bg-church-sky-100 px-1 py-0.5 rounded text-xs font-mono text-church-blue-800">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="block bg-church-blue-900 text-white p-2 rounded text-xs font-mono my-2 overflow-x-auto">
        {children}
      </pre>
    ),

    // Preview: omitimos tablas
    table: () => null,
    hr: () => <hr className="my-2 border-t border-church-gold-300" />,
  };

  const components = variant === "full" ? fullComponents : compactComponents;

  return (
    <div className={wrapperClasses}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // ✅ raw primero, sanitize después
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, sanitizeSchema],
        ]}
        components={components}
      >
        {content?.trim() ? content : "Sem descrição disponível."}
      </ReactMarkdown>
    </div>
  );
};
