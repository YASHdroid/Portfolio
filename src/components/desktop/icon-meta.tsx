"use client";

import {
  User,
  Briefcase,
  FolderKanban,
  Cpu,
  GraduationCap,
  Trophy,
  FileText,
  Mail,
  Terminal as TerminalIcon,
  Trash2,
  Home,
  type LucideIcon,
} from "lucide-react";
import type { WindowId } from "@/lib/types";

interface IconMeta {
  Icon: LucideIcon;
  /** Tailwind text color class for the glyph. */
  color: string;
  /** Subtle gradient bg for the icon tile, behind the glyph. */
  bg: string;
  label: string;
}

export const WINDOW_ICON_META: Record<WindowId, IconMeta> = {
  about: {
    Icon: User,
    color: "text-white",
    bg: "linear-gradient(160deg, #DCD6F7 0%, #B8B0D9 100%)",
    label: "About Me",
  },
  experience: {
    Icon: Briefcase,
    color: "text-white",
    bg: "linear-gradient(160deg, #7B8E70 0%, #5E7058 100%)",
    label: "Experience",
  },
  projects: {
    Icon: FolderKanban,
    color: "text-white",
    bg: "linear-gradient(160deg, #8E94C2 0%, #5C547A 100%)",
    label: "Projects",
  },
  skills: {
    Icon: Cpu,
    color: "text-white",
    bg: "linear-gradient(160deg, #B8C7B0 0%, #7B8E70 100%)",
    label: "Skills",
  },
  education: {
    Icon: GraduationCap,
    color: "text-white",
    bg: "linear-gradient(160deg, #C98C8C 0%, #8E5F5F 100%)",
    label: "Education",
  },
  achievements: {
    Icon: Trophy,
    color: "text-white",
    bg: "linear-gradient(160deg, #D9A5A5 0%, #C98C8C 100%)",
    label: "Achievements",
  },
  resume: {
    Icon: FileText,
    color: "text-[#20243A]",
    bg: "linear-gradient(160deg, #F5F1E8 0%, #E2D8C3 100%)",
    label: "Resume.pdf",
  },
  contact: {
    Icon: Mail,
    color: "text-white",
    bg: "linear-gradient(160deg, #5C547A 0%, #20243A 100%)",
    label: "Contact Me",
  },
  terminal: {
    Icon: TerminalIcon,
    color: "text-white",
    bg: "linear-gradient(160deg, #30313B 0%, #15182B 100%)",
    label: "Terminal",
  },
  trash: {
    Icon: Trash2,
    color: "text-white",
    bg: "linear-gradient(160deg, #9CAD92 0%, #5E7058 100%)",
    label: "Trash",
  },
};

export const DOCK_ICON_META = {
  home: {
    Icon: Home,
    color: "text-white",
    bg: "linear-gradient(160deg, #DCD6F7 0%, #8E94C2 100%)",
    label: "Finder",
  },
} as const;

interface IconTileProps {
  meta: IconMeta;
  size?: number;
  className?: string;
}

/** Renders an icon inside a macOS-style rounded-square tile. */
export function IconTile({ meta, size = 44, className = "" }: IconTileProps) {
  const { Icon, color, bg } = meta;
  return (
    <span
      className={`relative flex items-center justify-center rounded-2xl ${className}`}
      style={{
        width: size,
        height: size,
        background: bg,
        boxShadow:
          "0 4px 10px rgba(32,36,58,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
      }}
    >
      <Icon className={`${color}`} style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={1.6} />
    </span>
  );
}
