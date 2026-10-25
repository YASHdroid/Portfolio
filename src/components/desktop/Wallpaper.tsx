"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { WallpaperId } from "@/lib/types";

interface WallpaperProps {
  wallpaper: WallpaperId;
}

/**
 * SVG-based wallpapers — no external asset loading required.
 * Each wallpaper is a soft, atmospheric scene built from layered
 * gradients and abstract shapes, themed to the portfolio palette.
 *
 * All wallpapers include subtle ambient motion via CSS animation
 * applied to inner groups. Motion is purely decorative and respects
 * `prefers-reduced-motion` via the global CSS rule.
 */
export function Wallpaper({ wallpaper }: WallpaperProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={wallpaper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <WallpaperLayer id={wallpaper} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WallpaperLayer({ id }: { id: WallpaperId }) {
  switch (id) {
    case "lavender-dusk":
      return <LavenderDusk />;
    case "sage-mist":
      return <SageMist />;
    case "rose-bloom":
      return <RoseBloom />;
    case "navy-night":
      return <NavyNight />;
  }
}

/* ----------------------------------------------------------------
 * Caption — an editorial quote rendered on the wallpaper.
 * Each wallpaper carries its own mood-matched quote with a text
 * color tuned to contrast with that specific scene. Cross-fades
 * with the wallpaper switch and is purely decorative (pointer
 * events off).
 * ---------------------------------------------------------------- */
function Caption({
  lines,
  color,
  glow,
}: {
  lines: string[];
  color: string;
  glow: string;
}) {
  const [first, ...rest] = lines;
  return (
    <div
      className="pointer-events-none absolute bottom-24 left-5 sm:bottom-28 sm:left-10 z-10 max-w-[220px] sm:max-w-xs select-none"
      style={{ color }}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif italic text-lg sm:text-2xl leading-snug"
        style={{ textShadow: glow }}
      >
        {first}
      </motion.p>
      <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-1.5">
        {rest.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.65 + i * 0.12,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[11px] sm:text-[13px] leading-relaxed font-sans opacity-85"
            style={{ textShadow: glow }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
 * 1. Lavender Dusk — soft lavender sky, layered misty mountains,
 *    a glowing orb, drifting clouds, and tiny foreground stars.
 * ---------------------------------------------------------------- */
function LavenderDusk() {
  return (
    <div className="absolute inset-0">
      <LavenderDuskScene />
      <Caption
        lines={[
          "“The best way to predict the future is to invent it.”",
          "— Alan Kay",
        ]}
        color="#F7F4EC"
        glow="0 1px 14px rgba(42,40,72,0.85), 0 0 2px rgba(42,40,72,0.7)"
      />
    </div>
  );
}

function LavenderDuskScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ld-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9C0EE" />
          <stop offset="35%" stopColor="#DCD6F7" />
          <stop offset="65%" stopColor="#E8E0F5" />
          <stop offset="100%" stopColor="#F5F1E8" />
        </linearGradient>
        <radialGradient id="ld-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="40%" stopColor="#F5F1E8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#DCD6F7" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ld-haze" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ld-mountain1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8B0D9" />
          <stop offset="100%" stopColor="#9E94C2" />
        </linearGradient>
        <linearGradient id="ld-mountain2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B7299" />
          <stop offset="100%" stopColor="#5C547A" />
        </linearGradient>
        <linearGradient id="ld-mountain3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3D5C" />
          <stop offset="100%" stopColor="#20243A" />
        </linearGradient>
        <linearGradient id="ld-cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
        </linearGradient>
        <filter id="ld-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="ld-blur-lg" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="1440" height="900" fill="url(#ld-sky)" />

      {/* Soft atmospheric color blobs */}
      <g filter="url(#ld-blur-lg)" opacity="0.7">
        <ellipse cx="1100" cy="260" rx="280" ry="180" fill="#DCD6F7" />
        <ellipse cx="300" cy="200" rx="220" ry="140" fill="#D9A5A5" opacity="0.45" />
        <ellipse cx="720" cy="120" rx="320" ry="80" fill="#FFFFFF" opacity="0.7" />
        <ellipse cx="200" cy="450" rx="260" ry="100" fill="#DCD6F7" opacity="0.35" />
        <ellipse cx="1240" cy="430" rx="220" ry="80" fill="#FFFFFF" opacity="0.4" />
      </g>

      {/* Drifting clouds */}
      <g filter="url(#ld-blur)" opacity="0.85" style={{ animation: "wallpaper-drift 22s ease-in-out infinite" }}>
        <ellipse cx="240" cy="220" rx="120" ry="22" fill="url(#ld-cloud)" />
        <ellipse cx="280" cy="232" rx="80" ry="16" fill="url(#ld-cloud)" />
        <ellipse cx="960" cy="180" rx="160" ry="26" fill="url(#ld-cloud)" />
        <ellipse cx="1010" cy="195" rx="100" ry="18" fill="url(#ld-cloud)" />
        <ellipse cx="640" cy="280" rx="180" ry="20" fill="url(#ld-cloud)" opacity="0.7" />
      </g>

      {/* Sun / moon orb with halo */}
      <circle cx="1080" cy="290" r="240" fill="url(#ld-haze)" />
      <circle cx="1080" cy="290" r="180" fill="url(#ld-orb)" />
      <circle cx="1080" cy="290" r="46" fill="#FFFFFF" opacity="0.96" />

      {/* Stars / sparkles in upper sky */}
      <g opacity="0.55" fill="#FFFFFF">
        <circle cx="180" cy="120" r="1.2" />
        <circle cx="460" cy="80" r="1.5" />
        <circle cx="620" cy="170" r="0.9" />
        <circle cx="780" cy="60" r="1" />
        <circle cx="900" cy="60" r="1.2" />
        <circle cx="1300" cy="110" r="1.3" />
        <circle cx="1180" cy="40" r="1" />
        <circle cx="380" cy="180" r="0.8" />
        <circle cx="540" cy="220" r="0.7" />
      </g>

      {/* Misty mountain layers, back to front */}
      <path
        d="M0,580 Q160,500 320,540 T620,520 Q780,490 960,520 T1280,510 L1440,520 L1440,900 L0,900 Z"
        fill="url(#ld-mountain1)"
        opacity="0.65"
      />
      <path
        d="M0,660 Q200,600 420,620 T820,610 Q1020,580 1240,610 L1440,605 L1440,900 L0,900 Z"
        fill="url(#ld-mountain2)"
        opacity="0.85"
      />
      <path
        d="M0,750 Q260,690 520,720 T1020,710 Q1240,680 1440,710 L1440,900 L0,900 Z"
        fill="url(#ld-mountain3)"
      />

      {/* Foreground pine silhouettes for depth */}
      <g fill="#15182B" opacity="0.85">
        <polygon points="120,820 100,760 140,760" />
        <polygon points="150,810 132,740 168,740" />
        <polygon points="180,820 162,770 198,770" />
        <polygon points="1320,820 1300,750 1340,750" />
        <polygon points="1350,810 1332,740 1368,740" />
        <polygon points="1380,820 1362,770 1398,770" />
      </g>

      {/* Soft horizon haze */}
      <rect x="0" y="540" width="1440" height="80" fill="url(#ld-haze)" opacity="0.5" />
    </svg>
  );
}

/* ----------------------------------------------------------------
 * 2. Sage Mist — muted sage meadow with rolling hills, drifting
 *    fog, a low sun, and tall grass in the foreground.
 * ---------------------------------------------------------------- */
function SageMist() {
  return (
    <div className="absolute inset-0">
      <SageMistScene />
      <Caption
        lines={[
          "“Simplicity is the ultimate sophistication.”",
          "— Leonardo da Vinci",
        ]}
        color="#F4F6EE"
        glow="0 1px 14px rgba(34,44,32,0.85), 0 0 2px rgba(34,44,32,0.7)"
      />
    </div>
  );
}

function SageMistScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDF2E6" />
          <stop offset="40%" stopColor="#D5DDC9" />
          <stop offset="80%" stopColor="#B8C7B0" />
          <stop offset="100%" stopColor="#9CAD92" />
        </linearGradient>
        <radialGradient id="sm-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#F5F1E8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#B8C7B0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sm-haze" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sm-hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9CAD92" />
          <stop offset="100%" stopColor="#7B8E70" />
        </linearGradient>
        <linearGradient id="sm-hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5E7058" />
          <stop offset="100%" stopColor="#3D4D3A" />
        </linearGradient>
        <linearGradient id="sm-fog" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="sm-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="sm-blur-lg" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#sm-sky)" />

      {/* Atmospheric blobs */}
      <g filter="url(#sm-blur-lg)" opacity="0.7">
        <ellipse cx="320" cy="260" rx="320" ry="160" fill="#FFFFFF" opacity="0.75" />
        <ellipse cx="1080" cy="220" rx="260" ry="140" fill="#DCD6F7" opacity="0.35" />
        <ellipse cx="760" cy="340" rx="380" ry="80" fill="#FFFFFF" opacity="0.5" />
        <ellipse cx="1200" cy="420" rx="220" ry="60" fill="#FFFFFF" opacity="0.4" />
        <ellipse cx="120" cy="400" rx="200" ry="60" fill="#FFFFFF" opacity="0.4" />
      </g>

      {/* Drifting fog layers */}
      <g filter="url(#sm-blur)" opacity="0.7" style={{ animation: "wallpaper-drift 26s ease-in-out infinite" }}>
        <ellipse cx="360" cy="500" rx="240" ry="22" fill="url(#sm-fog)" />
        <ellipse cx="900" cy="470" rx="320" ry="28" fill="url(#sm-fog)" />
        <ellipse cx="1240" cy="520" rx="200" ry="20" fill="url(#sm-fog)" />
      </g>

      {/* Sun / soft orb */}
      <circle cx="380" cy="220" r="180" fill="url(#sm-haze)" />
      <circle cx="380" cy="220" r="130" fill="url(#sm-orb)" />
      <circle cx="380" cy="220" r="34" fill="#FFFFFF" opacity="0.92" />

      {/* Tiny birds in the distance */}
      <g stroke="#3D4D3A" strokeWidth="1.4" fill="none" opacity="0.55">
        <path d="M 720 180 q 6 -6 12 0 q 6 -6 12 0" />
        <path d="M 760 200 q 5 -5 10 0 q 5 -5 10 0" />
        <path d="M 800 175 q 5 -5 10 0 q 5 -5 10 0" />
      </g>

      {/* Rolling hills back to front */}
      <path
        d="M0,560 Q220,500 460,540 T880,520 Q1120,500 1440,540 L1440,900 L0,900 Z"
        fill="url(#sm-hill1)"
        opacity="0.75"
      />
      <path
        d="M0,660 Q260,620 540,640 T1080,640 Q1280,620 1440,650 L1440,900 L0,900 Z"
        fill="url(#sm-hill1)"
      />
      <path
        d="M0,740 Q260,690 540,720 T1080,710 Q1280,690 1440,720 L1440,900 L0,900 Z"
        fill="url(#sm-hill2)"
      />

      {/* Foreground grass tufts */}
      <g opacity="0.55" stroke="#2A3528" strokeWidth="1.4" fill="none">
        {Array.from({ length: 48 }).map((_, i) => {
          const x = (i * 1440) / 48 + 6;
          const y = 770 + (i % 4) * 4;
          const lean = i % 2 === 0 ? 1 : -1;
          return (
            <path key={i} d={`M${x},${y} q${2 * lean},-12 ${4 * lean},-18 M${x},${y} q${-3 * lean},-10 ${-5 * lean},-16 M${x},${y} q${5 * lean},-8 ${7 * lean},-12`} />
          );
        })}
      </g>

      {/* A single foreground flower */}
      <g transform="translate(1200, 780)">
        <line x1="0" y1="0" x2="0" y2="40" stroke="#3D4D3A" strokeWidth="1.4" />
        <circle cx="0" cy="-3" r="4" fill="#D9A5A5" />
        <circle cx="0" cy="-3" r="1.5" fill="#FFFFFF" />
      </g>
      <g transform="translate(180, 800)">
        <line x1="0" y1="0" x2="0" y2="36" stroke="#3D4D3A" strokeWidth="1.4" />
        <circle cx="0" cy="-3" r="3.5" fill="#DCD6F7" />
        <circle cx="0" cy="-3" r="1.3" fill="#FFFFFF" />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------
 * 3. Rose Bloom — dusty rose dawn over abstract flowing waves,
 *    soft sun, drifting petals, and a layered foreground.
 * ---------------------------------------------------------------- */
function RoseBloom() {
  return (
    <div className="absolute inset-0">
      <RoseBloomScene />
      <Caption
        lines={[
          "“The only way to do great work is to love what you do.”",
          "— Steve Jobs",
        ]}
        color="#FBF1EF"
        glow="0 1px 14px rgba(66,32,36,0.8), 0 0 2px rgba(66,32,36,0.65)"
      />
    </div>
  );
}

function RoseBloomScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F4E8E8" />
          <stop offset="40%" stopColor="#E8C9C9" />
          <stop offset="75%" stopColor="#D9A5A5" />
          <stop offset="100%" stopColor="#C98C8C" />
        </linearGradient>
        <radialGradient id="rb-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="50%" stopColor="#FFE8E8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D9A5A5" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rb-haze" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rb-flow1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C98C8C" />
          <stop offset="100%" stopColor="#8E5F5F" />
        </linearGradient>
        <linearGradient id="rb-flow2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5C3D3D" />
          <stop offset="100%" stopColor="#20243A" />
        </linearGradient>
        <linearGradient id="rb-cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.25" />
        </linearGradient>
        <filter id="rb-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="rb-blur-lg" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#rb-sky)" />

      {/* Atmospheric color blobs */}
      <g filter="url(#rb-blur-lg)" opacity="0.75">
        <ellipse cx="700" cy="260" rx="360" ry="180" fill="#FFFFFF" opacity="0.6" />
        <ellipse cx="1100" cy="180" rx="240" ry="120" fill="#DCD6F7" opacity="0.4" />
        <ellipse cx="220" cy="340" rx="320" ry="100" fill="#FFFFFF" opacity="0.45" />
        <ellipse cx="1240" cy="430" rx="220" ry="80" fill="#FFFFFF" opacity="0.35" />
      </g>

      {/* Drifting clouds */}
      <g filter="url(#rb-blur)" opacity="0.85" style={{ animation: "wallpaper-drift 24s ease-in-out infinite" }}>
        <ellipse cx="280" cy="220" rx="140" ry="22" fill="url(#rb-cloud)" />
        <ellipse cx="340" cy="238" rx="100" ry="16" fill="url(#rb-cloud)" />
        <ellipse cx="1080" cy="180" rx="170" ry="26" fill="url(#rb-cloud)" />
        <ellipse cx="1130" cy="198" rx="110" ry="18" fill="url(#rb-cloud)" />
        <ellipse cx="640" cy="300" rx="200" ry="20" fill="url(#rb-cloud)" opacity="0.65" />
      </g>

      {/* Sun with halo */}
      <circle cx="720" cy="300" r="260" fill="url(#rb-haze)" />
      <circle cx="720" cy="300" r="200" fill="url(#rb-orb)" />
      <circle cx="720" cy="300" r="54" fill="#FFFFFF" opacity="0.96" />

      {/* Soft light rays from the sun */}
      <g opacity="0.25" filter="url(#rb-blur)">
        <polygon points="720,300 540,900 580,900" fill="#FFFFFF" />
        <polygon points="720,300 880,900 920,900" fill="#FFFFFF" />
        <polygon points="720,300 680,900 720,900" fill="#FFFFFF" opacity="0.7" />
      </g>

      {/* Flowing abstract waves back to front */}
      <path
        d="M0,620 C 200,560 360,640 540,600 C 720,560 880,660 1080,620 C 1240,590 1380,640 1440,620 L1440,900 L0,900 Z"
        fill="url(#rb-flow1)"
        opacity="0.75"
      />
      <path
        d="M0,700 C 240,660 420,720 620,700 C 820,680 980,740 1180,720 C 1300,710 1400,730 1440,720 L1440,900 L0,900 Z"
        fill="url(#rb-flow1)"
      />
      <path
        d="M0,780 C 240,750 420,800 620,780 C 820,760 980,810 1180,790 C 1300,780 1400,795 1440,785 L1440,900 L0,900 Z"
        fill="url(#rb-flow2)"
      />

      {/* Floating petals */}
      <g opacity="0.7" fill="#FFFFFF">
        <circle cx="200" cy="180" r="3" />
        <circle cx="500" cy="120" r="2" />
        <circle cx="980" cy="100" r="3" />
        <circle cx="1280" cy="180" r="2.5" />
        <circle cx="120" cy="320" r="2" />
        <circle cx="1340" cy="380" r="2.5" />
      </g>
      <g opacity="0.55" fill="#FFE8E8">
        <circle cx="360" cy="260" r="2.5" />
        <circle cx="1080" cy="240" r="2" />
        <circle cx="780" cy="180" r="2" />
      </g>

      {/* Horizon haze */}
      <rect x="0" y="560" width="1440" height="80" fill="url(#rb-haze)" opacity="0.4" />
    </svg>
  );
}

/* ----------------------------------------------------------------
 * 4. Navy Night — midnight navy abstract landscape with stars,
 *    aurora glow, a moon, shooting star, mountain layers, and
 *    tiny glowing town windows for depth.
 * ---------------------------------------------------------------- */
function NavyNight() {
  return (
    <div className="absolute inset-0">
      <NavyNightScene />
      <Caption
        lines={[
          "“We are all in the gutter, but some of us are looking at the stars.”",
          "— Oscar Wilde",
        ]}
        color="#E6E1F5"
        glow="0 1px 14px rgba(10,12,24,0.9), 0 0 2px rgba(10,12,24,0.8)"
      />
    </div>
  );
}

function NavyNightScene() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15182B" />
          <stop offset="40%" stopColor="#1A1D34" />
          <stop offset="75%" stopColor="#20243A" />
          <stop offset="100%" stopColor="#2C3050" />
        </linearGradient>
        <radialGradient id="nn-orb" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="40%" stopColor="#DCD6F7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#20243A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nn-haze" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#DCD6F7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#DCD6F7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nn-mountain1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3D5C" />
          <stop offset="100%" stopColor="#1A1D34" />
        </linearGradient>
        <linearGradient id="nn-mountain2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15182B" />
          <stop offset="100%" stopColor="#0A0C18" />
        </linearGradient>
        <linearGradient id="nn-aurora1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DCD6F7" stopOpacity="0" />
          <stop offset="50%" stopColor="#DCD6F7" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#DCD6F7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nn-aurora2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8C7B0" stopOpacity="0" />
          <stop offset="50%" stopColor="#B8C7B0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#B8C7B0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nn-aurora3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9A5A5" stopOpacity="0" />
          <stop offset="50%" stopColor="#D9A5A5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D9A5A5" stopOpacity="0" />
        </linearGradient>
        <filter id="nn-blur" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="nn-blur-lg" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#nn-sky)" />

      {/* Aurora bands across the sky */}
      <g filter="url(#nn-blur-lg)" opacity="0.7" style={{ animation: "wallpaper-drift 30s ease-in-out infinite" }}>
        <ellipse cx="400" cy="280" rx="380" ry="60" fill="url(#nn-aurora1)" />
        <ellipse cx="1100" cy="240" rx="320" ry="50" fill="url(#nn-aurora2)" />
        <ellipse cx="720" cy="340" rx="500" ry="40" fill="url(#nn-aurora3)" />
      </g>

      {/* Atmospheric color glow */}
      <g filter="url(#nn-blur-lg)" opacity="0.55">
        <ellipse cx="300" cy="200" rx="200" ry="120" fill="#DCD6F7" opacity="0.35" />
        <ellipse cx="1180" cy="180" rx="180" ry="100" fill="#B8C7B0" opacity="0.25" />
      </g>

      {/* Stars — denser, varied sizes, with a few brighter ones */}
      <g fill="#FFFFFF">
        {Array.from({ length: 90 }).map((_, i) => {
          const x = (i * 137.5) % 1440;
          const y = ((i * 89.3) % 540) + 20;
          const r = (i % 5 === 0 ? 1.6 : i % 3 === 0 ? 1.1 : 0.7) + (i % 7) * 0.08;
          const opacity = 0.4 + (i % 5) * 0.12;
          return <circle key={i} cx={x} cy={y} r={r} opacity={opacity} />;
        })}
      </g>

      {/* A few bright "sparkle" stars with cross flares */}
      <g opacity="0.95">
        <g transform="translate(220, 140)">
          <circle r="2" fill="#FFFFFF" />
          <path d="M -6 0 L 6 0 M 0 -6 L 0 6" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.6" />
        </g>
        <g transform="translate(880, 80)">
          <circle r="2.2" fill="#FFFFFF" />
          <path d="M -7 0 L 7 0 M 0 -7 L 0 7" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.65" />
        </g>
        <g transform="translate(1280, 200)">
          <circle r="1.8" fill="#FFFFFF" />
          <path d="M -5 0 L 5 0 M 0 -5 L 0 5" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.6" />
        </g>
        <g transform="translate(540, 260)">
          <circle r="1.6" fill="#FFFFFF" />
          <path d="M -5 0 L 5 0 M 0 -5 L 0 5" stroke="#FFFFFF" strokeWidth="0.4" opacity="0.55" />
        </g>
      </g>

      {/* Shooting star */}
      <g opacity="0.85">
        <line x1="980" y1="120" x2="1080" y2="180" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="980" y1="120" x2="1040" y2="160" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <circle cx="1080" cy="180" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Moon with halo */}
      <circle cx="1080" cy="240" r="220" fill="url(#nn-haze)" />
      <circle cx="1080" cy="240" r="160" fill="url(#nn-orb)" />
      <circle cx="1080" cy="240" r="42" fill="#F5F1E8" opacity="0.96" />
      {/* Subtle moon craters */}
      <g fill="#20243A" opacity="0.18">
        <circle cx="1070" cy="232" r="6" />
        <circle cx="1090" cy="248" r="4" />
        <circle cx="1078" cy="252" r="3" />
      </g>

      {/* Mountain silhouettes back to front */}
      <path
        d="M0,600 Q180,500 360,540 T720,520 Q920,480 1140,520 T1440,500 L1440,900 L0,900 Z"
        fill="url(#nn-mountain1)"
        opacity="0.85"
      />
      <path
        d="M0,680 Q220,620 460,660 T880,650 Q1080,620 1300,660 L1440,650 L1440,900 L0,900 Z"
        fill="url(#nn-mountain1)"
      />
      <path
        d="M0,760 Q220,710 460,740 T880,730 Q1080,700 1300,740 L1440,730 L1440,900 L0,900 Z"
        fill="url(#nn-mountain2)"
      />

      {/* Tiny glowing town windows in the closest mountain village */}
      <g fill="#F5F1E8">
        <circle cx="320" cy="780" r="1.6" opacity="0.95" />
        <circle cx="346" cy="788" r="1.6" opacity="0.9" />
        <circle cx="372" cy="784" r="1.6" opacity="0.95" />
        <circle cx="334" cy="800" r="1.4" opacity="0.85" />
        <circle cx="360" cy="804" r="1.4" opacity="0.85" />
        <circle cx="780" cy="800" r="1.6" opacity="0.95" />
        <circle cx="808" cy="794" r="1.6" opacity="0.9" />
        <circle cx="794" cy="812" r="1.4" opacity="0.85" />
        <circle cx="822" cy="808" r="1.4" opacity="0.85" />
      </g>

      {/* A faint reflection of moon on the lower mountain slope */}
      <ellipse cx="1080" cy="780" rx="220" ry="14" fill="#DCD6F7" opacity="0.18" filter="url(#nn-blur)" />
    </svg>
  );
}

/** Static metadata used by the wallpaper switcher UI. */
export const WALLPAPERS: {
  id: WallpaperId;
  name: string;
  swatch: string[];
}[] = [
  { id: "lavender-dusk", name: "Lavender Dusk", swatch: ["#DCD6F7", "#E8E0F5", "#F5F1E8"] },
  { id: "sage-mist", name: "Sage Mist", swatch: ["#D5DDC9", "#9CAD92", "#3D4D3A"] },
  { id: "rose-bloom", name: "Rose Bloom", swatch: ["#E8C9C9", "#D9A5A5", "#8E5F5F"] },
  { id: "navy-night", name: "Navy Night", swatch: ["#20243A", "#3A3D5C", "#0A0C18"] },
];
