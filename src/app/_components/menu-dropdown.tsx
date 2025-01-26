"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface MenuItem {
  label: string;
  href: string;
}

interface MenuDropdownProps {
  label: string;
  items: MenuItem[];
}

export function MenuDropdown({ label, items }: MenuDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded px-2 py-1 text-sm hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary">
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="font-mono">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer"
            >
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
