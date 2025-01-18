"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { TerminalHeader } from "./terminal-header";
import { ConceptControls } from "./concept-controls";
import { CodeView } from "./code-view";
import { DiffView } from "./diff-view";

export function TerminalApp() {
  const [selectedConceptSlug, setSelectedConceptSlug] = useState<string | null>(null);
  const [leftLangSlug, setLeftLangSlug] = useState<string | null>(null);
  const [rightLangSlug, setRightLangSlug] = useState<string | null>(null);

  const { data: concepts } = api.concept.getAll.useQuery();
  const { data: languages } = api.concept.getAllLanguages.useQuery();
  const { data: concept } = api.concept.getBySlug.useQuery(
    { slug: selectedConceptSlug! },
    { enabled: !!selectedConceptSlug }
  );

  const availableLanguages = concept
    ? languages?.filter((lang) =>
        concept.snippets.some((s) => s.languageId === lang.id)
      ) ?? []
    : [];

  const leftSnippet = concept?.snippets.find(
    (s) => s.language.slug === leftLangSlug
  );
  const rightSnippet = concept?.snippets.find(
    (s) => s.language.slug === rightLangSlug
  );

  const showDiff = leftSnippet && rightSnippet;

  // When concept changes, auto-select first language
  const handleConceptChange = (slug: string) => {
    setSelectedConceptSlug(slug);
    setLeftLangSlug(null);
    setRightLangSlug(null);
  };

  // Auto-select first language when concept loads
  if (concept && !leftLangSlug && availableLanguages.length > 0) {
    setLeftLangSlug(availableLanguages[0]!.slug);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-mono text-foreground">
      <TerminalHeader />

      <main className="flex flex-1 flex-col items-center p-8">
        {/* Concept Controls */}
        <div className="w-full max-w-7xl">
          <ConceptControls
            concepts={concepts ?? []}
            selectedConcept={concepts?.find((c) => c.slug === selectedConceptSlug)}
            selectedConceptSlug={selectedConceptSlug}
            onConceptChange={handleConceptChange}
          />
        </div>

        {/* Code Display */}
        {!selectedConceptSlug && (
          <div className="text-center text-muted-foreground">
            <div className="mb-4 text-6xl">▹</div>
            <p>Select a concept to begin</p>
          </div>
        )}

        {leftSnippet && !rightSnippet && (
          <CodeView
            snippet={leftSnippet}
            availableLanguages={availableLanguages}
            onLanguageChange={setLeftLangSlug}
            onCompareLanguageChange={setRightLangSlug}
          />
        )}

        {showDiff && (
          <DiffView
            leftSnippet={leftSnippet}
            rightSnippet={rightSnippet}
            availableLanguages={availableLanguages}
            onLeftLanguageChange={setLeftLangSlug}
            onRightLanguageChange={setRightLangSlug}
          />
        )}
      </main>
    </div>
  );
}
