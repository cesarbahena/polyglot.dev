"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { type RouterOutputs } from "@/trpc/react";

type Snippet = NonNullable<RouterOutputs["concept"]["getBySlug"]>["snippets"][number];

interface CodeViewProps {
  snippet: Snippet;
}

const languageMap: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  go: "go",
  rust: "rust",
};

const customVscDarkPlus = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    fontSize: "0.95rem",
    lineHeight: "1.6",
    fontFamily: "JetBrains Mono, Fira Code, Consolas, monospace",
    fontWeight: "normal",
  },
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    fontSize: "0.95rem",
    lineHeight: "1.6",
    fontFamily: "JetBrains Mono, Fira Code, Consolas, monospace",
    fontWeight: "normal",
  },
};

export function CodeView({ snippet }: CodeViewProps) {
  return (
    <div className="p-2">
      <SyntaxHighlighter
        language={languageMap[snippet.language.slug] ?? "javascript"}
        style={customVscDarkPlus}
        customStyle={{
          margin: 0,
          padding: 0,
          background: "transparent",
        }}
        showLineNumbers
        lineNumberStyle={{
          minWidth: "50px",
          paddingRight: "10px",
          textAlign: "right",
          userSelect: "none",
        }}
      >
        {snippet.code}
      </SyntaxHighlighter>
    </div>
  );
}
