"use client";

import ReactDiffViewer from "react-diff-viewer-continued";
import { type RouterOutputs } from "@/trpc/react";
import { CODE_DISPLAY_CONSTANTS } from "./code-display.constants";
import { CodeDisplayContainer } from "./code-display-container";

type Snippet = NonNullable<RouterOutputs["concept"]["getBySlug"]>["snippets"][number];

interface DiffViewProps {
  leftSnippet: Snippet;
  rightSnippet: Snippet;
}

export function DiffView({ leftSnippet, rightSnippet }: DiffViewProps) {
  return (
    <div className="p-2">
      <CodeDisplayContainer>
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
                gutterColor: CODE_DISPLAY_CONSTANTS.lineNumberColor,
                addedGutterColor: CODE_DISPLAY_CONSTANTS.lineNumberColor,
                removedGutterColor: CODE_DISPLAY_CONSTANTS.lineNumberColor,
                codeFoldGutterBackground: "transparent",
                codeFoldBackground: "transparent",
                wordAddedBackground: CODE_DISPLAY_CONSTANTS.diffAddedBackground,
                wordRemovedBackground: CODE_DISPLAY_CONSTANTS.diffRemovedBackground,
              },
            },
            diffContainer: {
              fontSize: CODE_DISPLAY_CONSTANTS.fontSize,
              lineHeight: CODE_DISPLAY_CONSTANTS.lineHeight,
              fontFamily: CODE_DISPLAY_CONSTANTS.fontFamily,
              fontWeight: CODE_DISPLAY_CONSTANTS.fontWeight,
              borderSpacing: "0",
              tableLayout: "fixed",
              width: "100%",
              pre: {
                lineHeight: CODE_DISPLAY_CONSTANTS.lineHeight,
                margin: 0,
                padding: 0,
                whiteSpace: "pre",
              },
            },
            tableCell: {
              padding: "0",
              verticalAlign: "top",
              lineHeight: CODE_DISPLAY_CONSTANTS.lineHeight,
            },
            line: {
              padding: "0",
              fontWeight: CODE_DISPLAY_CONSTANTS.fontWeight,
              lineHeight: CODE_DISPLAY_CONSTANTS.lineHeight,
            },
            gutter: {
              padding: `0 ${CODE_DISPLAY_CONSTANTS.lineNumberPaddingRight} 0 0`,
              minWidth: CODE_DISPLAY_CONSTANTS.lineNumberMinWidth,
              width: CODE_DISPLAY_CONSTANTS.lineNumberMinWidth,
              maxWidth: CODE_DISPLAY_CONSTANTS.lineNumberMinWidth,
              fontWeight: CODE_DISPLAY_CONSTANTS.fontWeight,
              textAlign: "right",
              userSelect: "none",
            },
            marker: {
              padding: "0",
              display: "none",
            },
            wordDiff: {
              padding: "0",
              margin: "0",
              fontWeight: CODE_DISPLAY_CONSTANTS.fontWeight,
              display: "inline",
              verticalAlign: "baseline",
            },
            contentText: {
              padding: "0",
              fontWeight: CODE_DISPLAY_CONSTANTS.fontWeight,
              lineHeight: CODE_DISPLAY_CONSTANTS.lineHeight,
              whiteSpace: "pre",
            },
          }}
          hideLineNumbers={false}
        />
      </CodeDisplayContainer>
    </div>
  );
}
