"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DesktopPreferences, ThemeMode, WallpaperId } from "@/lib/types";

/**
 * Wallpapers that are dark enough that the desktop should auto-pair
 * with dark mode so all foreground text stays readable. Picking one
 * of these will switch the theme to dark; picking any other wallpaper
 * switches back to light.
 */
const DARK_WALLPAPERS: WallpaperId[] = ["navy-night"];
const DEFAULT_LIGHT_WALLPAPER: WallpaperId = "lavender-dusk";

function themeForWallpaper(w: WallpaperId): ThemeMode {
  return DARK_WALLPAPERS.includes(w) ? "dark" : "light";
}

function isDarkWallpaper(w: WallpaperId): boolean {
  return DARK_WALLPAPERS.includes(w);
}

interface PreferencesState extends DesktopPreferences {
  /** Most recent daylight wallpaper — restored when returning to light mode. */
  lastLightWallpaper: WallpaperId;
  setWallpaper: (w: WallpaperId) => void;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  markIntroSeen: () => void;
  /** Show the cinematic greeting again on the next visit to the intro. */
  replayIntro: () => void;
  setMusicEnabled: (enabled: boolean) => void;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set, get) => ({
      wallpaper: "lavender-dusk",
      theme: "light",
      introSeen: false,
      // Background music is on by default; the menu-bar speaker toggles it.
      musicEnabled: true,
      lastLightWallpaper: DEFAULT_LIGHT_WALLPAPER,
      // Setting a wallpaper auto-pairs it with the right theme so text
      // is always readable on every wallpaper.
      setWallpaper: (wallpaper) => {
        const theme = themeForWallpaper(wallpaper);
        set({
          wallpaper,
          theme,
          // Remember the latest daylight wallpaper so switching the
          // theme back to light can restore it.
          ...(isDarkWallpaper(wallpaper)
            ? {}
            : { lastLightWallpaper: wallpaper }),
        });
      },
      // Dark mode IS night time: pairing the theme with the night
      // wallpaper turns the whole desktop nocturnal — wallpaper, window
      // glass, menu bar, dock and text all adjust together, instead of
      // only the header darkening over a daylight scene. Light mode
      // restores the last daylight wallpaper the user was on.
      setTheme: (theme) => {
        if (theme === "dark") {
          const current = get().wallpaper;
          const lastLight = isDarkWallpaper(current)
            ? get().lastLightWallpaper
            : current;
          set({
            theme,
            wallpaper: "navy-night",
            lastLightWallpaper: lastLight || DEFAULT_LIGHT_WALLPAPER,
          });
        } else {
          set({
            theme,
            wallpaper: get().lastLightWallpaper || DEFAULT_LIGHT_WALLPAPER,
          });
        }
      },
      toggleTheme: () =>
        get().setTheme(get().theme === "light" ? "dark" : "light"),
      markIntroSeen: () => set({ introSeen: true }),
      replayIntro: () => set({ introSeen: false }),
      setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
    }),
    {
      name: "yash-portfolio-preferences",
      // Only persist the serializable preferences.
      partialize: (state) => ({
        wallpaper: state.wallpaper,
        theme: state.theme,
        introSeen: state.introSeen,
        musicEnabled: state.musicEnabled,
        lastLightWallpaper: state.lastLightWallpaper,
      }),
      // On rehydration, sync theme with the persisted wallpaper in case
      // the user has an old preference saved from before auto-pairing.
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const expected = themeForWallpaper(state.wallpaper);
        if (state.theme !== expected) {
          state.theme = expected;
        }
        if (!state.lastLightWallpaper || isDarkWallpaper(state.lastLightWallpaper)) {
          state.lastLightWallpaper = DEFAULT_LIGHT_WALLPAPER;
        }
      },
    },
  ),
);
