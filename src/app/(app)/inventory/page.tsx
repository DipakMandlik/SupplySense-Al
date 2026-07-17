"use client";

import { useEffect, useMemo, useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { WarehouseCard } from "@/components/inventory/WarehouseCard";
import { WarehouseDetailDialog } from "@/components/inventory/WarehouseDetailDialog";
import { RecommendationsPanel } from "@/components/inventory/RecommendationsPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inventoryService } from "@/services/inventoryService";
import { REGIONS } from "@/data/mockData";
import type { InventoryRecommendation, Warehouse } from "@/types";

export default function InventoryPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[] | null>(null);
  const [recommendations, setRecommendations] = useState<InventoryRecommendation[] | null>(null);
  const [selected, setSelected] = useState<Warehouse | null>(null);
  const [regionFilter, setRegionFilter] = useState<string>("All Regions");

  useEffect(() => {
    inventoryService.getWarehouses().then(setWarehouses);
    inventoryService.getRecommendations().then(setRecommendations);
  }, []);

  const filtered = useMemo(() => {
    if (!warehouses) return null;
    if (regionFilter === "All Regions") return warehouses;
    return warehouses.filter((w) => w.region === regionFilter);
  }, [warehouses, regionFilter]);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Network Health"
        title="Inventory Intelligence"
        description="Warehouse-level coverage, aging and risk signals with AI-generated rebalancing actions."
      />

      <Tabs value={regionFilter} onValueChange={setRegionFilter}>
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="All Regions">All Regions</TabsTrigger>
          {REGIONS.map((region) => (
            <TabsTrigger key={region} value={region}>
              {region}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered
          ? filtered.map((w, i) => (
              <WarehouseCard key={w.id} warehouse={w} index={i} onClick={() => setSelected(w)} />
            ))
          : Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-2 h-3 w-24" />
                  <Skeleton className="mt-4 h-8 w-full" />
                  <Skeleton className="mt-3 h-12 w-full" />
                </CardContent>
              </Card>
            ))}
      </div>

      {recommendations ? (
        <RecommendationsPanel recommendations={recommendations} />
      ) : (
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      )}

      <WarehouseDetailDialog warehouse={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </div>
  );
}
