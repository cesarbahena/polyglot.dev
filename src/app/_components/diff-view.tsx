"use client";

import ReactDiffViewer from "react-diff-viewer-continued";
import { type RouterOutputs } from "@/trpc/react";

type Snippet = NonNullable<RouterOutputs["concept"]["getBySlug"]>["snippets"][number];

interface DiffViewProps {
  leftSnippet: Snippet;
  rightSnippet: Snippet;
}

export function DiffView({ leftSnippet, rightSnippet }: DiffViewProps) {
  return (
    <div className="overflow-x-auto p-6">
      <ReactDiffViewer
        oldValue={leftSnippet.code}
        newValue={rightSnippet.code}
        splitView={true}
        leftTitle={leftSnippet.language.name}
        rightTitle={rightSnippet.language.name}
        useDarkTheme={true}
        styles={{
          diffContainer: {
            fontSize: "0.9rem",
            lineHeight: "1.6",
            fontFamily: "JetBrains Mono, Fira Code, Consolas, monospace",
          },
          line: {
            padding: "0.25rem 1rem",
          },
          gutter: {
            padding: "0.25rem 0.5rem",
            minWidth: "3rem",
          },
          marker: {
            padding: "0.25rem",
          },
          wordDiff: {
            padding: "0.125rem 0.25rem",
          },
        }}
        hideLineNumbers={false}
      />
    </div>
  );
}
