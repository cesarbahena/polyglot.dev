"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { RouterOutputs } from "@/trpc/query-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Snippet = RouterOutputs["concept"]["getBySlug"]["snippets"][number];
type Language = RouterOutputs["concept"]["getAllLanguages"][number];

interface CodeViewProps {
  snippet: Snippet;
  availableLanguages: Language[];
  onLanguageChange: (slug: string) => void;
  onCompareLanguageChange: (slug: string | null) => void;
}

const languageMap: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  go: "go",
  rust: "rust",
};

export function CodeView({ snippet, availableLanguages, onLanguageChange, onCompareLanguageChange }: CodeViewProps) {
  const compareLanguages = availableLanguages.filter(
    (lang) => lang.slug !== snippet.language.slug
  );

  return (
    <div className="w-full max-w-5xl animate-in fade-in duration-300">
      <div className="overflow-hidden rounded-lg border border-primary/20 bg-card shadow-lg shadow-primary/5">
        <div className="flex items-center justify-between border-b border-primary/20 bg-background/50 px-6 py-3">
          {/* Language Dropdown */}
          <Select value={snippet.language.slug} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-auto border-0 bg-transparent p-0 text-base font-bold text-primary">
              <div className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: snippet.language.color }}
                />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="font-mono">
              {availableLanguages.map((lang) => (
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

          {/* Compare Dropdown */}
          <Select value="none" onValueChange={(value) => onCompareLanguageChange(value === "none" ? null : value)}>
            <SelectTrigger className="w-auto border-0 bg-transparent p-0 text-sm text-muted-foreground">
              <SelectValue placeholder="Compare..." />
            </SelectTrigger>
            <SelectContent className="font-mono">
              <SelectItem value="none">None</SelectItem>
              {compareLanguages.map((lang) => (
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
