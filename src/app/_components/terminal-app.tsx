"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { TerminalHeader } from "./terminal-header";
import { ActivityBar } from "./activity-bar";
import { FileTreeSidebar } from "./file-tree-sidebar";
import { LanguageTabs } from "./language-tabs";
import { CodeView } from "./code-view";
import { DiffView } from "./diff-view";
import { CommandPalette } from "./command-palette";
import { cn } from "@/lib/utils";

export function TerminalApp() {
  const [selectedConceptSlug, setSelectedConceptSlug] = useState<string | null>(null);
  const [leftLangSlug, setLeftLangSlug] = useState<string | null>(null);
  const [rightLangSlug, setRightLangSlug] = useState<string | null>(null);
  const [activityBarView, setActivityBarView] = useState<'explorer' | null>('explorer');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette: Ctrl+Shift+P / Cmd+Shift+P
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }

      // Toggle Explorer: Ctrl+B / Cmd+B
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setActivityBarView(prev => prev === 'explorer' ? null : 'explorer');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isExplorerOpen = activityBarView === 'explorer';

  return (
    <div className="flex h-screen flex-col bg-background font-mono text-foreground">
      <TerminalHeader onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar
          activeView={activityBarView}
          onViewChange={setActivityBarView}
        />

        {/* Mobile Backdrop */}
        {isExplorerOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setActivityBarView(null)}
          />
        )}

        {/* Explorer Sidebar */}
        <aside
          className={cn(
            "z-50 flex-shrink-0 transition-all duration-300 ease-in-out",
            // Mobile: overlay from left
            "fixed left-12 top-14 bottom-0 w-[80vw] max-w-[320px] md:static md:left-0 md:top-0",
            // Desktop: side-by-side, responsive width
            "md:w-64 lg:w-72 xl:w-80",
            // Collapsed state
            isExplorerOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0"
          )}
        >
          <div className={cn(
            "h-full overflow-hidden",
            !isExplorerOpen && "md:w-0"
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
              {leftSnippet && !rightSnippet && (
                <>
                  <LanguageTabs
                    mode="single"
                    languages={availableLanguages}
                    activeLanguage={leftLangSlug!}
                    onLanguageChange={setLeftLangSlug}
                    onSplitView={setRightLangSlug}
                    concept={concept}
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
                    concept={concept}
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

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </div>
  );
}
