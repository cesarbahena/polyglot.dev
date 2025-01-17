"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RouterOutputs } from "@/trpc/query-client";

type Snippet = RouterOutputs["concept"]["getBySlug"]["snippets"][number];
type Concept = RouterOutputs["concept"]["getBySlug"];

interface CodeViewProps {
  snippet: Snippet;
  concept: Concept;
}

const languageMap: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  go: "go",
  rust: "rust",
};

export function CodeView({ snippet, concept }: CodeViewProps) {
  return (
    <div className="w-full max-w-5xl animate-in fade-in duration-300">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-4xl font-bold text-primary">{concept.title}</h2>
        <p className="text-muted-foreground">{concept.category}</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-primary/20 bg-card shadow-lg shadow-primary/5">
        <div className="flex items-center gap-3 border-b border-primary/20 bg-background/50 px-6 py-3">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: snippet.language.color }}
          />
          <span className="font-bold text-primary">{snippet.language.name}</span>
        </div>

        <div className="p-6">
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
      </div>
    </div>
  );
}
