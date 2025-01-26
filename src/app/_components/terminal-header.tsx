"use client";

import { MenuDropdown, type MenuItem } from "./menu-dropdown";

interface TerminalHeaderProps {
  onOpenCommandPalette: () => void;
}

// Menu items
const languagesLinks: MenuItem[] = [
  { label: "TypeScript", href: "https://www.typescriptlang.org/docs/" },
  { label: "JavaScript (MDN)", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { label: "Python", href: "https://docs.python.org/" },
  { label: "Java", href: "https://docs.oracle.com/en/java/" },
  { label: "Go", href: "https://go.dev/doc/" },
  { label: "Rust", href: "https://doc.rust-lang.org/" },
];

const frameworksLinks: MenuItem[] = [
  { label: "React", href: "https://react.dev" },
  { label: "Next.js", href: "https://nextjs.org/docs" },
  { label: "Vue", href: "https://vuejs.org/guide/" },
  { label: "Angular", href: "https://angular.io/docs" },
  { label: "Svelte", href: "https://svelte.dev/docs" },
];

const librariesLinks: MenuItem[] = [
  { label: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
  { label: "tRPC", href: "https://trpc.io/docs" },
  { label: "Drizzle ORM", href: "https://orm.drizzle.team/docs" },
  { label: "Zod", href: "https://zod.dev" },
  { label: "Tanstack Query", href: "https://tanstack.com/query/latest" },
];

const toolsLinks: MenuItem[] = [
  { label: "VS Code", href: "https://code.visualstudio.com/docs" },
  { label: "Git", href: "https://git-scm.com/doc" },
  { label: "npm", href: "https://docs.npmjs.com/" },
  { label: "Vite", href: "https://vitejs.dev/guide/" },
];

const helpLinks: MenuItem[] = [
  { label: "Keyboard Shortcuts", href: "#" },
  { label: "About", href: "#" },
];

export function TerminalHeader({ onOpenCommandPalette }: TerminalHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center px-4 py-1.5">
        {/* Icon only */}
        <div className="text-lg font-bold text-primary">▹</div>

        {/* Menu bar */}
        <nav className="ml-4 flex items-center gap-1">
          <MenuDropdown label="Languages" items={languagesLinks} />
          <MenuDropdown label="Frameworks" items={frameworksLinks} />
          <MenuDropdown label="Libraries" items={librariesLinks} />
          <MenuDropdown label="Tools" items={toolsLinks} />
          <MenuDropdown label="Help" items={helpLinks} />
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Command palette hint */}
        <button
          onClick={onOpenCommandPalette}
          className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Ctrl+Shift+P
        </button>
      </div>
    </header>
  );
}
