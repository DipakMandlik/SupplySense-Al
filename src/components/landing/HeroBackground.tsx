"use client";

import { motion } from "framer-motion";
import { makeRand } from "@/data/rng";

const rand = makeRand(2026);

const NODES = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  x: rand.float(2, 98, 2),
  y: rand.float(4, 96, 2),
  r: rand.float(2, 4.2, 1),
  delay: rand.float(0, 4, 2),
}));

const LINKS = NODES.flatMap((node, i) =>
  NODES.slice(i + 1, i + 3).map((target) => ({
    id: `${node.id}-${target.id}`,
    x1: node.x,
    y1: node.y,
    x2: target.x,
    y2: target.y,
  }))
);

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-full w-full opacity-[0.55]"
      >
        {LINKS.map((link) => (
          <line
            key={link.id}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="#CBD5E1"
            strokeWidth="0.12"
          />
        ))}
        {NODES.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.r * 0.35}
            fill="#2563EB"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: 4.5,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white" />
    </div>
  );
}
