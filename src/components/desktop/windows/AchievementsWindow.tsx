"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "@/lib/portfolio-config";
import { WindowBody } from "./shared";

export function AchievementsWindow() {
  return (
    <WindowBody>
      <p className="text-[13.5px] text-foreground/70 mb-5 leading-relaxed">
        A focused list of what I've actually done — hackathon participation,
        shipped projects, and self-driven learning. No inflated claims.
      </p>
      <ol className="relative border-l border-foreground/15 pl-5 space-y-5">
        {achievements.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.07 * i, duration: 0.4 }}
            className="relative"
          >
            <span className="absolute -left-[1.65rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-accent ring-2 ring-background">
              <Trophy className="h-2 w-2 text-foreground/70" />
            </span>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h4 className="text-[14px] font-semibold text-foreground">
                {item.title}
              </h4>
              <span className="text-[11.5px] text-foreground/55 font-mono">
                {item.year}
              </span>
            </div>
            <p className="text-[13px] text-foreground/75 mt-1.5 leading-relaxed">
              {item.detail}
            </p>
          </motion.li>
        ))}
      </ol>
    </WindowBody>
  );
}
