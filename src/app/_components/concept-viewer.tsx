"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ConceptViewerProps {
  conceptId: number;
  onCompare?: (languageId: number) => void;
}

const languageMap: Record<string, string> = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Go: "go",
  Rust: "rust",
  Java: "java",
  Ruby: "ruby",
  PHP: "php",
  "C++": "cpp",
  "C#": "csharp",
};

export function ConceptViewer({ conceptId, onCompare }: ConceptViewerProps) {
  const { data: concept, isLoading } = api.concept.getById.useQuery({
    id: conceptId,
  });

  const [selectedLanguageId, setSelectedLanguageId] = useState<number | null>(
    null,
  );

  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <p>Loading...</p>
      </div>
    );
  }

  if (!concept) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-md">
        <p>Concept not found</p>
      </div>
    );
  }

  const currentSnippet =
    selectedLanguageId !== null
      ? concept.snippets.find((s) => s.languageId === selectedLanguageId)
      : concept.snippets[0];

  const languages = Array.from(
    new Set(concept.snippets.map((s) => s.language)),
  );

  return (
    <div className="rounded-lg bg-white shadow-md">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-4xl font-bold">{concept.name}</h1>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex gap-2 p-4">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelectedLanguageId(lang.id)}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                (selectedLanguageId ?? concept.snippets[0]?.languageId) ===
                lang.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {currentSnippet ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {currentSnippet.language.name}
              </h3>
              {onCompare && (
                <button
                  onClick={() => onCompare(currentSnippet.languageId)}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
                >
                  Compare
                </button>
              )}
            </div>
            <div className="overflow-hidden rounded-lg">
              <SyntaxHighlighter
                language={
                  languageMap[currentSnippet.language.name] ?? "javascript"
                }
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  borderRadius: "0.5rem",
                }}
              >
                {currentSnippet.code}
              </SyntaxHighlighter>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No code snippet available</p>
        )}
      </div>
    </div>
  );
}
