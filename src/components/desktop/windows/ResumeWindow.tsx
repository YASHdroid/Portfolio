"use client";

import { Download, FileText, Info } from "lucide-react";
import { resume, profile } from "@/lib/portfolio-config";
import { WindowBody, SectionTitle } from "./shared";

export function ResumeWindow() {
  return (
    <div className="flex h-full flex-col">
      {/* Document-style toolbar */}
      <div className="flex items-center justify-between border-b border-foreground/10 bg-foreground/[0.03] px-4 py-2">
        <div className="text-[12px] text-foreground/65 font-mono truncate">
          {resume.fileUrl}
        </div>
        <div className="flex items-center gap-2">
          {resume.available ? (
            <a
              href={resume.fileUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[12px] font-medium text-background hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 rounded-md border border-foreground/15 px-3 py-1.5 text-[12px] text-foreground/45 cursor-not-allowed"
              title="Resume file not yet provided"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto thin-scrollbar bg-foreground/[0.02]">
        <div className="mx-auto my-5 max-w-[640px] rounded-md bg-background px-8 py-10 window-shadow">
          {/* Document header */}
          <div className="flex items-start justify-between border-b border-foreground/15 pb-5">
            <div>
              <h2 className="font-serif text-3xl text-foreground leading-tight">
                {profile.name}
              </h2>
              <p className="text-[13px] text-foreground/65 mt-1">
                {profile.role}
              </p>
              <p className="text-[12px] text-foreground/55 mt-0.5">
                {profile.location}
              </p>
            </div>
            <FileText className="h-8 w-8 text-foreground/30" />
          </div>

          {/* Summary */}
          <div className="mt-5">
            <SectionTitle>Summary</SectionTitle>
            <ul className="space-y-1.5">
              {resume.summary.map((s, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[13px] text-foreground/80 leading-relaxed"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sections */}
          {resume.sections.map((section) => (
            <div key={section.heading} className="mt-6">
              <SectionTitle>{section.heading}</SectionTitle>
              <ul className="space-y-1.5">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[13px] text-foreground/80 leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {!resume.available && (
          <div className="mx-auto mb-5 max-w-[640px] flex items-start gap-2 rounded-md bg-amber-500/10 border border-amber-500/25 px-4 py-2.5 text-[12px] text-amber-700 dark:text-amber-300">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{resume.placeholderNote}</span>
          </div>
        )}
      </div>
    </div>
  );
}
