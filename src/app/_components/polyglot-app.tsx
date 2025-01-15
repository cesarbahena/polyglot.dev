"use client";

import { useState } from "react";
import { ConceptList } from "./concept-list";
import { ConceptViewer } from "./concept-viewer";
import { CompareView } from "./compare-view";

interface Concept {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface PolyglotAppProps {
  initialConcepts: Concept[];
}

export function PolyglotApp({ initialConcepts }: PolyglotAppProps) {
  const [selectedConceptId, setSelectedConceptId] = useState<number | null>(
    initialConcepts[0]?.id ?? null,
  );
  const [compareState, setCompareState] = useState<{
    conceptId: number;
    languageId: number;
  } | null>(null);

  const handleCompare = (languageId: number) => {
    if (selectedConceptId) {
      setCompareState({
        conceptId: selectedConceptId,
        languageId,
      });
    }
  };

  const handleCloseCompare = () => {
    setCompareState(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ConceptList
        concepts={initialConcepts}
        onSelectConcept={setSelectedConceptId}
        selectedConceptId={selectedConceptId}
      />

      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Polyglot.dev</h1>
          <p className="text-gray-600">
            Learn programming concepts across languages
          </p>
        </header>

        {selectedConceptId ? (
          <ConceptViewer
            conceptId={selectedConceptId}
            onCompare={handleCompare}
          />
        ) : (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <p>Select a concept from the sidebar to get started.</p>
          </div>
        )}
      </main>

      <aside className="w-96 bg-gray-50 shadow-lg">
        {compareState ? (
          <CompareView
            conceptId={compareState.conceptId}
            currentLanguageId={compareState.languageId}
            onClose={handleCloseCompare}
          />
        ) : (
          <div className="p-6">
            <h2 className="mb-4 text-2xl font-bold">Compare</h2>
            <p className="text-sm text-gray-600">
              Click "Compare" on a code snippet to see differences between
              languages
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
