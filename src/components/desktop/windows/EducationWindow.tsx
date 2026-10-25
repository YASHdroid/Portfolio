"use client";

import { GraduationCap, MapPin, CalendarDays, BookOpen } from "lucide-react";
import { profile } from "@/lib/portfolio-config";
import { WindowBody, SectionTitle } from "./shared";

export function EducationWindow() {
  const { education } = profile;
  return (
    <WindowBody className="space-y-6">
      <div className="flex items-start gap-4">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-inner"
          style={{ background: "linear-gradient(160deg, #C98C8C 0%, #8E5F5F 100%)" }}
        >
          <GraduationCap className="h-7 w-7" strokeWidth={1.6} />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-xl text-foreground leading-tight">
            {education.degree}
          </h2>
          <p className="text-[13.5px] text-foreground/75 mt-1">
            {education.institution}
          </p>
          <div className="mt-2 flex flex-wrap gap-3 text-[12px] text-foreground/60">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {education.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {education.startYear} – {education.endYear}
            </span>
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            Coursework & Highlights
          </span>
        </SectionTitle>
        <p className="text-[13.5px] leading-relaxed text-foreground/80">
          {education.details}
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-foreground/20 bg-foreground/[0.025] px-4 py-3 text-[12px] text-foreground/60">
        <strong className="text-foreground/75">Editable:</strong>{" "}
        GPA, specific coursework list, and academic honors can be added to{" "}
        <code className="font-mono text-foreground/70">src/lib/portfolio-config.ts</code>{" "}
        once available. Nothing is invented here.
      </div>
    </WindowBody>
  );
}
