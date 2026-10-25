"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List as ListIcon,
  Github,
  ExternalLink,
  Compass,
  ScanSearch,
  Sprout,
  Heart,
  Utensils,
  Leaf,
  CheckCircle2,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { projects } from "@/lib/portfolio-config";
import type { ProjectConfig, AccentColor } from "@/lib/types";

const ACCENT_CLASSES: Record<AccentColor, { tile: string; text: string; ring: string }> = {
  lavender: {
    tile: "linear-gradient(160deg, #DCD6F7 0%, #8E94C2 100%)",
    text: "text-[#5C547A]",
    ring: "ring-[#DCD6F7]",
  },
  sage: {
    tile: "linear-gradient(160deg, #B8C7B0 0%, #5E7058 100%)",
    text: "text-[#5E7058]",
    ring: "ring-[#B8C7B0]",
  },
  rose: {
    tile: "linear-gradient(160deg, #D9A5A5 0%, #8E5F5F 100%)",
    text: "text-[#8E5F5F]",
    ring: "ring-[#D9A5A5]",
  },
  navy: {
    tile: "linear-gradient(160deg, #5C547A 0%, #20243A 100%)",
    text: "text-[#20243A]",
    ring: "ring-[#5C547A]",
  },
};

const PROJECT_ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  scanSearch: ScanSearch,
  sprout: Sprout,
  heart: Heart,
  utensils: Utensils,
  leaf: Leaf,
};

type ViewMode = "grid" | "list";

export function ProjectsWindow() {
  const [mode, setMode] = useState<ViewMode>("grid");
  const [selected, setSelected] = useState<ProjectConfig | null>(null);

  if (selected) {
    return (
      <ProjectDetail
        project={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-foreground/10 bg-foreground/[0.03]">
        <div className="text-[12px] text-foreground/65">
          {projects.length} items
        </div>
        <div className="flex items-center gap-0.5 rounded-md bg-foreground/[0.06] p-0.5">
          <ToolbarToggle active={mode === "grid"} onClick={() => setMode("grid")} icon={<LayoutGrid className="h-3.5 w-3.5" />} label="Grid view" />
          <ToolbarToggle active={mode === "list"} onClick={() => setMode("list")} icon={<ListIcon className="h-3.5 w-3.5" />} label="List view" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto thin-scrollbar p-5">
        {mode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
            ))}
          </div>
        ) : (
          <ul className="divide-y divide-foreground/10">
            {projects.map((p, i) => (
              <ProjectRow key={p.id} project={p} index={i} onOpen={() => setSelected(p)} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ToolbarToggle({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex items-center justify-center rounded px-2 py-1 text-foreground/70 transition-colors ${
        active ? "bg-background text-foreground window-shadow" : "hover:bg-foreground/10"
      }`}
    >
      {icon}
    </button>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectConfig;
  index: number;
  onOpen: () => void;
}) {
  const Icon = PROJECT_ICONS[project.icon] ?? Compass;
  const accent = ACCENT_CLASSES[project.accent];
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index, duration: 0.35 }}
      whileHover={{ y: -2 }}
      onClick={onOpen}
      className="group flex flex-col items-start rounded-xl border border-foreground/10 bg-background/40 p-4 text-left transition-all hover:border-foreground/25 hover:bg-background/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex w-full items-start gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-inner"
          style={{ background: accent.tile }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-[14.5px] font-semibold text-foreground leading-tight">
              {project.name}
            </h4>
            <span
              className="shrink-0 rounded-full border border-foreground/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-foreground/55"
              title={`Built in ${project.year}`}
            >
              {project.year}
            </span>
          </div>
          <p className="mt-1 text-[11.5px] line-clamp-2 leading-relaxed text-foreground/60">
            {project.tagline}
          </p>
        </div>
      </div>
      <p className="mt-2.5 text-[12px] line-clamp-2 leading-relaxed text-foreground/70">
        {project.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {project.techStack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-md bg-foreground/[0.06] px-1.5 py-0.5 text-[10.5px] font-medium text-foreground/65"
          >
            {t}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="rounded-md bg-foreground/[0.06] px-1.5 py-0.5 text-[10.5px] font-medium text-foreground/55">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>
    </motion.button>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: ProjectConfig;
  index: number;
  onOpen: () => void;
}) {
  const Icon = PROJECT_ICONS[project.icon] ?? Compass;
  const accent = ACCENT_CLASSES[project.accent];
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.3 }}
    >
      <button
        onClick={onOpen}
        className="flex w-full items-center gap-3 px-2 py-2.5 rounded-md text-left hover:bg-foreground/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
          style={{ background: accent.tile }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-medium text-foreground">
            {project.name}
            <span className="ml-1.5 text-[10.5px] font-normal text-foreground/45">
              · {project.year}
            </span>
          </div>
          <div className="text-[11.5px] text-foreground/60 truncate">{project.tagline}</div>
        </div>
        <span className="hidden sm:flex flex-wrap gap-1 justify-end max-w-[40%]">
          {project.techStack.slice(0, 4).map((t) => (
            <span key={t} className="rounded bg-foreground/[0.05] px-1.5 py-0.5 text-[10px] text-foreground/55">
              {t}
            </span>
          ))}
        </span>
      </button>
    </motion.li>
  );
}

function ProjectDetail({
  project,
  onBack,
}: {
  project: ProjectConfig;
  onBack: () => void;
}) {
  const Icon = PROJECT_ICONS[project.icon] ?? Compass;
  const accent = ACCENT_CLASSES[project.accent];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-foreground/10 px-4 py-2 bg-foreground/[0.03]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12.5px] text-foreground/75 hover:bg-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Back to all projects"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Projects
        </button>
      </div>
      <div className="flex-1 overflow-y-auto thin-scrollbar p-6">
        <div className="flex items-start gap-4">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white shadow-inner"
            style={{ background: accent.tile }}
          >
            <Icon className="h-8 w-8" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-2xl text-foreground leading-tight">
                {project.name}
              </h2>
              <span className="rounded-full border border-foreground/15 px-2 py-0.5 text-[11px] font-medium text-foreground/60">
                {project.year}
              </span>
            </div>
            <p className={`text-[13px] mt-1 ${accent.text} font-medium`}>{project.tagline}</p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/55 mb-2">
              Overview
            </h4>
            <p className="text-[13.5px] leading-relaxed text-foreground/80">
              {project.description}
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/55 mb-2">
              How it works
            </h4>
            <p className="text-[13.5px] leading-relaxed text-foreground/80">
              {project.longDescription}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/55 mb-2">
              Key features
            </h4>
            <ul className="space-y-1.5">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7B8E70]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-foreground/55 mb-2">
              Tech stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-foreground/[0.07] px-2.5 py-1 text-[12px] font-medium text-foreground/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <ProjectLink href={project.github} label="GitHub Repository" icon={<Github className="h-3.5 w-3.5" />} placeholder={project.placeholderNote} />
            {project.demo && (
              <ProjectLink href={project.demo} label="Live Demo" icon={<ExternalLink className="h-3.5 w-3.5" />} />
            )}
          </div>

          {project.placeholderNote && (!project.github || project.github === "https://github.com/") && (
            <p className="rounded-md bg-amber-500/10 px-3 py-2 text-[11.5px] text-amber-700 dark:text-amber-300 border border-amber-500/20">
              {project.placeholderNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectLink({
  href,
  label,
  icon,
  placeholder,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  placeholder?: string;
}) {
  // If href is a placeholder, render disabled with a hint.
  const isPlaceholder = !href || href === "https://github.com/";
  if (isPlaceholder) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-3 py-1.5 text-[12px] text-foreground/40 cursor-not-allowed"
        title={placeholder ?? "Link not configured"}
      >
        {icon}
        {label}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-[12px] text-background font-medium hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {icon}
      {label}
    </a>
  );
}
