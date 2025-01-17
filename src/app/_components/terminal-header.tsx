"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RouterOutputs } from "@/trpc/query-client";

type Concept = RouterOutputs["concept"]["getAll"][number];
type Language = RouterOutputs["concept"]["getAllLanguages"][number];

interface TerminalHeaderProps {
  concepts: Concept[];
  languages: Language[];
  selectedConceptSlug: string | null;
  leftLangSlug: string | null;
  rightLangSlug: string | null;
  onConceptChange: (slug: string) => void;
  onLeftLangChange: (slug: string) => void;
  onRightLangChange: (slug: string | null) => void;
}

export function TerminalHeader({
  concepts,
  languages,
  selectedConceptSlug,
  leftLangSlug,
  rightLangSlug,
  onConceptChange,
  onLeftLangChange,
  onRightLangChange,
}: TerminalHeaderProps) {
  const selectedConcept = concepts.find((c) => c.slug === selectedConceptSlug);
  const availableLanguages = selectedConcept
    ? languages.filter((lang) =>
        selectedConcept.snippets.some((s) => s.languageId === lang.id)
      )
    : [];

  const compareLanguages = availableLanguages.filter(
    (lang) => lang.slug !== leftLangSlug
  );

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-8 py-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="text-2xl font-bold text-primary">▹</div>
          <h1 className="text-2xl font-bold">POLYGLOT.DEV</h1>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          {/* Concept Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">Concept:</label>
            <Select
              value={selectedConceptSlug ?? ""}
              onValueChange={onConceptChange}
            >
              <SelectTrigger className="w-[280px] border-primary/30 bg-background font-mono">
                <SelectValue placeholder="Select concept..." />
              </SelectTrigger>
              <SelectContent className="font-mono">
                {concepts.map((concept) => (
                  <SelectItem key={concept.id} value={concept.slug}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        [{concept.category}]
                      </span>
                      <span>{concept.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Left Language Selector */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">Language:</label>
            <Select
              value={leftLangSlug ?? ""}
              onValueChange={onLeftLangChange}
              disabled={!selectedConceptSlug}
            >
              <SelectTrigger className="w-[200px] border-primary/30 bg-background font-mono">
                <SelectValue placeholder="Select language..." />
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
          </div>

          {/* Right Language Selector (Compare) */}
          <div className="flex items-center gap-3">
            <label className="text-sm text-muted-foreground">Compare:</label>
            <Select
              value={rightLangSlug ?? "none"}
              onValueChange={(value) =>
                onRightLangChange(value === "none" ? null : value)
              }
              disabled={!leftLangSlug}
            >
              <SelectTrigger className="w-[200px] border-accent/30 bg-background font-mono">
                <SelectValue placeholder="None" />
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
        </div>

        {selectedConcept && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="rounded bg-accent/20 px-2 py-1 text-xs text-accent-foreground">
              {selectedConcept.difficulty}
            </span>
            {selectedConcept.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
