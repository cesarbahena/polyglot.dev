"use client";

import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="top-[20%] max-w-2xl translate-y-0 p-0">
        <DialogHeader className="sr-only">
          <span>Command Palette</span>
        </DialogHeader>

        {/* Search Input */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="mr-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="search"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoFocus
          />
        </div>

        {/* Results (empty for now) */}
        <div className="p-4 text-sm text-muted-foreground">
          {/* Future: Command results will appear here */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
