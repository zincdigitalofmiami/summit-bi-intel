"use client";

import Link from "next/link";
import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import Container from "../container";
import { ThemeToggle } from "../theme-toggle";

export default function TopNav({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Container className="flex h-14 items-center justify-between border-b border-border sm:h-16">
      <h1 className="truncate text-lg font-medium sm:text-2xl">{title}</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="relative">
          <button
            className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-sm hover:bg-accent"
            onClick={() => setOpen((v) => !v)}
          >
            <span>User</span>
            <ChevronDown size={14} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-44 rounded-md border border-border bg-popover p-1 shadow-md">
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
                onClick={() => setOpen(false)}
              >
                <Settings size={14} /> Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
