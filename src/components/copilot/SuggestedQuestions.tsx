"use client";

import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

export function SuggestedQuestions({
  questions,
  onSelect,
}: {
  questions: string[];
  onSelect: (question: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {questions.map((question, i) => (
        <motion.button
          key={question}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          onClick={() => onSelect(question)}
          className="flex items-start gap-2 rounded-lg border border-border-subtle bg-white p-3 text-left text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-primary-soft"
        >
          <Sparkle className="mt-0.5 size-3.5 shrink-0 text-accent" />
          {question}
        </motion.button>
      ))}
    </div>
  );
}
