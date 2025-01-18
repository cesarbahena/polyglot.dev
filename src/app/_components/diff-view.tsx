"use client";

import ReactDiffViewer from "react-diff-viewer-continued";
import { RouterOutputs } from "@/trpc/query-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

type Snippet = RouterOutputs["concept"]["getBySlug"]["snippets"][number];
type Language = RouterOutputs["concept"]["getAllLanguages"][number];

interface DiffViewProps {
  leftSnippet: Snippet;
  rightSnippet: Snippet;
  availableLanguages: Language[];
  onLeftLanguageChange: (slug: string) => void;
  onRightLanguageChange: (slug: string | null) => void;
}

export function DiffView({
  leftSnippet,
  rightSnippet,
  availableLanguages,
  onLeftLanguageChange,
  onRightLanguageChange
}: DiffViewProps) {
  const leftLanguages = availableLanguages;
  const rightLanguages = availableLanguages.filter(
    (lang) => lang.slug !== leftSnippet.language.slug
  );

  return (
    <div className="w-full max-w-7xl animate-in fade-in zoom-in-95 duration-500">
      <div className="overflow-hidden rounded-lg border border-primary/20 bg-card shadow-2xl shadow-primary/10">
        <div className="flex items-center justify-between border-b border-primary/20 bg-background/50 px-6 py-3">
          {/* Left Language Dropdown */}
          <Select value={leftSnippet.language.slug} onValueChange={onLeftLanguageChange}>
            <SelectTrigger className="w-auto border-0 bg-transparent p-0 text-base font-bold text-primary">
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: leftSnippet.language.color }}
                />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="font-mono">
              {leftLanguages.map((lang) => (
                <SelectItem key={lang.id} value={lang.slug}>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    {lang.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="text-xs text-muted-foreground">VS</div>

          {/* Right Language Dropdown with Close Button */}
          <div className="relative flex items-center gap-2">
            <Select
              value={rightSnippet.language.slug}
              onValueChange={onRightLanguageChange}
            >
              <SelectTrigger className="w-auto border-0 bg-transparent p-0 pr-6 text-base font-bold text-accent">
                <div className="flex items-center gap-3">
                  <SelectValue />
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: rightSnippet.language.color }}
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="font-mono">
                {rightLanguages.map((lang) => (
                  <SelectItem key={lang.id} value={lang.slug}>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      {lang.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={() => onRightLanguageChange(null)}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close comparison"
            >
              <X className="h-4 w-4" />
            </button>
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
