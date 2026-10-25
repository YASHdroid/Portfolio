"use client";

import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowManager } from "@/store/window-manager";
import { useIsMobile } from "@/hooks/use-mobile";
import type { WindowId } from "@/lib/types";

interface DesktopWindowProps {
  id: WindowId;
  title: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  isActive: boolean;
  children: ReactNode;
  /** When true, hide the resize handle (e.g. terminal). */
  disableResize?: boolean;
  /** Optional toolbar rendered between the title bar and content. */
  toolbar?: ReactNode;
  /** Optional sidebar rendered to the left of content (Finder-style). */
  sidebar?: ReactNode;
}

const MIN_WIDTH = 360;
const MIN_HEIGHT = 240;
const TOP_BAR_HEIGHT = 28; // menu bar
const DOCK_RESERVED = 96; // dock + spacing

export function DesktopWindow({
  id,
  title,
  initialPosition,
  initialSize,
  zIndex,
  minimized,
  maximized,
  isActive,
  children,
  disableResize,
  toolbar,
  sidebar,
}: DesktopWindowProps) {
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximize, moveWindow, resizeWindow } =
    useWindowManager();
  const isMobile = useIsMobile();
  const dragState = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const resizeState = useRef<{
    startX: number;
    startY: number;
    origW: number;
    origH: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDownTitle = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (maximized || isMobile) return;
      if ((e.target as HTMLElement).closest("[data-window-control]")) return;
      // Only left button starts a drag.
      if (e.button !== 0) return;
      focusWindow(id);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: initialPosition.x,
        origY: initialPosition.y,
      };
      setIsDragging(true);
    },
    [focusWindow, id, initialPosition.x, initialPosition.y, maximized, isMobile],
  );

  const onPointerMoveTitle = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragState.current) return;
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      const newX = dragState.current.origX + dx;
      const newY = Math.max(
        TOP_BAR_HEIGHT,
        dragState.current.origY + dy,
      );
      moveWindow(id, { x: newX, y: newY });
    },
    [id, moveWindow],
  );

  const onPointerUpTitle = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragState.current) {
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
        dragState.current = null;
        setIsDragging(false);
      }
    },
    [],
  );

  const onPointerDownResize = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (maximized || disableResize) return;
      e.stopPropagation();
      if (e.button !== 0) return;
      focusWindow(id);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      resizeState.current = {
        startX: e.clientX,
        startY: e.clientY,
        origW: initialSize.width,
        origH: initialSize.height,
      };
    },
    [disableResize, focusWindow, id, initialSize.height, initialSize.width, maximized],
  );

  const onPointerMoveResize = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!resizeState.current) return;
      const dx = e.clientX - resizeState.current.startX;
      const dy = e.clientY - resizeState.current.startY;
      const newW = Math.max(MIN_WIDTH, resizeState.current.origW + dx);
      const newH = Math.max(MIN_HEIGHT, resizeState.current.origH + dy);
      resizeWindow(id, { width: newW, height: newH });
    },
    [id, resizeWindow],
  );

  const onPointerUpResize = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (resizeState.current) {
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
        resizeState.current = null;
      }
    },
    [],
  );

  // Compute geometry.
  const desktopRect =
    typeof window !== "undefined"
      ? { width: window.innerWidth, height: window.innerHeight }
      : { width: 1280, height: 800 };

  // On mobile, force a stacked fullscreen layout — each open window fills
  // the viewport below the menu bar and above the dock.
  const forceFullscreen = isMobile;

  const geometry = forceFullscreen
    ? {
        left: 0,
        top: TOP_BAR_HEIGHT,
        width: desktopRect.width,
        height: desktopRect.height - TOP_BAR_HEIGHT - 76, // dock reserved
      }
    : maximized
    ? {
        left: 8,
        top: TOP_BAR_HEIGHT + 4,
        width: desktopRect.width - 16,
        height: desktopRect.height - TOP_BAR_HEIGHT - DOCK_RESERVED,
      }
    : {
        left: initialPosition.x,
        top: initialPosition.y,
        width: initialSize.width,
        height: initialSize.height,
      };

  return (
    <AnimatePresence>
      {!minimized && (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            left: geometry.left,
            top: geometry.top,
            width: geometry.width,
            height: geometry.height,
          }}
          exit={{ opacity: 0, scale: 0.92, y: 12 }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 32,
            mass: 0.7,
            opacity: { duration: 0.18 },
          }}
          onPointerDown={() => focusWindow(id)}
          className="absolute flex flex-col overflow-hidden rounded-xl window-shadow"
          style={{
            zIndex,
            background: "var(--window-bg)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
            border: "1px solid var(--window-border)",
            // Disable transitions on left/top/width/height while dragging
            // for snappier feel — Framer Motion handles spring only on
            // animate; pointer-move sets left/top directly via animate.
          }}
          role="dialog"
          aria-modal="false"
          aria-label={title}
          aria-hidden={false}
        >
          {/* Title bar */}
          <div
            onPointerDown={onPointerDownTitle}
            onPointerMove={onPointerMoveTitle}
            onPointerUp={onPointerUpTitle}
            onDoubleClick={() => toggleMaximize(id)}
            className={`flex h-9 shrink-0 items-center gap-2 px-3 select-none ${
              isActive ? "cursor-grab" : "cursor-default"
            } ${isDragging ? "cursor-grabbing" : ""}`}
            style={{
              borderBottom: "1px solid var(--window-border)",
              background: isActive
                ? "rgba(255,255,255,0.18)"
                : "rgba(255,255,255,0.08)",
            }}
          >
            <TrafficLights
              onClose={() => closeWindow(id)}
              onMinimize={() => minimizeWindow(id)}
              onMaximize={() => toggleMaximize(id)}
              maximized={maximized}
            />
            <div className="pointer-events-none absolute left-0 right-0 flex justify-center">
              <span className="text-[12.5px] font-medium text-foreground/85 truncate max-w-[60%]">
                {title}
              </span>
            </div>
          </div>

          {toolbar && (
            <div className="shrink-0 border-b border-foreground/10 px-3 py-2 bg-foreground/[0.03]">
              {toolbar}
            </div>
          )}

          {/* Body */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            {sidebar && (
              <aside className="w-44 shrink-0 border-r border-foreground/10 bg-foreground/[0.04] overflow-y-auto thin-scrollbar">
                {sidebar}
              </aside>
            )}
            <div className="flex-1 min-w-0 overflow-y-auto thin-scrollbar">
              {children}
            </div>
          </div>

          {/* Resize handle (bottom-right corner) */}
          {!disableResize && !maximized && !isMobile && (
            <div
              onPointerDown={onPointerDownResize}
              onPointerMove={onPointerMoveResize}
              onPointerUp={onPointerUpResize}
              className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
              aria-hidden="true"
            >
              <svg viewBox="0 0 16 16" className="h-full w-full opacity-40">
                <path d="M 16 6 L 6 16" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M 16 10 L 10 16" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M 16 14 L 14 16" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
  maximized,
}: {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  maximized: boolean;
}) {
  return (
    <div className="group/lights flex items-center gap-2" data-window-control>
      <Light color="#FF5F57" label="Close" onClick={onClose} icon="×" />
      <Light color="#FEBC2E" label="Minimize" onClick={onMinimize} icon="−" />
      <Light
        color="#28C840"
        label={maximized ? "Restore" : "Maximize"}
        onClick={onMaximize}
        icon={maximized ? "⤄" : "+"}
      />
    </div>
  );
}

function Light({
  color,
  label,
  onClick,
  icon,
}: {
  color: string;
  label: string;
  onClick: () => void;
  icon: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => e.stopPropagation()}
      className="flex h-3 w-3 items-center justify-center rounded-full transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style={{ background: color, boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.18)" }}
      aria-label={label}
      title={label}
    >
      <span className="text-[8px] font-bold leading-none text-black/55 opacity-0 group-hover/lights:opacity-100">
        {icon}
      </span>
    </button>
  );
}
