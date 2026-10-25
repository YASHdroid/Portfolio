"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { Wallpaper } from "./Wallpaper";
import { DesktopIcon } from "./DesktopIcon";
import { SpotlightSearch } from "./SpotlightSearch";
import { BackgroundMusic } from "./BackgroundMusic";
import { WindowManager } from "./WindowManager";
import { IconTile, WINDOW_ICON_META } from "./icon-meta";
import { useWindowManager } from "@/store/window-manager";
import { usePreferences } from "@/store/preferences";
import type { WindowId } from "@/lib/types";

interface DesktopProps {
  /** Triggered when the desktop first appears (used for transition out of intro). */
  onReady?: () => void;
  /** Replay the cinematic greeting (Portfolio → Replay Intro). */
  onReplayIntro?: () => void;
}

interface DesktopIconConfig {
  id: WindowId;
  label: string;
}

const DESKTOP_ICONS: DesktopIconConfig[] = [
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "resume", label: "Resume.pdf" },
  { id: "contact", label: "Contact Me" },
  { id: "terminal", label: "Terminal" },
  { id: "trash", label: "Trash" },
];

export function Desktop({ onReady, onReplayIntro }: DesktopProps) {
  const { openWindow, windows, activeId } = useWindowManager();
  const { wallpaper, theme } = usePreferences();
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync theme class on <html>.
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Mount animation.
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setMounted(true);
      onReady?.();
    });
    return () => cancelAnimationFrame(t);
  }, [onReady]);

  // Cmd/Ctrl+K to open Spotlight.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Deselect icon when clicking on empty desktop.
  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };

  // Compute active app label for the menu bar.
  const activeAppLabel = activeId
    ? windows.find((w) => w.id === activeId)?.title ?? "Portfolio"
    : "Portfolio";

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 1.04 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={handleDesktopClick}
    >
      <Wallpaper wallpaper={wallpaper} />

      {/* Soft ambient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.25) 0%, transparent 60%)"
              : "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)",
        }}
      />

      <MenuBar
        activeAppLabel={activeAppLabel}
        onOpenWindow={openWindow}
        onOpenSpotlight={() => setSpotlightOpen(true)}
        onReplayIntro={onReplayIntro}
      />

      {/* Desktop icons — row-limited grid that flows into extra columns
          (macOS-style, filling right-to-left) so all icons always fit
          between the menu bar and the dock on any screen height. */}
      <div
        dir="rtl"
        className="absolute top-10 right-2 sm:top-12 sm:right-4 z-10 grid grid-flow-col auto-cols-max gap-1 grid-rows-4 [@media(min-height:700px)]:grid-rows-6 [@media(min-height:880px)]:grid-rows-7"
        onClick={(e) => e.stopPropagation()}
        aria-label="Desktop icons"
      >
        {DESKTOP_ICONS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.04, duration: 0.4 }}
          >
            <DesktopIcon
              label={item.label}
              icon={<IconTile meta={WINDOW_ICON_META[item.id]} size={44} />}
              selected={selectedIcon === item.id}
              onSelect={() => setSelectedIcon(item.id)}
              onOpen={() => openWindow(item.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Windows */}
      <div onClick={(e) => e.stopPropagation()} className="absolute inset-0">
        <WindowManager />
      </div>

      {/* Dock */}
      <Dock />

      {/* Spotlight */}
      <SpotlightSearch
        open={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onOpenWindow={openWindow}
      />

      {/* Looping background soundtrack — mute from the menu bar */}
      <BackgroundMusic />

      {/* Subtle desktop hint — sits over the dark foreground layer of
          every wallpaper scene, so white + shadow stays readable */}
      <div
        className="pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 text-[10.5px] uppercase tracking-[0.3em] text-white/60 hidden sm:block"
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.55)" }}
      >
        Press ⌘K to search · double-click to open
      </div>
    </motion.div>
  );
}
