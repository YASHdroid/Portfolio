"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeScreen } from "@/components/desktop/WelcomeScreen";
import { Desktop } from "@/components/desktop/Desktop";
import { usePreferences } from "@/store/preferences";

type Phase = "intro" | "transition" | "desktop";

export default function Home() {
  const { markIntroSeen, replayIntro } = usePreferences();
  // Always start with the intro for the first paint, then skip on revisits.
  const [phase, setPhase] = useState<Phase>("intro");
  // Bumped every time the intro is replayed so WelcomeScreen remounts
  // and the boot sequence + greeting start from the beginning.
  const [introKey, setIntroKey] = useState(0);

  // Returning visitors go straight to the desktop — the cinematic intro
  // plays on the first visit, and again any time via Portfolio → Replay
  // Intro. Runs once on mount so it never fights the enter/replay flows.
  useEffect(() => {
    if (usePreferences.getState().introSeen) {
      const t = setTimeout(() => setPhase("desktop"), 50);
      return () => clearTimeout(t);
    }
  }, []);

  const handleEnter = useCallback(() => {
    setPhase("transition");
    // Wait for exit animation to play before swapping in the desktop.
    setTimeout(() => {
      markIntroSeen();
      setPhase("desktop");
    }, 850);
  }, [markIntroSeen]);

  const handleReplayIntro = useCallback(() => {
    replayIntro();
    setIntroKey((k) => k + 1);
    setPhase("intro");
  }, [replayIntro]);

  return (
    <main className="relative h-[100dvh] w-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {phase !== "desktop" && (
          <WelcomeScreen key={`intro-${introKey}`} onEnter={handleEnter} />
        )}
      </AnimatePresence>

      {phase === "desktop" && (
        <Desktop onReplayIntro={handleReplayIntro} />
      )}
    </main>
  );
}
