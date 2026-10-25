"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Code,
  Send,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { socialLinks, profile } from "@/lib/portfolio-config";
import { WindowBody, SectionTitle } from "./shared";
import { toast } from "@/hooks/use-toast";

const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  code: Code,
};

export function ContactWindow() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Please fill in all fields",
        description: "All three fields are required to send a message.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    // Simulate a network request — no backend configured yet.
    // Replace with a real API call when a backend service is added.
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <WindowBody className="space-y-6">
      <div>
        <h2 className="font-serif text-xl text-foreground">Let's talk</h2>
        <p className="text-[13px] text-foreground/70 mt-1 leading-relaxed">
          Open to internships, collaborations on AI tools, and conversations
          about applied ML and full-stack engineering. The fastest way to reach
          me is by email — but a message here works too.
        </p>
      </div>

      <div>
        <SectionTitle>Reach me directly</SectionTitle>
        <div className="space-y-2">
          {socialLinks.map((link) => {
            const Icon = ICONS[link.icon] ?? Mail;
            return (
              <a
                key={link.id}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-foreground/10 bg-foreground/[0.025] px-3 py-2.5 transition-all hover:border-foreground/25 hover:bg-foreground/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-foreground">
                    {link.label}
                  </div>
                  <div className="text-[11.5px] text-foreground/60 truncate">
                    {link.value}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div>
        <SectionTitle>Send a message</SectionTitle>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field
              label="Your name"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="Ada Lovelace"
              type="text"
            />
            <Field
              label="Your email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              placeholder="ada@example.com"
              type="email"
            />
          </div>
          <div>
            <label className="block text-[11.5px] font-medium text-foreground/70 mb-1.5">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder={`Hi ${profile.firstName}, I'd love to talk about…`}
              rows={4}
              className="w-full resize-none rounded-lg border border-foreground/15 bg-background/60 px-3 py-2 text-[13px] text-foreground placeholder:text-foreground/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-foreground/50">
              No backend yet — this is a demo submit. Wire to an API route to enable real delivery.
            </p>
            <button
              type="submit"
              disabled={sending || sent}
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-[12.5px] font-medium text-background hover:opacity-90 transition-opacity disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Sent
                  </motion.span>
                ) : sending ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sending…
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </form>
      </div>
    </WindowBody>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type: string;
}) {
  return (
    <div>
      <label className="block text-[11.5px] font-medium text-foreground/70 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-foreground/15 bg-background/60 px-3 py-2 text-[13px] text-foreground placeholder:text-foreground/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent"
      />
    </div>
  );
}
