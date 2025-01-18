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

interface ConceptControlsProps {
  concepts: Concept[];
  selectedConcept: Concept | undefined;
  selectedConceptSlug: string | null;
  onConceptChange: (slug: string) => void;
}

export function ConceptControls({
  concepts,
  selectedConcept,
  selectedConceptSlug,
  onConceptChange,
}: ConceptControlsProps) {
  return (
    <div className="mb-8 space-y-6">
      {/* Concept Title as Dropdown */}
      <div className="text-center">
        <Select
          value={selectedConceptSlug ?? ""}
          onValueChange={onConceptChange}
        >
          <SelectTrigger className="mx-auto w-auto min-w-[400px] border-primary/30 bg-transparent text-4xl font-bold text-primary">
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

      {/* Metadata Row: Category, Tags, Difficulty */}
      {selectedConcept && (
        <div className="flex items-center justify-between gap-4">
          {/* Left: Category */}
          <span className="rounded bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
            {selectedConcept.category}
          </span>

          {/* Center: Tags */}
          <div className="flex flex-1 items-center justify-center gap-2">
            {selectedConcept.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Right: Difficulty */}
          <span className="rounded bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            {selectedConcept.difficulty}
          </span>
        </div>
      )}
    </div>
  );
}
