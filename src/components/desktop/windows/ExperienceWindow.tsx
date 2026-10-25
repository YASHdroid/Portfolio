"use client";

import { motion } from "framer-motion";
import { Briefcase, FolderGit2, Users } from "lucide-react";
import { experience } from "@/lib/portfolio-config";
import { WindowBody, SectionTitle } from "./shared";
import type { ExperienceItem } from "@/lib/types";

const GROUPS: { type: ExperienceItem["type"]; label: string; icon: React.ReactNode }[] = [
  { type: "professional", label: "Professional Experience", icon: <Briefcase className="h-3.5 w-3.5" /> },
  { type: "project", label: "Project-Based Engineering", icon: <FolderGit2 className="h-3.5 w-3.5" /> },
  { type: "activity", label: "Activities & Community", icon: <Users className="h-3.5 w-3.5" /> },
];

export function ExperienceWindow() {
  return (
    <WindowBody className="space-y-6">
      <div>
        <p className="text-[14px] leading-relaxed text-foreground/80">
          A chronologically grouped view of how I spend my time building and
          learning. Since verified professional roles aren't listed here yet,
          this view clearly separates personal projects from campus and
          community activity — nothing invented.
        </p>
      </div>

      {GROUPS.map((group) => {
        const items = experience.filter((i) => i.type === group.type);
        if (items.length === 0) return null;
        return (
          <div key={group.type}>
            <SectionTitle>
              <span className="inline-flex items-center gap-1.5">
                {group.icon}
                {group.label}
              </span>
            </SectionTitle>
            <ol className="relative border-l border-foreground/15 pl-5 space-y-4">
              {items.map((item, i) => (
                <motion.li
                  key={`${item.title}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="relative"
                >
                  <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-background" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h4 className="text-[14px] font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <span className="text-[11.5px] text-foreground/55 font-mono">
                      {item.period}
                    </span>
                  </div>
                  <div className="text-[12.5px] text-foreground/65 mt-0.5">
                    {item.org}
                  </div>
                  <p className="text-[13px] text-foreground/75 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        );
      })}
    </WindowBody>
  );
}
