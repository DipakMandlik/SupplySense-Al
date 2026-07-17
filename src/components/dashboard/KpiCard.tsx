"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Sparkline } from "@/components/common/Sparkline";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { TrendIndicator } from "@/components/common/TrendIndicator";
import { Badge } from "@/components/ui/badge";
import type { KpiMetric } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_COLOR: Record<KpiMetric["status"], string> = {
  good: "#16A34A",
  low: "#16A34A",
  medium: "#D97706",
  high: "#DC2626",
  critical: "#DC2626",
};

const INVERT_TREND_IDS = new Set(["stockout-risk", "working-capital"]);

export function KpiCard({ kpi, index = 0 }: { kpi: KpiMetric; index?: number }) {
  const [open, setOpen] = useState(false);
  const color = STATUS_COLOR[kpi.status];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card
          onClick={() => setOpen(true)}
          className="cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
              <span className={cn("size-1.5 rounded-full", kpi.status !== "good" && kpi.status !== "low" ? "animate-soft-pulse" : "")} style={{ backgroundColor: color }} />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-foreground">
                <AnimatedNumber
                  value={kpi.value}
                  decimals={kpi.unit === "₹Cr" ? 0 : 1}
                  suffix={kpi.unit === "%" ? "%" : ""}
                  prefix=""
                />
              </span>
              {kpi.unit !== "%" && (
                <span className="text-sm font-medium text-muted-foreground">{kpi.unit}</span>
              )}
              <TrendIndicator
                direction={kpi.trend}
                value={kpi.trendValue}
                invert={INVERT_TREND_IDS.has(kpi.id)}
                className="ml-auto"
              />
            </div>
            <div className="mt-3 -mx-1">
              <Sparkline data={kpi.sparkline} color={color} />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle>{kpi.label}</DialogTitle>
              <Badge variant={kpi.status === "good" || kpi.status === "low" ? "success" : kpi.status === "medium" ? "warning" : "critical"}>
                {kpi.status === "good" || kpi.status === "low" ? "On Track" : kpi.status === "medium" ? "Monitor" : "Needs Attention"}
              </Badge>
            </div>
            <DialogDescription>{kpi.description}</DialogDescription>
          </DialogHeader>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-semibold text-foreground">
              {kpi.value}
              {kpi.unit}
            </span>
            <TrendIndicator direction={kpi.trend} value={kpi.trendValue} invert={INVERT_TREND_IDS.has(kpi.id)} />
          </div>
          <div className="h-40 rounded-lg border border-border-subtle bg-surface p-3">
            <Sparkline data={kpi.sparkline} color={color} height={140} />
          </div>
          <p className="text-xs text-muted-foreground">
            Trailing 12-period trend. In production this view links to the full drill-down report
            with SKU, region and plant-level breakdowns.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
