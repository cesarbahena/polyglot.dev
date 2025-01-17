"use client";

import ReactDiffViewer from "react-diff-viewer-continued";
import { RouterOutputs } from "@/trpc/query-client";

type Snippet = RouterOutputs["concept"]["getBySlug"]["snippets"][number];
type Concept = RouterOutputs["concept"]["getBySlug"];

interface DiffViewProps {
  leftSnippet: Snippet;
  rightSnippet: Snippet;
  concept: Concept;
}

export function DiffView({ leftSnippet, rightSnippet, concept }: DiffViewProps) {
  return (
    <div className="w-full max-w-7xl animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-4xl font-bold text-primary">{concept.title}</h2>
        <p className="text-muted-foreground">{concept.category}</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-primary/20 bg-card shadow-2xl shadow-primary/10">
        <div className="flex items-center justify-between border-b border-primary/20 bg-background/50 px-6 py-3">
          <div className="flex items-center gap-3">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: leftSnippet.language.color }}
            />
            <span className="font-bold text-primary">{leftSnippet.language.name}</span>
          </div>

          <div className="text-xs text-muted-foreground">VS</div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-accent">{rightSnippet.language.name}</span>
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: rightSnippet.language.color }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
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
      </div>
    </div>
  );
}
