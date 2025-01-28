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
    <div className="p-2">
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
              addedGutterBackground: "transparent",
              removedGutterBackground: "transparent",
              gutterColor: "#858585",
              addedGutterColor: "#858585",
              removedGutterColor: "#858585",
              codeFoldGutterBackground: "transparent",
              codeFoldBackground: "transparent",
              wordAddedBackground: "rgba(100, 200, 100, 0.2)",
              wordRemovedBackground: "rgba(255, 100, 100, 0.2)",
            },
          },
          diffContainer: {
            fontSize: "0.95rem",
            lineHeight: "1.6",
            fontFamily: "JetBrains Mono, Fira Code, Consolas, monospace",
            fontWeight: "normal",
            borderSpacing: "0",
            pre: {
              lineHeight: "1.6",
            },
          },
          tableCell: {
            padding: "0",
            verticalAlign: "top",
            lineHeight: "1.6",
          },
          line: {
            padding: "0",
            fontWeight: "normal",
            lineHeight: "1.6",
          },
          gutter: {
            padding: "0 10px 0 0",
            minWidth: "50px",
            fontWeight: "normal",
          },
          marker: {
            padding: "0",
            display: "none",
          },
          wordDiff: {
            padding: "0",
            margin: "0",
            fontWeight: "normal",
            display: "inline",
            verticalAlign: "baseline",
          },
          contentText: {
            padding: "0",
            fontWeight: "normal",
            lineHeight: "1.6",
          },
        }}
        hideLineNumbers={false}
      />
    </div>
  );
}
