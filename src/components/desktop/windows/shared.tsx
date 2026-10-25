"use client";

import type { ReactNode } from "react";

interface WindowBodyProps {
  children: ReactNode;
  className?: string;
}

/** Standard padded body inside a window. */
export function WindowBody({ children, className = "" }: WindowBodyProps) {
  return (
    <div className={`px-6 py-5 sm:px-7 sm:py-6 ${className}`}>
      {children}
    </div>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

export function SectionTitle({ children, className = "" }: SectionTitleProps) {
  return (
    <h3
      className={`text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/55 mb-3 ${className}`}
    >
      {children}
    </h3>
  );
}
