"use client";

import { motion } from "framer-motion";
import {
  Braces,
  LayoutDashboard,
  Server,
  BrainCircuit,
  BookOpen,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/lib/portfolio-config";
import { WindowBody } from "./shared";

const ICONS: Record<string, LucideIcon> = {
  braces: Braces,
  layoutDashboard: LayoutDashboard,
  server: Server,
  brainCircuit: BrainCircuit,
  bookOpen: BookOpen,
  wrench: Wrench,
};

export function SkillsWindow() {
  return (
    <WindowBody>
      <p className="text-[13.5px] text-foreground/70 mb-5 leading-relaxed">
        Skills grouped the way I actually use them. Proficiency indicators
        reflect familiarity based on real project work — no arbitrary
        percentages.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skillCategories.map((cat, i) => {
          const Icon = ICONS[cat.icon] ?? Braces;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              className="rounded-xl border border-foreground/10 bg-foreground/[0.025] p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/70 text-foreground">
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </span>
                <h4 className="text-[13px] font-semibold text-foreground">
                  {cat.name}
                </h4>
              </div>
              <ul className="space-y-2">
                {cat.skills.map((s) => (
                  <li key={s.name} className="flex items-baseline justify-between gap-3">
                    <span className="text-[13px] text-foreground/85 font-medium">
                      {s.name}
                    </span>
                    <span className="text-[11.5px] text-foreground/55 text-right">
                      {s.note}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </WindowBody>
  );
}
