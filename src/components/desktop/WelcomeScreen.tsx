"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const GREETING = [
  { text: "Hello.", emphasis: false },
  { text: "Namaste.", emphasis: false },
  { text: "I'm Yash Chopra.", emphasis: true },
];

export function WelcomeScreen({ onEnter }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);
  const [bootDone, setBootDone] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const reduceMotion = useReducedMotion();

  // Boot sequence, then reveal greeting words one at a time.
  useEffect(() => {
    if (reduceMotion) {
      // Syncing to the user's reduced-motion preference — the lint rule
      // about cascading renders doesn't apply to this external-system sync.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBootDone(true);
      setStep(GREETING.length);
      setShowButton(true);
      return;
    }
    const bootTimer = setTimeout(() => setBootDone(true), 1400);
    return () => clearTimeout(bootTimer);
  }, [reduceMotion]);

  useEffect(() => {
    if (!bootDone) return;
    if (step >= GREETING.length) {
      const t = setTimeout(() => setShowButton(true), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 700 : 900);
    return () => clearTimeout(t);
  }, [bootDone, step]);

  const handleEnter = useCallback(() => {
    onEnter();
  }, [onEnter]);

  const handleSkip = useCallback(() => {
    setStep(GREETING.length);
    setShowButton(true);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #2A2E4A 0%, #20243A 45%, #15182B 100%)",
      }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Subtle ambient glow */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(220,214,247,0.25) 0%, transparent 45%), radial-gradient(circle at 70% 65%, rgba(184,199,176,0.18) 0%, transparent 50%)",
        }}
        animate={reduceMotion ? undefined : { opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Skip button */}
      {!showButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={handleSkip}
          className="absolute top-6 right-6 text-xs uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-md px-3 py-1.5"
          aria-label="Skip intro"
        >
          Skip intro
        </motion.button>
      )}

      {/* Boot sequence — soft ring mark filling up like a system boot */}
      <AnimatePresence>
        {!bootDone && (
          <motion.div
            className="flex flex-col items-center gap-6"
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
          >
            <BootMark />
            <div className="h-[3px] w-44 overflow-hidden rounded-full bg-white/12">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#DCD6F7] via-white/80 to-[#B8C7B0]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              />
            </div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">
              Warming up the desktop
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting */}
      {bootDone && (
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <div className="min-h-[8rem] md:min-h-[10rem] flex flex-col items-center justify-center">
            <AnimatePresence mode="popLayout">
              {GREETING.slice(0, step).map((line, i) => (
                <motion.div
                  key={line.text}
                  layout
                  initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i === 0 ? 0 : 0.05,
                  }}
                  className={
                    line.emphasis
                      ? "font-serif italic text-4xl md:text-6xl text-white tracking-tight"
                      : "font-serif text-2xl md:text-3xl text-white/75 tracking-wide"
                  }
                >
                  {line.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-8"
              >
                <p className="mt-3 text-sm md:text-base text-white/65 font-sans tracking-wide max-w-md">
                  I build intelligent things for the web and beyond.
                </p>
                <EnterButton onClick={handleEnter} reduceMotion={!!reduceMotion} />
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  A portfolio you can open like a computer
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

function EnterButton({
  onClick,
  reduceMotion,
}: {
  onClick: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-7 py-3 text-sm font-medium text-white backdrop-blur-md hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      {/* Soft glow */}
      <span
        className="pointer-events-none absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
        style={{
          background:
            "radial-gradient(circle, rgba(220,214,247,0.55) 0%, transparent 70%)",
        }}
      />
      <span>Enter My World</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

/** Small custom mark — not Apple's logo — a soft circular ring. */
function BootMark() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="28"
          cy="28"
          r="22"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.5"
        />
        <motion.circle
          cx="28"
          cy="28"
          r="22"
          stroke="#DCD6F7"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="138"
          strokeDashoffset="138"
          animate={{ strokeDashoffset: [138, 0] }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          transform="rotate(-90 28 28)"
        />
        <circle cx="28" cy="28" r="5" fill="#DCD6F7" />
      </svg>
    </motion.div>
  );
}
