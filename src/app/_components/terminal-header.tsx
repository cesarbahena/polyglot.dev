"use client";

export function TerminalHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-8 py-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold text-primary">▹</div>
          <h1 className="text-2xl font-bold">POLYGLOT.DEV</h1>
        </div>
      </div>
    </header>
  );
}
