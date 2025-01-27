"use client";

import { ChevronRight } from "lucide-react";
import { type RouterOutputs } from "@/trpc/react";

type Concept = RouterOutputs["concept"]["getBySlug"];

interface BreadcrumbProps {
  concept: Concept;
}

const categoryDisplayNames: Record<string, string> = {
  "imperative": "Imperative",
  "functional": "Functional",
  "oop": "Object-Oriented",
  "concurrent": "Concurrent",
  "error-handling": "Error Handling",
};

export function Breadcrumb({ concept }: BreadcrumbProps) {
  if (!concept) return null;

  return (
    <div className="border-b border-border bg-background/30 px-4 py-2">
      <div className="flex items-center gap-2">
        {/* Category > Concept */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            {categoryDisplayNames[concept.category] ?? concept.category}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{concept.title}</span>
        </div>

        {/* Tags */}
        {concept.tags && concept.tags.length > 0 && (
          <div className="ml-4 flex items-center gap-2">
            {concept.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
