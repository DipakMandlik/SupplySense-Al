"use client";

import { motion } from "framer-motion";
import { ArrowLeftRight, PackagePlus, PackageMinus, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InventoryRecommendation } from "@/types";
import { warehouses } from "@/data/mockData";

const TYPE_ICON: Record<InventoryRecommendation["type"], typeof ArrowLeftRight> = {
  transfer: ArrowLeftRight,
  procure: PackagePlus,
  reduce: PackageMinus,
  reorder: RotateCcw,
};

const PRIORITY_VARIANT: Record<InventoryRecommendation["priority"], "critical" | "warning" | "success" | "neutral"> = {
  critical: "critical",
  high: "critical",
  medium: "warning",
  low: "success",
};

export function RecommendationsPanel({ recommendations }: { recommendations: InventoryRecommendation[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 pt-0">
        {recommendations.map((rec, i) => {
          const Icon = TYPE_ICON[rec.type];
          const warehouse = warehouses.find((w) => w.id === rec.warehouseId);
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-3 rounded-lg border border-border-subtle bg-surface/60 p-4 transition-colors hover:bg-surface"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{rec.title}</p>
                  <Badge variant={PRIORITY_VARIANT[rec.priority]}>{rec.priority}</Badge>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rec.detail}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge variant="neutral">{warehouse?.name ?? rec.warehouseId}</Badge>
                  <span className="text-xs font-medium text-accent">{rec.impact}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
