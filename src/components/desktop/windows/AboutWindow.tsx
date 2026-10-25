"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Brain, Code2, Trophy } from "lucide-react";
import { profile, achievements } from "@/lib/portfolio-config";
import { WindowBody, SectionTitle } from "./shared";

export function AboutWindow() {
  return (
    <WindowBody className="space-y-7">
      {/* Header */}
      <div className="flex items-start gap-5">
        <Avatar />
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-2xl text-foreground leading-tight">
            {profile.name}
          </h2>
          <p className="text-[13px] text-foreground/65 mt-0.5">{profile.role}</p>
          <p className="text-[12px] text-foreground/50 mt-0.5">
            {profile.location} · {profile.education.institution}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Pill icon={<Brain className="h-3 w-3" />}>AI / ML</Pill>
            <Pill icon={<Code2 className="h-3 w-3" />}>Full-Stack</Pill>
            <Pill icon={<Sparkles className="h-3 w-3" />}>RAG</Pill>
          </div>
        </div>
      </div>

      <p className="text-[14px] leading-relaxed text-foreground/80">
        {profile.about.intro}
      </p>

      <div>
        <SectionTitle>What I'm Exploring</SectionTitle>
        <ul className="space-y-2">
          {profile.about.exploring.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[13.5px] text-foreground/80">
              <Compass className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7B8E70]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <SectionTitle>Interests</SectionTitle>
        <div className="flex flex-wrap gap-1.5">
          {profile.about.interests.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-foreground/[0.06] px-3 py-1 text-[12px] text-foreground/75"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Developer Philosophy</SectionTitle>
        <blockquote className="border-l-2 border-accent pl-4 text-[14px] italic text-foreground/75 font-serif leading-relaxed">
          {profile.about.philosophy}
        </blockquote>
      </div>

      <div>
        <SectionTitle>
          <span className="inline-flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5" />
            Achievements
          </span>
        </SectionTitle>
        <ul className="space-y-2.5">
          {achievements.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              className="flex items-start gap-2.5"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C98C8C]" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="text-[13.5px] font-medium text-foreground">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-foreground/55 font-mono">
                    {item.year}
                  </span>
                </div>
                <p className="text-[12.5px] text-foreground/70 mt-0.5 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <div>
        <SectionTitle>Journey</SectionTitle>
        <ol className="relative border-l border-foreground/15 pl-5 space-y-4">
          {profile.about.journey.map((item, i) => (
            <motion.li
              key={`${item.year}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
              className="relative"
            >
              <span className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-background" />
              <div className="text-[11px] uppercase tracking-wider text-foreground/55">
                {item.year}
              </div>
              <div className="text-[14px] font-medium text-foreground mt-0.5">
                {item.title}
              </div>
              <p className="text-[12.5px] text-foreground/70 mt-1 leading-relaxed">
                {item.detail}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </WindowBody>
  );
}

function Avatar() {
  return (
    <div className="relative shrink-0">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl text-white font-serif text-2xl shadow-inner"
        style={{
          background:
            "linear-gradient(150deg, #5C547A 0%, #20243A 100%)",
        }}
      >
        YC
      </div>
      <span
        className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7B8E70] text-white"
        title="Available for collaboration"
      >
        <span className="h-2 w-2 rounded-full bg-white" />
      </span>
    </div>
  );
}

function Pill({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-foreground/[0.08] px-2.5 py-1 text-[11.5px] font-medium text-foreground/80">
      {icon}
      {children}
    </span>
  );
}
