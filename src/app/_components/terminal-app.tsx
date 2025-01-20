"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { TerminalHeader } from "./terminal-header";
import { FileTreeSidebar } from "./file-tree-sidebar";
import { Breadcrumb } from "./breadcrumb";
import { LanguageTabs } from "./language-tabs";
import { CodeView } from "./code-view";
import { DiffView } from "./diff-view";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

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
    <div className="flex h-screen flex-col bg-background font-mono text-foreground">
      <TerminalHeader />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Sidebar Panel */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
          <FileTreeSidebar
            concepts={concepts ?? []}
            selectedConceptSlug={selectedConceptSlug}
            onConceptSelect={handleConceptChange}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Content Panel */}
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full flex-col">
            {!selectedConceptSlug && (
              <div className="flex flex-1 items-center justify-center text-center text-muted-foreground">
                <div>
                  <div className="mb-4 text-6xl">▹</div>
                  <p>Select a concept to begin</p>
                </div>
              </div>
            )}

            {concept && (
              <>
                <Breadcrumb concept={concept} />

                {leftSnippet && !rightSnippet && (
                  <>
                    <LanguageTabs
                      mode="single"
                      languages={availableLanguages}
                      activeLanguage={leftLangSlug!}
                      onLanguageChange={setLeftLangSlug}
                      onSplitView={setRightLangSlug}
                    />
                    <div className="flex-1 overflow-auto">
                      <CodeView snippet={leftSnippet} />
                    </div>
                  </>
                )}

                {showDiff && (
                  <>
                    <LanguageTabs
                      mode="comparison"
                      languages={availableLanguages}
                      leftLanguage={leftLangSlug!}
                      rightLanguage={rightLangSlug!}
                      onLeftLanguageChange={setLeftLangSlug}
                      onRightLanguageChange={setRightLangSlug}
                      onClose={() => setRightLangSlug(null)}
                    />
                    <div className="flex-1 overflow-auto">
                      <DiffView
                        leftSnippet={leftSnippet}
                        rightSnippet={rightSnippet}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
