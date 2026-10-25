"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Briefcase,
  FolderKanban,
  Cpu,
  GraduationCap,
  FileText,
  Mail,
  Terminal as TerminalIcon,
  CornerDownLeft,
  type LucideIcon,
} from "lucide-react";
import type { WindowId } from "@/lib/types";

interface SpotlightProps {
  open: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
}

interface SpotlightItem {
  id: WindowId;
  label: string;
  description: string;
  Icon: LucideIcon;
  keywords: string[];
}

const ITEMS: SpotlightItem[] = [
  {
    id: "about",
    label: "About Me",
    description: "Personal intro, interests, and developer philosophy",
    Icon: User,
    keywords: ["about", "me", "yash", "intro", "bio", "profile"],
  },
  {
    id: "projects",
    label: "Projects",
    description: "Scout, CodeLens, Foodify, Carbon Tracker & more",
    Icon: FolderKanban,
    keywords: [
      "projects",
      "scout",
      "codelens",
      "krishimitra",
      "devtinder",
      "foodify",
      "food",
      "carbon",
      "tracker",
      "eco",
      "work",
      "code",
    ],
  },
  {
    id: "experience",
    label: "Experience",
    description: "Projects, activities, and contributions",
    Icon: Briefcase,
    keywords: ["experience", "work", "internship", "jobs", "activity"],
  },
  {
    id: "skills",
    label: "Skills",
    description: "Languages, frontend, backend, AI/ML, databases, tools",
    Icon: Cpu,
    keywords: ["skills", "tech", "stack", "languages", "tools"],
  },
  {
    id: "education",
    label: "Education",
    description: "B.Tech CSE at MAIT",
    Icon: GraduationCap,
    keywords: ["education", "mait", "college", "school", "degree", "btech"],
  },
  {
    id: "resume",
    label: "Resume.pdf",
    description: "Document preview & download",
    Icon: FileText,
    keywords: ["resume", "cv", "pdf", "download"],
  },
  {
    id: "contact",
    label: "Contact Me",
    description: "Email, GitHub, LinkedIn, Leetcode, contact form",
    Icon: Mail,
    keywords: ["contact", "email", "github", "linkedin", "leetcode", "message"],
  },
  {
    id: "terminal",
    label: "Terminal",
    description: "Interactive developer terminal",
    Icon: TerminalIcon,
    keywords: ["terminal", "shell", "cli", "command", "zsh"],
  },
];

export function SpotlightSearch({ open, onClose, onOpenWindow }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      // Reset is desired when the modal opens; this is a state sync with the
      // external `open` flag. Suppress the cascading-render lint rule here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setActiveIdx(0);
      // Focus input on next paint.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter((item) => {
      const haystack = [item.label, item.description, ...item.keywords]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  // Clamp activeIdx to the available results instead of resetting on query
  // change. This avoids a setState-in-effect while still keeping selection
  // valid as the user types.
  const safeActiveIdx =
    filtered.length === 0 ? 0 : Math.min(activeIdx, filtered.length - 1);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[safeActiveIdx];
        if (item) {
          onOpenWindow(item.id);
          onClose();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, filtered, safeActiveIdx, onClose, onOpenWindow]);

  // Scroll active item into view.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.querySelector(`[data-idx="${safeActiveIdx}"]`);
    item?.scrollIntoView({ block: "nearest" });
  }, [safeActiveIdx]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center pt-[14vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Spotlight search"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl glass-strong window-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-foreground/10">
              <Search className="h-4 w-4 text-foreground/55" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the desktop…"
                className="flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-foreground/40"
                aria-label="Search the desktop"
                aria-controls="spotlight-results"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="rounded border border-foreground/15 px-1.5 py-0.5 text-[10px] font-mono text-foreground/55">
                esc
              </kbd>
            </div>

            {/* Results */}
            <div
              id="spotlight-results"
              ref={listRef}
              role="listbox"
              className="max-h-[50vh] overflow-y-auto thin-scrollbar p-1.5"
            >
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-[13px] text-foreground/55">
                  No results for “{query}”
                </div>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={item.id}
                    data-idx={i}
                    role="option"
                    aria-selected={i === safeActiveIdx}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => {
                      onOpenWindow(item.id);
                      onClose();
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                      i === safeActiveIdx ? "bg-accent/70" : "hover:bg-foreground/5"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        i === safeActiveIdx
                          ? "bg-foreground text-background"
                          : "bg-foreground/10 text-foreground/75"
                      }`}
                    >
                      <item.Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-medium text-foreground">
                        {item.label}
                      </div>
                      <div className="text-[11.5px] text-foreground/55 truncate">
                        {item.description}
                      </div>
                    </div>
                    {i === safeActiveIdx && (
                      <CornerDownLeft className="h-3.5 w-3.5 text-foreground/55" />
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="border-t border-foreground/10 px-4 py-2 flex items-center justify-between text-[10.5px] text-foreground/50">
              <span>Type to search · ↑↓ to navigate · ⏎ to open</span>
              <span className="font-mono">{filtered.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
