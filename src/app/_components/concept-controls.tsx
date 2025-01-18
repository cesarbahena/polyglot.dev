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
      {/* Concept Title as Dropdown with Category and Difficulty */}
      <div className="text-center">
        <Select
          value={selectedConceptSlug ?? ""}
          onValueChange={onConceptChange}
        >
          <SelectTrigger className="mx-auto w-auto min-w-[400px] border-primary/30 bg-transparent text-4xl font-bold text-primary">
            {selectedConcept ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  [{selectedConcept.category}]
                </span>
                <SelectValue />
                <span className="text-xs text-muted-foreground">
                  [{selectedConcept.difficulty}]
                </span>
              </div>
            ) : (
              <SelectValue placeholder="Select concept..." />
            )}
          </SelectTrigger>
          <SelectContent className="font-mono">
            {concepts.map((concept) => (
              <SelectItem key={concept.id} value={concept.slug}>
                {concept.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags Only - Centered */}
      {selectedConcept && selectedConcept.tags && selectedConcept.tags.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          {selectedConcept.tags.map((tag) => (
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
  );
}
