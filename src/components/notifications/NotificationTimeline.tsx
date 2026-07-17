"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { riskDotColor } from "@/components/common/RiskBadge";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "@/types";

function timeAgo(timestamp: string) {
  const diffMs = new Date("2026-07-17T08:00:00Z").getTime() - new Date(timestamp).getTime();
  const hours = Math.round(diffMs / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function NotificationTimeline({ notifications }: { notifications: NotificationItem[] }) {
  return (
    <div className="space-y-1">
      {notifications.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative flex gap-4 pb-6 pl-2 last:pb-0"
        >
          {i !== notifications.length - 1 && (
            <span className="absolute left-[7px] top-4 h-full w-px bg-border-subtle" />
          )}
          <span className={cn("relative mt-1.5 size-2.5 shrink-0 rounded-full ring-4 ring-white", riskDotColor(item.severity))} />
          <div
            className={cn(
              "flex-1 rounded-lg border border-border-subtle p-4 transition-colors",
              !item.read ? "bg-surface" : "bg-white"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(item.timestamp)}</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="neutral">{item.category}</Badge>
              {!item.read && <Badge variant="accent">New</Badge>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
