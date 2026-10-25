"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Sparkles } from "lucide-react";

export function TrashWindow() {
  const [emptied, setEmptied] = useState(false);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative"
      >
        <span
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-inner"
          style={{ background: "linear-gradient(160deg, #9CAD92 0%, #5E7058 100%)" }}
        >
          <Trash2 className="h-7 w-7" strokeWidth={1.6} />
        </span>
        {emptied && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#DCD6F7] text-foreground"
          >
            <Sparkles className="h-3 w-3" />
          </motion.span>
        )}
      </motion.div>

      <div>
        <h3 className="font-serif text-lg text-foreground">
          {emptied ? "Trash is empty" : "Trash"}
        </h3>
        <p className="text-[12.5px] text-foreground/65 mt-1 max-w-xs leading-relaxed">
          {emptied
            ? "Sparkly. Nothing but possibility in here — go make something."
            : "This portfolio doesn't generate garbage. But you can empty it for fun."}
        </p>
      </div>

      {!emptied && (
        <button
          onClick={() => setEmptied(true)}
          className="rounded-md border border-foreground/15 px-3 py-1.5 text-[12px] text-foreground/75 hover:bg-foreground/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Empty Trash
        </button>
      )}
    </div>
  );
}
