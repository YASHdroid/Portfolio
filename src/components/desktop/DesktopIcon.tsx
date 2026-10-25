"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export function DesktopIcon({
  label,
  icon,
  selected,
  onSelect,
  onOpen,
}: DesktopIconProps) {
  const isMobile = useIsMobile();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      // On touch devices, single tap opens directly.
      onOpen();
      return;
    }
    // Desktop: first click selects, double-click opens.
    onSelect();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMobile) onOpen();
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onTouchStart={(e) => e.stopPropagation()}
      className="group flex w-[6.75rem] flex-col items-center gap-1.5 rounded-lg p-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`${label} — ${isMobile ? "tap" : "double-click"} to open`}
      aria-pressed={selected}
    >
      <span
        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200 ${
          selected
            ? "ring-2 ring-white/70 ring-offset-0"
            : "ring-1 ring-white/10 group-hover:ring-white/40"
        }`}
        style={{
          background: selected
            ? "rgba(255,255,255,0.22)"
            : "rgba(255,255,255,0.06)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="drop-shadow-[0_4px_10px_rgba(32,36,58,0.4)]">
          {icon}
        </span>
      </span>
      <span
        dir="ltr"
        className={`max-w-full truncate rounded-md px-1.5 py-0.5 text-[11.5px] font-medium leading-tight transition-colors ${
          selected
            ? "bg-blue-500/80 text-white"
            : "text-white/90 group-hover:bg-white/15"
        }`}
        style={{
          textShadow: selected
            ? "none"
            : "0 1px 3px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.4)",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
