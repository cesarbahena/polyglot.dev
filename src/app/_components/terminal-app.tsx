"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { TerminalHeader } from "./terminal-header";
import { FileTreeSidebar } from "./file-tree-sidebar";
import { Breadcrumb } from "./breadcrumb";
import { LanguageTabs } from "./language-tabs";
import { CodeView } from "./code-view";
import { DiffView } from "./diff-view";
import { cn } from "@/lib/utils";

export function TerminalApp() {
  const [selectedConceptSlug, setSelectedConceptSlug] = useState<string | null>(null);
  const [leftLangSlug, setLeftLangSlug] = useState<string | null>(null);
  const [rightLangSlug, setRightLangSlug] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Keyboard shortcut: Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background font-mono text-foreground">
      <TerminalHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Explorer Sidebar */}
        <aside
          className={cn(
            "z-50 flex-shrink-0 transition-all duration-300 ease-in-out",
            // Mobile: overlay from left
            "fixed left-0 top-14 bottom-0 w-[80vw] max-w-[320px] md:static md:top-0",
            // Desktop: side-by-side, responsive width
            "md:w-64 lg:w-72 xl:w-80",
            // Collapsed state
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0"
          )}
        >
          <div className={cn(
            "h-full overflow-hidden",
            !isSidebarOpen && "md:w-0"
          )}>
            <FileTreeSidebar
              concepts={concepts ?? []}
              selectedConceptSlug={selectedConceptSlug}
              onConceptSelect={handleConceptChange}
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex flex-1 flex-col overflow-hidden min-w-0">
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
        </main>
      </div>
    </div>
  );
}
