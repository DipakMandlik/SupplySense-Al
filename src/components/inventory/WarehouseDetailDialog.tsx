"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RiskBadge } from "@/components/common/RiskBadge";
import { makeRand } from "@/data/rng";
import type { Warehouse } from "@/types";

const CATEGORIES = [
  "Interior Emulsion",
  "Exterior Emulsion",
  "Waterproofing",
  "Wood Coatings",
  "Primer & Undercoat",
];

export function WarehouseDetailDialog({
  warehouse,
  onOpenChange,
}: {
  warehouse: Warehouse | null;
  onOpenChange: (open: boolean) => void;
}) {
  const categoryData = useMemo(() => {
    if (!warehouse) return [];
    const rand = makeRand(warehouse.id.charCodeAt(warehouse.id.length - 1) * 97 + warehouse.id.length);
    return CATEGORIES.map((category) => ({
      category,
      stock: rand.int(1200, 9800),
    }));
  }, [warehouse]);

  return (
    <Dialog open={!!warehouse} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        {warehouse && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{warehouse.name}</DialogTitle>
                <RiskBadge level={warehouse.riskLevel} />
              </div>
              <DialogDescription>
                {warehouse.city}, {warehouse.state} &middot; {warehouse.region}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-4 gap-3">
              <MetricTile label="Capacity" value={`${(warehouse.capacity / 1000).toFixed(1)}K`} />
              <MetricTile label="Inventory" value={`${warehouse.inventoryLevel}%`} />
              <MetricTile label="Safety Stock" value={`${warehouse.safetyStock}%`} />
              <MetricTile label="Days Left" value={`${warehouse.daysRemaining}d`} />
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Inventory by Category (units)
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={categoryData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    tickLine={false}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} width={36} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #E5E7EB",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="stock" fill="#2563EB" radius={[6, 6, 0, 0]} isAnimationActive />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MetricTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-3 text-center">
      <p className="text-lg font-semibold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
