"use client";

import { useState } from "react";

interface Concept {
  id: number;
  name: string;
}

interface ConceptListProps {
  concepts: Concept[];
  onSelectConcept: (id: number) => void;
  selectedConceptId: number | null;
}

export function ConceptList({
  concepts,
  onSelectConcept,
  selectedConceptId,
}: ConceptListProps) {
  return (
    <aside className="w-64 bg-gray-800 p-6 text-white">
      <h2 className="mb-4 text-2xl font-bold">Concepts</h2>
      <nav>
        <ul>
          {concepts.map((concept) => (
            <li key={concept.id} className="mb-2">
              <button
                onClick={() => onSelectConcept(concept.id)}
                className={`w-full text-left transition-colors ${
                  selectedConceptId === concept.id
                    ? "text-blue-400 font-semibold"
                    : "text-white hover:text-gray-300"
                }`}
              >
                {concept.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
