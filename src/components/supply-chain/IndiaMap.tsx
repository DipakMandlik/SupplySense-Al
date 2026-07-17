"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Factory, Store, Warehouse as WarehouseIcon } from "lucide-react";
import { IndiaSilhouette } from "./IndiaSilhouette";
import { projectLatLng } from "@/lib/mapProjection";
import { cn } from "@/lib/utils";
import type { Dealer, Plant, TransportRoute, Warehouse } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RiskBadge } from "@/components/common/RiskBadge";
import { Badge } from "@/components/ui/badge";

type SelectedNode =
  | { kind: "plant"; data: Plant }
  | { kind: "warehouse"; data: Warehouse }
  | { kind: "dealer"; data: Dealer };

const RISK_STROKE: Record<TransportRoute["riskLevel"], string> = {
  low: "#94A3B8",
  medium: "#D97706",
  high: "#DC2626",
  critical: "#DC2626",
};

export function IndiaMap({
  plants,
  warehouses,
  dealers,
  routes,
}: {
  plants: Plant[];
  warehouses: Warehouse[];
  dealers: Dealer[];
  routes: TransportRoute[];
}) {
  const [selected, setSelected] = useState<SelectedNode | null>(null);

  const nodeById = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    plants.forEach((p) => map.set(p.id, projectLatLng(p.lat, p.lng)));
    warehouses.forEach((w) => map.set(w.id, projectLatLng(w.lat, w.lng)));
    dealers.forEach((d) => map.set(d.id, projectLatLng(d.lat, d.lng)));
    return map;
  }, [plants, warehouses, dealers]);

  const sampledDealers = useMemo(() => dealers.filter((_, i) => i % 5 === 0), [dealers]);

  return (
    <div className="relative aspect-[10/11] w-full max-w-md mx-auto lg:max-w-none lg:aspect-[16/12]">
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <IndiaSilhouette className="fill-primary-soft stroke-border-strong" />

        {routes.map((route) => {
          const from = nodeById.get(route.fromId);
          const to = nodeById.get(route.toId);
          if (!from || !to) return null;
          return (
            <line
              key={route.id}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={RISK_STROKE[route.riskLevel]}
              strokeWidth={route.riskLevel === "low" ? 0.15 : 0.3}
              strokeDasharray="1.4 1.4"
              className="animate-dash-flow"
              opacity={0.6}
            />
          );
        })}

        {sampledDealers.map((dealer) => {
          const pos = nodeById.get(dealer.id);
          if (!pos) return null;
          return (
            <circle
              key={dealer.id}
              cx={pos.x}
              cy={pos.y}
              r={0.55}
              fill="#0F766E"
              opacity={0.5}
              className="cursor-pointer transition-opacity hover:opacity-100"
              onClick={() => setSelected({ kind: "dealer", data: dealer })}
            />
          );
        })}

        {warehouses.map((warehouse) => {
          const pos = nodeById.get(warehouse.id);
          if (!pos) return null;
          const critical = warehouse.riskLevel === "high" || warehouse.riskLevel === "critical";
          return (
            <g
              key={warehouse.id}
              className="cursor-pointer"
              onClick={() => setSelected({ kind: "warehouse", data: warehouse })}
            >
              {critical && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={1.6}
                  fill="#DC2626"
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.2, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={1.15}
                fill={critical ? "#DC2626" : "#2563EB"}
                stroke="white"
                strokeWidth={0.3}
              />
            </g>
          );
        })}

        {plants.map((plant) => {
          const pos = nodeById.get(plant.id);
          if (!pos) return null;
          return (
            <rect
              key={plant.id}
              x={pos.x - 0.9}
              y={pos.y - 0.9}
              width={1.8}
              height={1.8}
              rx={0.4}
              fill="#0F172A"
              stroke="white"
              strokeWidth={0.25}
              className="cursor-pointer"
              onClick={() => setSelected({ kind: "plant", data: plant })}
            />
          );
        })}
      </svg>

      <div className="absolute bottom-2 left-2 flex flex-col gap-1.5 rounded-lg border border-border-subtle bg-white/90 p-2.5 text-[10px] backdrop-blur-sm">
        <LegendRow icon={Factory} color="#0F172A" label="Plant" shape="square" />
        <LegendRow icon={WarehouseIcon} color="#2563EB" label="Warehouse" shape="circle" />
        <LegendRow icon={Store} color="#0F766E" label="Dealer" shape="dot" />
      </div>

      <NodeDetailDialog selected={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}

function LegendRow({
  color,
  label,
}: {
  icon: typeof Factory;
  color: string;
  label: string;
  shape: "square" | "circle" | "dot";
}) {
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <span className={cn("inline-block size-2")} style={{ backgroundColor: color, borderRadius: label === "Plant" ? 2 : 999 }} />
      {label}
    </div>
  );
}

function NodeDetailDialog({
  selected,
  onOpenChange,
}: {
  selected: SelectedNode | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={!!selected} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {selected?.kind === "plant" && (
          <>
            <DialogHeader>
              <DialogTitle>{selected.data.name}</DialogTitle>
              <DialogDescription>
                {selected.data.city}, {selected.data.state} &middot; {selected.data.region}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <InfoTile label="Type" value={selected.data.type} />
              <InfoTile label="Capacity" value={`${(selected.data.capacity / 1000).toFixed(1)}K units`} />
              <InfoTile label="Utilization" value={`${selected.data.utilization}%`} />
              <InfoTile label="Plant ID" value={selected.data.id} />
            </div>
          </>
        )}
        {selected?.kind === "warehouse" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{selected.data.name}</DialogTitle>
                <RiskBadge level={selected.data.riskLevel} />
              </div>
              <DialogDescription>
                {selected.data.city}, {selected.data.state} &middot; {selected.data.region}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <InfoTile label="Inventory" value={`${selected.data.inventoryLevel}%`} />
              <InfoTile label="Safety Stock" value={`${selected.data.safetyStock}%`} />
              <InfoTile label="Aging" value={`${selected.data.agingDays} days`} />
              <InfoTile label="Days Remaining" value={`${selected.data.daysRemaining} days`} />
            </div>
          </>
        )}
        {selected?.kind === "dealer" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>{selected.data.name}</DialogTitle>
                <Badge variant="accent">{selected.data.tier}</Badge>
              </div>
              <DialogDescription>
                {selected.data.city}, {selected.data.state} &middot; {selected.data.region}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <InfoTile label="Monthly Order Value" value={`₹${(selected.data.monthlyOrderValue / 100000).toFixed(1)}L`} />
              <InfoTile label="Dealer ID" value={selected.data.id} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-surface p-3 text-center capitalize">
      <p className="text-sm font-semibold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
