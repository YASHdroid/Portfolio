"use client";

import { useEffect, useRef } from "react";
import { usePreferences } from "@/store/preferences";

/**
 * Global background soundtrack for the desktop.
 *
 * The <audio> element lives here and keeps looping across windows,
 * spotlights and theme switches. Playback begins the moment the desktop
 * mounts — the "Enter My World" click provides the user gesture browsers
 * require for audio. The menu-bar speaker icon toggles `musicEnabled`,
 * which is persisted with the rest of the desktop preferences.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicEnabled = usePreferences((s) => s.musicEnabled);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Calm background level — noticeable but never louder than the UI.
    audio.volume = 0.35;

    if (!musicEnabled) {
      audio.pause();
      return;
    }

    let cancelled = false;
    // Browsers block play() until there is a user gesture (e.g. a
    // returning visitor who lands straight on the desktop). Retry on
    // the first pointer/key interaction, which unlocks audio playback.
    const unlock = () => {
      if (!cancelled) {
        audio.play().catch(() => {});
      }
    };

    audio.play().catch(() => {
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("keydown", unlock, { once: true });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [musicEnabled]);

  return (
    <audio
      ref={audioRef}
      src="/music/on-my-way.mp3"
      loop
      preload="auto"
      className="hidden"
      aria-hidden="true"
    />
  );
}
