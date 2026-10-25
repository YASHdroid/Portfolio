"use client";

import { useEffect, useRef, useState } from "react";
import { terminalCommands, profile } from "@/lib/portfolio-config";

interface Line {
  type: "input" | "output" | "system";
  text: string;
}

const BANNER: string[] = [
  `Last login: ${new Date().toString()}`,
  `Welcome to yash@portfolio — type 'help' to begin.`,
  "",
];

export function TerminalWindow() {
  const [history, setHistory] = useState<Line[]>(() =>
    BANNER.map((t) => ({ type: "system", text: t })),
  );
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    const newLines: Line[] = [{ type: "input", text: trimmed }];

    if (trimmed === "") {
      setHistory((h) => [...h, ...newLines]);
      return;
    }

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "help" || cmd === "?") {
      newLines.push(
        ...terminalCommands.help.map((t) => ({ type: "output" as const, text: t })),
      );
    } else if (cmd === "about") {
      newLines.push(
        ...terminalCommands.about.map((t) => ({ type: "output" as const, text: t })),
      );
    } else if (cmd === "projects") {
      newLines.push(
        ...terminalCommands.projects.map((t) => ({ type: "output" as const, text: t })),
      );
    } else if (cmd === "skills") {
      newLines.push(
        ...terminalCommands.skills.map((t) => ({ type: "output" as const, text: t })),
      );
    } else if (cmd === "contact") {
      newLines.push(
        ...terminalCommands.contact.map((t) => ({ type: "output" as const, text: t })),
      );
    } else if (cmd === "whoami") {
      newLines.push(
        ...terminalCommands.whoami.map((t) => ({ type: "output" as const, text: t })),
      );
    } else if (cmd === "date") {
      const d = new Date().toString();
      newLines.push({ type: "output", text: d });
    } else if (cmd === "echo") {
      newLines.push({ type: "output", text: arg });
    } else if (cmd === "sudo") {
      newLines.push({
        type: "output",
        text: `${profile.firstName} is not in the sudoers file. This incident will be reported. 🙂`,
      });
    } else if (cmd === "ls") {
      newLines.push({
        type: "output",
        text: "about  experience  projects  skills  education  achievements  resume.pdf  contact  trash",
      });
    } else if (cmd === "pwd") {
      newLines.push({ type: "output", text: "/Users/yash/portfolio" });
    } else if (cmd === "cd") {
      newLines.push({ type: "output", text: "Use the desktop icons to navigate folders." });
    } else {
      newLines.push({
        type: "output",
        text: `zsh: command not found: ${cmd} — try 'help'`,
      });
    }

    setHistory((h) => [...h, ...newLines]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    if (input.trim()) {
      setCmdHistory((h) => [...h, input.trim()]);
    }
    setHistoryIdx(null);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIdx =
        historyIdx === null ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const newIdx = historyIdx + 1;
      if (newIdx >= cmdHistory.length) {
        setHistoryIdx(null);
        setInput("");
      } else {
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  return (
    <div
      className="flex h-full flex-col bg-[#15182B] text-[#DCD6F7]/90 font-mono text-[12.5px] leading-relaxed"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto thin-scrollbar px-3 py-2">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line.type === "input" ? (
              <div className="flex gap-2">
                <span className="text-[#7B8E70]">yash@portfolio</span>
                <span className="text-white/40">~</span>
                <span className="text-white/60">$</span>
                <span className="text-white/90">{line.text}</span>
              </div>
            ) : line.type === "system" ? (
              <div className="text-white/40">{line.text}</div>
            ) : (
              <div className="text-[#DCD6F7]/80">{line.text}</div>
            )}
          </div>
        ))}
        {/* Active input line */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 mt-0.5">
          <span className="text-[#7B8E70]">yash@portfolio</span>
          <span className="text-white/40">~</span>
          <span className="text-white/60">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            className="flex-1 bg-transparent text-white/90 outline-none caret-[#DCD6F7]"
          />
        </form>
      </div>
    </div>
  );
}
