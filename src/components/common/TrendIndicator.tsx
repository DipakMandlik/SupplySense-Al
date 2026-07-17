import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrendDirection } from "@/types";

interface TrendIndicatorProps {
  direction: TrendDirection;
  value: number;
  invert?: boolean; // when "down" is actually good (e.g. stockout risk)
  className?: string;
}

export function TrendIndicator({ direction, value, invert = false, className }: TrendIndicatorProps) {
  const isGood = invert ? direction === "down" : direction === "up";
  const isFlat = direction === "flat";

  const Icon = isFlat ? Minus : direction === "up" ? ArrowUpRight : ArrowDownRight;
  const colorClass = isFlat
    ? "text-muted-foreground"
    : isGood
      ? "text-success"
      : "text-critical";

  return (
    <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", colorClass, className)}>
      <Icon className="size-3.5" />
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}
