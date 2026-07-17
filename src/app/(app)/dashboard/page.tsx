"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Factory, Landmark, Store, Warehouse as WarehouseIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { AiInsightsPanel } from "@/components/dashboard/AiInsightsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskBadge } from "@/components/common/RiskBadge";
import { executiveService } from "@/services/executiveService";
import { inventoryService } from "@/services/inventoryService";
import { plants, dealers } from "@/data/mockData";
import type { AiInsight, KpiMetric, Warehouse } from "@/types";

export default function DashboardPage() {
  const [kpis, setKpis] = useState<KpiMetric[] | null>(null);
  const [insights, setInsights] = useState<AiInsight[] | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[] | null>(null);

  useEffect(() => {
    executiveService.getKpis().then(setKpis);
    executiveService.getInsights().then(setInsights);
    inventoryService.getWarehouses().then(setWarehouses);
  }, []);

  const riskCounts = warehouses
    ? {
        low: warehouses.filter((w) => w.riskLevel === "low").length,
        medium: warehouses.filter((w) => w.riskLevel === "medium").length,
        high: warehouses.filter((w) => w.riskLevel === "high").length,
        critical: warehouses.filter((w) => w.riskLevel === "critical").length,
      }
    : null;

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Command Center"
        title="Supply Chain Dashboard"
        description="A live view of demand, inventory and network health across the Aditya Birla paints & coatings business, powered by the Pibythree AI Platform."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis
          ? kpis.map((kpi, i) => <KpiCard key={kpi.id} kpi={kpi} index={i} />)
          : Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="mt-3 h-8 w-20" />
                  <Skeleton className="mt-4 h-10 w-full" />
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {insights ? (
          <AiInsightsPanel insights={insights} />
        ) : (
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-40" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Network Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pt-0">
              {[
                { icon: Factory, label: "Plants", value: plants.length },
                { icon: WarehouseIcon, label: "Warehouses", value: warehouses?.length ?? 25 },
                { icon: Store, label: "Dealers", value: dealers.length },
                { icon: Landmark, label: "Regions", value: 5 },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg border border-border-subtle bg-surface p-3.5"
                >
                  <stat.icon className="size-4 text-accent" />
                  <p className="mt-2 text-xl font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Warehouse Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-0">
              {riskCounts ? (
                (["critical", "high", "medium", "low"] as const).map((level) => (
                  <div key={level} className="flex items-center justify-between gap-3">
                    <RiskBadge level={level} />
                    <span className="text-sm font-semibold text-foreground">
                      {riskCounts[level]} warehouses
                    </span>
                  </div>
                ))
              ) : (
                <div className="space-y-2.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-7 w-full" />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
