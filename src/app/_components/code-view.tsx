"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { type RouterOutputs } from "@/trpc/react";
import { CODE_DISPLAY_CONSTANTS } from "./code-display.constants";
import { CodeDisplayContainer } from "./code-display-container";

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
    fontSize: CODE_DISPLAY_CONSTANTS.fontSize,
    lineHeight: CODE_DISPLAY_CONSTANTS.lineHeight,
    fontFamily: CODE_DISPLAY_CONSTANTS.fontFamily,
    fontWeight: CODE_DISPLAY_CONSTANTS.fontWeight,
  },
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    fontSize: CODE_DISPLAY_CONSTANTS.fontSize,
    lineHeight: CODE_DISPLAY_CONSTANTS.lineHeight,
    fontFamily: CODE_DISPLAY_CONSTANTS.fontFamily,
    fontWeight: CODE_DISPLAY_CONSTANTS.fontWeight,
  },
};

export function CodeView({ snippet }: CodeViewProps) {
  return (
    <div className="p-2">
      <CodeDisplayContainer>
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
            minWidth: CODE_DISPLAY_CONSTANTS.lineNumberMinWidth,
            paddingRight: CODE_DISPLAY_CONSTANTS.lineNumberPaddingRight,
            textAlign: "right",
            userSelect: "none",
            color: CODE_DISPLAY_CONSTANTS.lineNumberColor,
          }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </CodeDisplayContainer>
    </div>
  );
}
