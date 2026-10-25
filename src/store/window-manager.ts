"use client";

import { create } from "zustand";
import type { WindowId, WindowState } from "@/lib/types";

/**
 * Default geometry per window. Windows cascade from a base offset
 * so multiple open windows don't perfectly overlap.
 */
const DEFAULT_GEOMETRY: Record<
  WindowId,
  { width: number; height: number; title: string }
> = {
  about: { width: 720, height: 520, title: "About Me" },
  experience: { width: 760, height: 560, title: "Experience" },
  projects: { width: 880, height: 600, title: "Projects" },
  skills: { width: 760, height: 560, title: "Skills" },
  education: { width: 720, height: 520, title: "Education" },
  achievements: { width: 720, height: 520, title: "Achievements" },
  resume: { width: 720, height: 600, title: "Resume.pdf" },
  contact: { width: 640, height: 560, title: "Contact Me" },
  terminal: { width: 680, height: 440, title: "Terminal — yash@portfolio" },
  trash: { width: 560, height: 400, title: "Trash" },
};

interface WindowManagerState {
  windows: WindowState[];
  /** The currently focused window id, or null if none. */
  activeId: WindowId | null;
  /** Running zIndex counter so newly focused windows are always on top. */
  zCounter: number;

  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  moveWindow: (id: WindowId, position: { x: number; y: number }) => void;
  resizeWindow: (id: WindowId, size: { width: number; height: number }) => void;
  /** Whether the window is currently open (minimized or not). */
  isOpen: (id: WindowId) => boolean;
}

const BASE_OFFSET_X = 120;
const BASE_OFFSET_Y = 80;
const CASCADE_STEP = 28;

export const useWindowManager = create<WindowManagerState>((set, get) => ({
  windows: [],
  activeId: null,
  zCounter: 10,

  openWindow: (id) => {
    const state = get();
    const existing = state.windows.find((w) => w.id === id);
    if (existing) {
      set({
        activeId: id,
        zCounter: state.zCounter + 1,
        windows: state.windows.map((w) =>
          w.id === id
            ? { ...w, minimized: false, zIndex: state.zCounter + 1 }
            : w,
        ),
      });
      return;
    }
    const geometry = DEFAULT_GEOMETRY[id];
    const index = state.windows.length;
    const position = {
      x: BASE_OFFSET_X + index * CASCADE_STEP,
      y: BASE_OFFSET_Y + index * CASCADE_STEP,
    };
    const newWindow: WindowState = {
      id,
      title: geometry.title,
      zIndex: state.zCounter + 1,
      position,
      size: { width: geometry.width, height: geometry.height },
      minimized: false,
      maximized: false,
    };
    set({
      windows: [...state.windows, newWindow],
      activeId: id,
      zCounter: state.zCounter + 1,
    });
  },

  closeWindow: (id) => {
    const state = get();
    const remaining = state.windows.filter((w) => w.id !== id);
    const visible = remaining.filter((w) => !w.minimized);
    const newActive =
      visible.length === 0
        ? null
        : visible.reduce((top, w) =>
            w.zIndex > top.zIndex ? w : top,
          ).id;
    set({ windows: remaining, activeId: newActive });
  },

  focusWindow: (id) => {
    const state = get();
    const win = state.windows.find((w) => w.id === id);
    if (!win) return;
    if (win.zIndex === state.zCounter) {
      set({ activeId: id });
      return;
    }
    set({
      activeId: id,
      zCounter: state.zCounter + 1,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: state.zCounter + 1 } : w,
      ),
    });
  },

  minimizeWindow: (id) => {
    const state = get();
    set({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w,
      ),
      activeId: state.activeId === id ? null : state.activeId,
    });
  },

  restoreWindow: (id) => {
    const state = get();
    set({
      windows: state.windows.map((w) =>
        w.id === id
          ? { ...w, minimized: false, zIndex: state.zCounter + 1 }
          : w,
      ),
      activeId: id,
      zCounter: state.zCounter + 1,
    });
  },

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.preMaximize) {
          return {
            ...w,
            maximized: false,
            position: w.preMaximize.position,
            size: w.preMaximize.size,
            preMaximize: undefined,
          };
        }
        return {
          ...w,
          maximized: true,
          preMaximize: { position: w.position, size: w.size },
        };
      }),
    }));
  },

  moveWindow: (id, position) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w,
      ),
    })),

  resizeWindow: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, size } : w,
      ),
    })),

  isOpen: (id) => get().windows.some((w) => w.id === id),
}));
