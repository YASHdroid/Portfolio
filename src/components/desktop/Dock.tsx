"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useWindowManager } from "@/store/window-manager";
import { WINDOW_ICON_META, DOCK_ICON_META, IconTile } from "@/components/desktop/icon-meta";
import type { WindowId } from "@/lib/types";

interface DockItem {
  id: WindowId | "home";
  windowId?: WindowId;
}

const DOCK_ITEMS: DockItem[] = [
  { id: "home" },
  { id: "about", windowId: "about" },
  { id: "projects", windowId: "projects" },
  { id: "experience", windowId: "experience" },
  { id: "skills", windowId: "skills" },
  { id: "terminal", windowId: "terminal" },
  { id: "contact", windowId: "contact" },
];

export function Dock() {
  const { openWindow, windows, restoreWindow, activeId } = useWindowManager();
  const mouseX = useMotionValue<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipId, setTooltipId] = useState<string | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
    },
    [mouseX],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(null);
    setTooltipId(null);
  }, [mouseX]);

  const handleItemClick = (item: DockItem) => {
    if (!item.windowId) {
      // Home / Finder — open About as the home window.
      openWindow("about");
      return;
    }
    const win = windows.find((w) => w.id === item.windowId);
    if (win?.minimized) {
      restoreWindow(item.windowId);
    } else {
      openWindow(item.windowId);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-2 left-1/2 z-[110] -translate-x-1/2 w-full flex justify-center px-2">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="pointer-events-auto dock-glass rounded-2xl px-2 py-1.5 window-shadow"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        role="toolbar"
        aria-label="Dock"
      >
        <div className="flex items-end gap-1">
          {DOCK_ITEMS.map((item, idx) => {
            const isHome = item.id === "home";
            const meta = isHome ? DOCK_ICON_META.home : WINDOW_ICON_META[item.windowId!];
            const win = item.windowId
              ? windows.find((w) => w.id === item.windowId)
              : null;
            const isActive = item.windowId === activeId && win && !win.minimized;
            const isMinimized = win?.minimized;

            return (
              <div key={item.id} className="relative flex flex-col items-center">
                <DockIcon
                  meta={meta}
                  mouseX={mouseX}
                  containerRef={containerRef}
                  onHover={() => setTooltipId(item.id)}
                  onLeave={() => setTooltipId(null)}
                  onClick={() => handleItemClick(item)}
                  isActive={!!isActive}
                  isMinimized={!!isMinimized}
                  label={meta.label}
                />
                {/* Active/minimized indicator dot */}
                <div className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-foreground/80 transition-opacity"
                  style={{ opacity: win ? 1 : 0 }}
                  aria-hidden="true"
                />
                {idx === 0 && (
                  // Subtle divider between Finder and the rest.
                  <div className="absolute -right-1 top-1/2 h-10 w-px -translate-y-1/2 bg-foreground/15" aria-hidden="true" />
                )}
                <DockTooltip show={tooltipId === item.id} label={meta.label} />
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function DockIcon({
  meta,
  mouseX,
  containerRef,
  onHover,
  onLeave,
  onClick,
  isActive,
  isMinimized,
  label,
}: {
  meta: typeof WINDOW_ICON_META.about;
  mouseX: MotionValue<number | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isActive: boolean;
  isMinimized: boolean;
  label: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const baseSize = 44;
  const maxGrowth = 22;

  const distance = useTransform(mouseX, (val) => {
    if (val === null || !ref.current) return 9999;
    const rect = ref.current.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return 9999;
    // Distance from the center of this icon to the mouse within the dock.
    const iconCenter = rect.left - containerRect.left + rect.width / 2;
    return Math.abs(val - iconCenter);
  });

  const size = useTransform(distance, [0, 100], [baseSize + maxGrowth, baseSize], {
    clamp: true,
  });
  const animatedSize = useSpring(size, { stiffness: 320, damping: 26, mass: 0.4 });

  return (
    <motion.button
      ref={ref}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ width: animatedSize, height: animatedSize }}
      whileTap={{ scale: 0.92 }}
      className="relative flex items-end justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
      aria-label={`${label}${isActive ? " (active)" : isMinimized ? " (minimized)" : ""}`}
    >
      <motion.div
        style={{ width: animatedSize, height: animatedSize }}
        className="flex items-center justify-center"
      >
        <DockIconTile meta={meta} sizeSpring={animatedSize} />
      </motion.div>
    </motion.button>
  );
}

function DockIconTile({
  meta,
  sizeSpring,
}: {
  meta: typeof WINDOW_ICON_META.about;
  sizeSpring: MotionValue<number>;
}) {
  // Use the animated value to scale the inner tile.
  const tileScale = useTransform(sizeSpring, (s) => s / 44);
  return (
    <motion.div style={{ scale: tileScale }} className="flex items-center justify-center">
      <IconTile meta={meta} size={44} />
    </motion.div>
  );
}

function DockTooltip({ show, label }: { show: boolean; label: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground/85 px-2 py-1 text-[11px] font-medium text-background"
          role="tooltip"
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
