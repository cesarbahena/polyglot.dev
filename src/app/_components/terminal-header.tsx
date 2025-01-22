"use client";

import { PanelLeft } from "lucide-react";

interface TerminalHeaderProps {
  onToggleSidebar: () => void;
}

export function TerminalHeader({ onToggleSidebar }: TerminalHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="rounded p-2 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="text-2xl font-bold text-primary">▹</div>
          <h1 className="text-xl sm:text-2xl font-bold">POLYGLOT.DEV</h1>
        </div>
      </div>
    </header>
  );
}
