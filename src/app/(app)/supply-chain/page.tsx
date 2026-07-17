"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IndiaMap } from "@/components/supply-chain/IndiaMap";
import { AlertsPanel } from "@/components/supply-chain/AlertsPanel";
import { ScenarioSimulator } from "@/components/supply-chain/ScenarioSimulator";
import { supplyChainService } from "@/services/supplyChainService";
import type { Dealer, Plant, SupplyChainAlert, TransportRoute, Warehouse } from "@/types";

export default function SupplyChainPage() {
  const [network, setNetwork] = useState<{
    plants: Plant[];
    warehouses: Warehouse[];
    dealers: Dealer[];
    routes: TransportRoute[];
  } | null>(null);
  const [alerts, setAlerts] = useState<SupplyChainAlert[] | null>(null);

  useEffect(() => {
    supplyChainService.getNetwork().then(setNetwork);
    supplyChainService.getAlerts().then(setAlerts);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Control Tower"
        title="Supply Chain Intelligence"
        description="A live network view across plants, distribution centers and dealers, with AI-monitored risk signals."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>National Network Map</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {network ? (
              <IndiaMap
                plants={network.plants}
                warehouses={network.warehouses}
                dealers={network.dealers}
                routes={network.routes}
              />
            ) : (
              <Skeleton className="aspect-[16/12] w-full" />
            )}
          </CardContent>
        </Card>

        {alerts ? (
          <AlertsPanel alerts={alerts} />
        ) : (
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-96 w-full" />
            </CardContent>
          </Card>
        )}
      </div>

      <ScenarioSimulator />
    </div>
  );
}
