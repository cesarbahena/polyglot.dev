"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { TerminalHeader } from "./terminal-header";
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

  const leftSnippet = concept?.snippets.find(
    (s) => s.language.slug === leftLangSlug
  );
  const rightSnippet = concept?.snippets.find(
    (s) => s.language.slug === rightLangSlug
  );

  const showDiff = leftSnippet && rightSnippet;

  return (
    <div className="flex min-h-screen flex-col bg-background font-mono text-foreground">
      <TerminalHeader
        concepts={concepts ?? []}
        languages={languages ?? []}
        selectedConceptSlug={selectedConceptSlug}
        leftLangSlug={leftLangSlug}
        rightLangSlug={rightLangSlug}
        onConceptChange={setSelectedConceptSlug}
        onLeftLangChange={setLeftLangSlug}
        onRightLangChange={setRightLangSlug}
      />

      <main className="flex flex-1 items-center justify-center p-8">
        {!selectedConceptSlug && (
          <div className="text-center text-muted-foreground">
            <div className="mb-4 text-6xl">▹</div>
            <p>Select a concept to begin</p>
          </div>
        )}

        {selectedConceptSlug && !leftLangSlug && (
          <div className="text-center text-muted-foreground">
            <div className="mb-4 text-6xl">▹</div>
            <p>Select a language</p>
          </div>
        )}

        {leftSnippet && !rightSnippet && (
          <CodeView
            snippet={leftSnippet}
            concept={concept!}
          />
        )}

        {showDiff && (
          <DiffView
            leftSnippet={leftSnippet}
            rightSnippet={rightSnippet}
            concept={concept!}
          />
        )}
      </main>
    </div>
  );
}
