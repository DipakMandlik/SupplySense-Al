"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Boxes, Truck, Wallet, CloudRain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AiInsight } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORY_ICON: Record<AiInsight["category"], typeof TrendingUp> = {
  demand: TrendingUp,
  inventory: Boxes,
  supply: Truck,
  procurement: Wallet,
  weather: CloudRain,
};

const SEVERITY_STYLE: Record<AiInsight["severity"], string> = {
  low: "border-l-success",
  medium: "border-l-warning",
  high: "border-l-critical",
  critical: "border-l-critical",
};

export function AiInsightsPanel({ insights }: { insights: AiInsight[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-accent-soft text-accent">
            <Sparkles className="size-4" />
          </span>
          AI Insights
        </CardTitle>
        <Badge variant="accent">Live</Badge>
      </CardHeader>
      <CardContent className="grid gap-3 pt-0">
        {insights.map((insight, i) => {
          const Icon = CATEGORY_ICON[insight.category];
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={cn(
                "flex gap-3 rounded-lg border border-border-subtle border-l-[3px] bg-surface/60 p-4 transition-colors hover:bg-surface",
                SEVERITY_STYLE[insight.severity]
              )}
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-white text-muted-foreground shadow-sm">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{insight.title}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{insight.confidence}%</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{insight.detail}</p>
                {insight.region && (
                  <Badge variant="neutral" className="mt-2">
                    {insight.region}
                  </Badge>
                )}
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
