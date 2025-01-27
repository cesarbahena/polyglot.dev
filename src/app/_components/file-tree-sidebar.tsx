"use client";

import { Folder, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type RouterOutputs } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Concept = RouterOutputs["concept"]["getAll"][number];

interface FileTreeSidebarProps {
  concepts: Concept[];
  selectedConceptSlug: string | null;
  onConceptSelect: (slug: string) => void;
}

const categoryDisplayNames: Record<string, string> = {
  "imperative": "Imperative",
  "functional": "Functional",
  "oop": "Object-Oriented",
  "concurrent": "Concurrent",
  "error-handling": "Error Handling",
};

export function FileTreeSidebar({
  concepts,
  selectedConceptSlug,
  onConceptSelect,
}: FileTreeSidebarProps) {
  const conceptsByCategory = useMemo(() => {
    return concepts.reduce((acc, concept) => {
      if (!acc[concept.category]) {
        acc[concept.category] = [];
      }
      acc[concept.category]!.push(concept);
      return acc;
    }, {} as Record<string, Concept[]>);
  }, [concepts]);

  const categories = useMemo(() => {
    return Object.keys(conceptsByCategory).sort();
  }, [conceptsByCategory]);

  return (
    <div className="flex h-full w-full flex-col border-r border-border bg-card">
      <div className="border-b border-border px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Explorer
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Accordion type="multiple" defaultValue={categories} className="px-2 py-2">
          {categories.map((category) => (
            <AccordionItem key={category} value={category} className="border-none">
              <AccordionTrigger className="rounded py-2 hover:bg-muted hover:no-underline">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm font-medium">
                    {categoryDisplayNames[category] ?? category}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    ({conceptsByCategory[category]?.length ?? 0})
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <div className="ml-4 space-y-0.5">
                  {conceptsByCategory[category]?.map((concept: Concept) => (
                    <button
                      key={concept.slug}
                      onClick={() => onConceptSelect(concept.slug)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded py-1.5 pl-2 pr-2 text-left transition-colors",
                        "hover:bg-muted",
                        selectedConceptSlug === concept.slug &&
                          "border-l-2 border-primary bg-primary/10 text-primary"
                      )}
                    >
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{concept.title}</span>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
