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

export function CodeView({ snippet }: CodeViewProps) {
  return (
    <div className="p-2">
      <SyntaxHighlighter
        language={languageMap[snippet.language.slug] ?? "javascript"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          background: "transparent",
          fontSize: "0.95rem",
          lineHeight: "1.6",
        }}
        showLineNumbers
      >
        {snippet.code}
      </SyntaxHighlighter>
    </div>
  );
}
