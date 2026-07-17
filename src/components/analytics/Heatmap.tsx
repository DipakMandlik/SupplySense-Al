"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { HeatmapCell } from "@/services/analyticsService";

interface HeatmapProps {
  cells: HeatmapCell[];
  rows: string[];
  cols: string[];
  colorScale: "error" | "performance";
  valueSuffix?: string;
}

function colorFor(value: number, min: number, max: number, scale: "error" | "performance") {
  const t = Math.min(1, Math.max(0, (value - min) / (max - min || 1)));
  if (scale === "error") {
    // low error = green, high error = red
    const r = Math.round(190 + t * 30);
    const g = Math.round(253 - t * 170);
    const b = Math.round(200 - t * 60);
    return `rgb(${r}, ${g}, ${b})`;
  }
  // performance: low = amber, high = teal/green
  const r = Math.round(253 - t * 190);
  const g = Math.round(230 + t * 20);
  const b = Math.round(180 + t * 40);
  return `rgb(${r}, ${g}, ${b})`;
}

export function Heatmap({ cells, rows, cols, colorScale, valueSuffix = "" }: HeatmapProps) {
  const { min, max, grid } = useMemo(() => {
    const values = cells.map((c) => c.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const grid = new Map<string, number>();
    cells.forEach((c) => grid.set(`${c.row}__${c.col}`, c.value));
    return { min, max, grid };
  }, [cells]);

  return (
    <TooltipProvider delayDuration={100}>
      <div className="overflow-x-auto">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `120px repeat(${cols.length}, minmax(48px, 1fr))` }}
        >
          <div />
          {cols.map((col) => (
            <div key={col} className="pb-1 text-center text-[10px] font-medium text-muted-foreground">
              {col}
            </div>
          ))}
          {rows.map((row, ri) => (
            <MotionRow key={row} row={row} index={ri}>
              {cols.map((col) => {
                const value = grid.get(`${row}__${col}`) ?? 0;
                return (
                  <Tooltip key={col}>
                    <TooltipTrigger asChild>
                      <div
                        className="flex aspect-square items-center justify-center rounded-md text-[10px] font-medium text-foreground/80 transition-transform hover:scale-105"
                        style={{ backgroundColor: colorFor(value, min, max, colorScale) }}
                      >
                        {value.toFixed(0)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {row} &middot; {col}: {value.toFixed(1)}
                      {valueSuffix}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </MotionRow>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

function MotionRow({
  row,
  index,
  children,
}: {
  row: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.04 }}
        className={cn("flex items-center truncate pr-2 text-xs text-muted-foreground")}
        title={row}
      >
        {row}
      </motion.div>
      {children}
    </>
  );
}
