"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  BatteryMedium,
  Search,
  Sun,
  Moon,
  Palette,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useClock } from "@/hooks/use-clock";
import { usePreferences } from "@/store/preferences";
import { WALLPAPERS } from "@/components/desktop/Wallpaper";
import type { WallpaperId, WindowId } from "@/lib/types";

interface MenuBarProps {
  activeAppLabel: string | null;
  onOpenWindow: (id: WindowId) => void;
  onOpenSpotlight: () => void;
  onReplayIntro?: () => void;
}

interface MenuItem {
  label: string;
  onClick?: () => void;
  shortcut?: string;
  separator?: boolean;
  disabled?: boolean;
}

interface Menu {
  id: string;
  label: string;
  items: MenuItem[];
}

export function MenuBar({
  activeAppLabel,
  onOpenWindow,
  onOpenSpotlight,
  onReplayIntro,
}: MenuBarProps) {
  const clock = useClock();
  const { theme, toggleTheme, wallpaper, setWallpaper, musicEnabled, setMusicEnabled } =
    usePreferences();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [wallpaperOpen, setWallpaperOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setWallpaperOpen(false);
      }
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setWallpaperOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const closeAll = () => {
    setOpenMenu(null);
    setWallpaperOpen(false);
  };

  const menus: Menu[] = [
    {
      id: "portfolio",
      label: "Portfolio",
      items: [
        { label: "About Me", onClick: () => onOpenWindow("about") },
        { label: "Projects", onClick: () => onOpenWindow("projects") },
        { label: "Experience", onClick: () => onOpenWindow("experience") },
        { label: "Skills", onClick: () => onOpenWindow("skills") },
        { separator: true, label: "" },
        { label: "Education", onClick: () => onOpenWindow("education") },
        { label: "Contact Me", onClick: () => onOpenWindow("contact") },
        { separator: true, label: "" },
        { label: "Resume.pdf", onClick: () => onOpenWindow("resume") },
        { label: "Terminal", onClick: () => onOpenWindow("terminal") },
        { separator: true, label: "" },
        { label: "Replay Intro", onClick: () => onReplayIntro?.() },
      ],
    },
    {
      id: "view",
      label: "View",
      items: [
        {
          label: theme === "light" ? "Switch to Dark" : "Switch to Light",
          onClick: toggleTheme,
        },
        {
          label: "Change Wallpaper…",
          onClick: () => setWallpaperOpen(true),
        },
        { separator: true, label: "" },
        { label: "Open Spotlight", onClick: onOpenSpotlight, shortcut: "⌘K" },
      ],
    },
    {
      id: "projects",
      label: "Projects",
      items: [
        { label: "Scout — AI Research", onClick: () => onOpenWindow("projects") },
        { label: "CodeLens — Code Intelligence", onClick: () => onOpenWindow("projects") },
        { label: "Foodify — Food Ordering", onClick: () => onOpenWindow("projects") },
        { label: "Carbon Tracker — Eco Impact", onClick: () => onOpenWindow("projects") },
        { label: "DevTinder — Dev Networking", onClick: () => onOpenWindow("projects") },
        { label: "Krishimitra — Crop Advisory", onClick: () => onOpenWindow("projects") },
      ],
    },
    {
      id: "about",
      label: "About",
      items: [
        { label: "About Yash Chopra", onClick: () => onOpenWindow("about") },
        { label: "Education at MAIT", onClick: () => onOpenWindow("education") },
        { label: "Experience & Activities", onClick: () => onOpenWindow("experience") },
      ],
    },
    {
      id: "help",
      label: "Help",
      items: [
        { label: "Open Terminal", onClick: () => onOpenWindow("terminal") },
        {
          label: "Open Spotlight Search",
          onClick: onOpenSpotlight,
          shortcut: "⌘K",
        },
        { label: "Replay Intro", onClick: () => onReplayIntro?.() },
        { separator: true, label: "" },
        { label: "About this Portfolio", onClick: () => onOpenWindow("about") },
      ],
    },
  ];

  return (
    <div
      ref={menuRef}
      className="menu-bar-glass fixed top-0 left-0 right-0 z-[120] h-7 flex items-center justify-between px-2 sm:px-3 text-[13px] text-foreground/90 select-none"
      role="menubar"
      aria-label="Desktop menu bar"
    >
      <div className="flex items-center gap-0.5 min-w-0">
        <PortfolioMark />
        <span className="font-semibold mx-1.5 truncate">{activeAppLabel ?? "Portfolio"}</span>
        <nav className="hidden sm:flex items-center" aria-label="Menu bar menus">
          {menus.map((menu) => (
            <MenuButton
              key={menu.id}
              menu={menu}
              isOpen={openMenu === menu.id}
              onToggle={() => {
                setOpenMenu(openMenu === menu.id ? null : menu.id);
                setWallpaperOpen(false);
              }}
              onHover={() => {
                if (openMenu !== null && openMenu !== menu.id) {
                  setOpenMenu(menu.id);
                }
              }}
              onItemClick={(item) => {
                item.onClick?.();
                closeAll();
              }}
            />
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 text-foreground/80">
        <button
          onClick={onOpenSpotlight}
          className="hidden sm:flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:bg-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Open Spotlight search"
          title="Spotlight (⌘K)"
        >
          <Search className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setMusicEnabled(!musicEnabled)}
          className="rounded-md p-1 hover:bg-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={musicEnabled ? "Mute background music" : "Play background music"}
          aria-pressed={musicEnabled}
          title={musicEnabled ? "Mute music" : "Play music"}
        >
          {musicEnabled ? (
            <Volume2 className="h-3.5 w-3.5" />
          ) : (
            <VolumeX className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          onClick={toggleTheme}
          className="rounded-md p-1 hover:bg-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? (
            <Moon className="h-3.5 w-3.5" />
          ) : (
            <Sun className="h-3.5 w-3.5" />
          )}
        </button>
        <Palette
          className="h-3.5 w-3.5 hidden sm:block opacity-70 cursor-pointer"
          onClick={() => setWallpaperOpen((v) => !v)}
          aria-label="Change wallpaper"
          role="button"
        />
        <Wifi className="h-3.5 w-3.5 opacity-80" />
        <BatteryMedium className="h-3.5 w-3.5 opacity-80" />
        <div className="hidden sm:flex items-center gap-2 ml-1 text-[12px] leading-none">
          <span className="opacity-80">{clock.date}</span>
          <span className="font-medium">{clock.time}</span>
        </div>
        <div className="sm:hidden text-[12px] font-medium">{clock.time}</div>
      </div>

      <AnimatePresence>
        {wallpaperOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-8 right-3 w-64 glass-strong rounded-xl p-3 window-shadow"
            role="dialog"
            aria-label="Wallpaper switcher"
          >
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-foreground/70">
              <Palette className="h-3.5 w-3.5" />
              <span>Wallpaper</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => {
                    setWallpaper(wp.id as WallpaperId);
                    setWallpaperOpen(false);
                  }}
                  className={`group relative aspect-video overflow-hidden rounded-lg border transition-all ${
                    wallpaper === wp.id
                      ? "border-foreground/60 ring-2 ring-accent"
                      : "border-foreground/15 hover:border-foreground/35"
                  }`}
                  aria-label={`Use ${wp.name} wallpaper`}
                  aria-pressed={wallpaper === wp.id}
                >
                  <div className="absolute inset-0 flex">
                    {wp.swatch.map((c, i) => (
                      <div key={i} className="flex-1" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 px-2 py-1 text-[10px] font-medium text-white bg-black/35 backdrop-blur-sm">
                    {wp.name}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuButton({
  menu,
  isOpen,
  onToggle,
  onHover,
  onItemClick,
}: {
  menu: Menu;
  isOpen: boolean;
  onToggle: () => void;
  onHover: () => void;
  onItemClick: (item: MenuItem) => void;
}) {
  return (
    <div className="relative">
      <button
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onToggle}
        onMouseEnter={onHover}
        className={`rounded-md px-2.5 py-0.5 text-[13px] leading-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          isOpen ? "bg-foreground/15" : "hover:bg-foreground/10"
        }`}
      >
        {menu.label}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-7 left-0 min-w-[15rem] glass-strong rounded-lg p-1 window-shadow"
            role="menu"
          >
            {menu.items.map((item, i) =>
              item.separator ? (
                <div key={i} className="my-1 h-px bg-foreground/10" />
              ) : (
                <button
                  key={i}
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => onItemClick(item)}
                  className="flex w-full items-center justify-between gap-6 rounded-md px-3 py-1.5 text-left text-[13px] hover:bg-accent/60 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <span>{item.label}</span>
                  {item.shortcut && (
                    <span className="text-[11px] text-foreground/55 font-mono">
                      {item.shortcut}
                    </span>
                  )}
                </button>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PortfolioMark() {
  return (
    <div
      className="flex items-center justify-center h-6 w-6 rounded-md shrink-0"
      aria-hidden="true"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
        <circle cx="8" cy="8" r="2" fill="#DCD6F7" />
      </svg>
    </div>
  );
}
