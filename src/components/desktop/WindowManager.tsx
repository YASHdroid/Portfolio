"use client";

import { useWindowManager } from "@/store/window-manager";
import { DesktopWindow } from "./DesktopWindow";
import { AboutWindow } from "./windows/AboutWindow";
import { ExperienceWindow } from "./windows/ExperienceWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { SkillsWindow } from "./windows/SkillsWindow";
import { EducationWindow } from "./windows/EducationWindow";
import { AchievementsWindow } from "./windows/AchievementsWindow";
import { ResumeWindow } from "./windows/ResumeWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { TerminalWindow } from "./windows/TerminalWindow";
import { TrashWindow } from "./windows/TrashWindow";
import type { WindowId } from "@/lib/types";

function renderWindowContent(id: WindowId) {
  switch (id) {
    case "about":
      return <AboutWindow />;
    case "experience":
      return <ExperienceWindow />;
    case "projects":
      return <ProjectsWindow />;
    case "skills":
      return <SkillsWindow />;
    case "education":
      return <EducationWindow />;
    case "achievements":
      return <AchievementsWindow />;
    case "resume":
      return <ResumeWindow />;
    case "contact":
      return <ContactWindow />;
    case "terminal":
      return <TerminalWindow />;
    case "trash":
      return <TrashWindow />;
  }
}

/** Disable resize for windows where it doesn't make sense (e.g. terminal). */
const NO_RESIZE: WindowId[] = ["terminal"];

export function WindowManager() {
  const { windows, activeId } = useWindowManager();

  return (
    <>
      {windows.map((win) => (
        <DesktopWindow
          key={win.id}
          id={win.id}
          title={win.title}
          initialPosition={win.position}
          initialSize={win.size}
          zIndex={win.zIndex}
          minimized={win.minimized}
          maximized={win.maximized}
          isActive={activeId === win.id}
          disableResize={NO_RESIZE.includes(win.id)}
        >
          {renderWindowContent(win.id)}
        </DesktopWindow>
      ))}
    </>
  );
}
