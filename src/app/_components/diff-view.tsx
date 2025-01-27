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
    <div className="overflow-x-auto p-2">
      <ReactDiffViewer
        oldValue={leftSnippet.code}
        newValue={rightSnippet.code}
        splitView={true}
        useDarkTheme={true}
        styles={{
          variables: {
            dark: {
              diffViewerBackground: "transparent",
              gutterBackground: "transparent",
              addedBackground: "transparent",
              removedBackground: "transparent",
              emptyLineBackground: "transparent",
              wordAddedBackground: "rgba(100, 200, 100, 0.2)",
              wordRemovedBackground: "rgba(255, 100, 100, 0.2)",
            },
          },
          diffContainer: {
            fontSize: "0.95rem",
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
            padding: "0",
          },
        }}
        hideLineNumbers={false}
      />
    </div>
  );
}
