"use client";

import { X, Columns2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type RouterOutputs } from "@/trpc/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Language = RouterOutputs["concept"]["getAllLanguages"][number];

interface LanguageTabsSingleProps {
  mode: "single";
  languages: Language[];
  activeLanguage: string;
  onLanguageChange: (slug: string) => void;
  onSplitView?: (slug: string) => void;
}

interface LanguageTabsComparisonProps {
  mode: "comparison";
  languages: Language[];
  leftLanguage: string;
  rightLanguage: string;
  onLeftLanguageChange: (slug: string) => void;
  onRightLanguageChange: (slug: string) => void;
  onClose: () => void;
}

type LanguageTabsProps = LanguageTabsSingleProps | LanguageTabsComparisonProps;

export function LanguageTabs(props: LanguageTabsProps) {
  if (props.mode === "single") {
    const compareLanguages = props.languages.filter(
      (lang) => lang.slug !== props.activeLanguage
    );

    return (
      <div className="flex items-center border-b border-border bg-background/50">
        <div className="flex flex-1 items-center gap-1 overflow-x-auto px-4">
          {props.languages.map((lang) => (
            <button
              key={lang.slug}
              onClick={() => props.onLanguageChange(lang.slug)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2.5 transition-all",
                "hover:text-foreground",
                props.activeLanguage === lang.slug
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground"
              )}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </div>

        {props.onSplitView && compareLanguages.length > 0 && (
          <div className="border-l border-border px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Columns2 className="h-4 w-4" />
                  <span className="text-xs">Split</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="font-mono">
                {compareLanguages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.slug}
                    onClick={() => props.onSplitView?.(lang.slug)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      {lang.name}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    );
  }

  // Comparison mode
  const leftLanguages = props.languages;
  const rightLanguages = props.languages.filter(
    (lang) => lang.slug !== props.leftLanguage
  );

  return (
    <div className="flex items-center border-b border-border bg-background/50">
      {/* Left tab group */}
      <div className="flex flex-1 items-center gap-1 overflow-x-auto px-4">
        {leftLanguages.map((lang) => (
          <button
            key={lang.slug}
            onClick={() => props.onLeftLanguageChange(lang.slug)}
            className={cn(
              "flex items-center gap-2 border-b-2 px-4 py-2.5 transition-all",
              "hover:text-foreground",
              props.leftLanguage === lang.slug
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground"
            )}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* VS separator */}
      <div className="px-3 text-xs text-muted-foreground">VS</div>

      {/* Right tab group */}
      <div className="flex flex-1 items-center gap-1 overflow-x-auto px-4">
        {rightLanguages.map((lang) => (
          <button
            key={lang.slug}
            onClick={() => props.onRightLanguageChange(lang.slug)}
            className={cn(
              "flex items-center gap-2 border-b-2 px-4 py-2.5 transition-all",
              "hover:text-foreground",
              props.rightLanguage === lang.slug
                ? "border-accent text-accent font-medium"
                : "border-transparent text-muted-foreground"
            )}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm">{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Close button */}
      <div className="border-l border-border px-2">
        <button
          onClick={props.onClose}
          className="rounded p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close comparison"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
