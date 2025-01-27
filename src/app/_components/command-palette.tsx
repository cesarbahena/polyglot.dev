"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export function CommandPalette() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-80 rounded border border-border bg-background px-4 py-1">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="text"
        placeholder={isFocused ? "" : "search"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent text-center text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
