"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import ReactDiffViewer from "react-diff-viewer-continued";

interface CompareViewProps {
  conceptId: number;
  currentLanguageId: number;
  onClose: () => void;
}

export function CompareView({
  conceptId,
  currentLanguageId,
  onClose,
}: CompareViewProps) {
  const { data: concept } = api.concept.getById.useQuery({ id: conceptId });
  const { data: languages } = api.concept.getAllLanguages.useQuery();

  const [compareLanguageId, setCompareLanguageId] = useState<number | null>(
    null,
  );

  if (!concept || !languages) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  const currentSnippet = concept.snippets.find(
    (s) => s.languageId === currentLanguageId,
  );

  const compareSnippet = compareLanguageId
    ? concept.snippets.find((s) => s.languageId === compareLanguageId)
    : null;

  const availableLanguages = languages.filter(
    (lang) =>
      lang.id !== currentLanguageId &&
      concept.snippets.some((s) => s.languageId === lang.id),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-300 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Compare Implementations</h2>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Comparing: <span className="font-semibold">{currentSnippet?.language.name}</span>
          </p>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Compare with:
            </label>
            <select
              value={compareLanguageId ?? ""}
              onChange={(e) =>
                setCompareLanguageId(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select a language...</option>
              {availableLanguages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-gray-50">
        {compareSnippet && currentSnippet ? (
          <div className="h-full">
            <ReactDiffViewer
              oldValue={currentSnippet.code}
              newValue={compareSnippet.code}
              splitView={true}
              leftTitle={currentSnippet.language.name}
              rightTitle={compareSnippet.language.name}
              styles={{
                diffContainer: {
                  fontSize: "14px",
                },
              }}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">
              Select a language to see the comparison
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
