"use client";

import { motion } from "framer-motion";
import { CloudRain, Package, Route, Truck, Warehouse as WarehouseIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SupplyChainAlert } from "@/types";

const TYPE_ICON: Record<SupplyChainAlert["type"], typeof Truck> = {
  "supplier-delay": Truck,
  "material-shortage": Package,
  "route-risk": Route,
  "warehouse-congestion": WarehouseIcon,
  "weather-impact": CloudRain,
};

function riskVariant(score: number): "critical" | "warning" | "success" {
  if (score >= 65) return "critical";
  if (score >= 40) return "warning";
  return "success";
}

export function AlertsPanel({ alerts }: { alerts: SupplyChainAlert[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supply Chain Alerts</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 pt-0">
        {alerts.map((alert, i) => {
          const Icon = TYPE_ICON[alert.type];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex gap-3 rounded-lg border border-border-subtle bg-surface/60 p-4 transition-colors hover:bg-surface"
            >
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-white shadow-sm text-muted-foreground">
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{alert.title}</p>
                  <Badge variant={riskVariant(alert.riskScore)}>Risk {alert.riskScore}</Badge>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{alert.detail}</p>
                <Badge variant="neutral" className="mt-2">
                  {alert.region}
                </Badge>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
