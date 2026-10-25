import type { LucideIcon } from "lucide-react";

export type AccentColor = "lavender" | "sage" | "rose" | "navy";

export interface ProfileConfig {
  name: string;
  firstName: string;
  role: string;
  tagline: string;
  location: string;
  education: {
    institution: string;
    degree: string;
    location: string;
    startYear: string;
    endYear: string;
    details: string;
  };
  about: {
    intro: string;
    philosophy: string;
    interests: string[];
    exploring: string[];
    journey: { year: string; title: string; detail: string }[];
  };
}

export interface ProjectConfig {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  accent: AccentColor;
  icon: string;
  /** Year the project was built & shipped. */
  year: string;
  github: string;
  demo: string;
  placeholderNote?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  skills: { name: string; note: string }[];
}

export interface ExperienceItem {
  type: "professional" | "project" | "activity";
  title: string;
  org: string;
  period: string;
  description: string;
}

export interface AchievementItem {
  title: string;
  detail: string;
  year: string;
}

export interface SocialLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string;
  description: string;
}

/** Identifies a window in the window manager. */
export type WindowId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "education"
  | "achievements"
  | "resume"
  | "contact"
  | "terminal"
  | "trash";

export interface WindowState {
  id: WindowId;
  title: string;
  /** Stacking order; higher = on top. */
  zIndex: number;
  /** Pixel position when not maximized. */
  position: { x: number; y: number };
  /** Pixel size when not maximized. */
  size: { width: number; height: number };
  /** Whether the window is minimized into the dock. */
  minimized: boolean;
  /** Whether the window is maximized to fill the desktop. */
  maximized: boolean;
  /** Snapshot of pre-maximize geometry so we can restore. */
  preMaximize?: { position: { x: number; y: number }; size: { width: number; height: number } };
}

export type WallpaperId = "lavender-dusk" | "sage-mist" | "rose-bloom" | "navy-night";
export type ThemeMode = "light" | "dark";

export interface DesktopPreferences {
  wallpaper: WallpaperId;
  theme: ThemeMode;
  /** Whether the user has dismissed the welcome screen before. */
  introSeen: boolean;
  /** Whether the looping background soundtrack should play. */
  musicEnabled: boolean;
}
