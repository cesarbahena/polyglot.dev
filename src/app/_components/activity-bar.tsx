"use client";

import { Files } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityBarProps {
  activeView: 'explorer' | null;
  onViewChange: (view: 'explorer' | null) => void;
}

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  const handleExplorerClick = () => {
    // Toggle: if already active, close it; otherwise, open it
    onViewChange(activeView === 'explorer' ? null : 'explorer');
  };

  return (
    <div className="flex w-12 flex-col items-center border-r border-border bg-card py-2">
      {/* Explorer Button */}
      <button
        onClick={handleExplorerClick}
        className={cn(
          "relative flex h-12 w-12 items-center justify-center transition-colors",
          "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary",
          activeView === 'explorer' && "text-primary"
        )}
        aria-label="Toggle Explorer"
        title="Explorer"
      >
        {/* Active indicator - left border */}
        {activeView === 'explorer' && (
          <div className="absolute left-0 h-full w-0.5 bg-primary" />
        )}
        <Files className="h-5 w-5" />
      </button>

      {/* Future: More activity bar buttons can be added here */}
    </div>
  );
}
