"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RiskBadge } from "@/components/common/RiskBadge";
import type { Warehouse } from "@/types";

const RISK_PROGRESS_COLOR: Record<Warehouse["riskLevel"], string> = {
  low: "bg-success",
  medium: "bg-warning",
  high: "bg-critical",
  critical: "bg-critical",
};

export function WarehouseCard({
  warehouse,
  index = 0,
  onClick,
}: {
  warehouse: Warehouse;
  index?: number;
  onClick?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 9) * 0.04 }}
    >
      <Card
        onClick={onClick}
        className="cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-foreground">{warehouse.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {warehouse.city}, {warehouse.state}
              </p>
            </div>
            <RiskBadge level={warehouse.riskLevel} />
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Inventory Level</span>
                <span className="font-medium text-foreground">{warehouse.inventoryLevel}%</span>
              </div>
              <Progress
                value={warehouse.inventoryLevel}
                className="mt-1 h-1.5"
                indicatorClassName={RISK_PROGRESS_COLOR[warehouse.riskLevel]}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <Stat label="Safety Stock" value={`${warehouse.safetyStock}%`} />
              <Stat label="Aging" value={`${warehouse.agingDays}d`} />
              <Stat label="Days Left" value={`${warehouse.daysRemaining}d`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface py-2">
      <p className="text-sm font-semibold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
