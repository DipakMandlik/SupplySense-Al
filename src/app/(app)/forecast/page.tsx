"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ForecastChart } from "@/components/forecast/ForecastChart";
import { ForecastFilters } from "@/components/forecast/ForecastFilters";
import { ForecastExplanation } from "@/components/forecast/ForecastExplanation";
import { forecastService } from "@/services/forecastService";
import type { ForecastDriver, ForecastGranularity, ForecastPoint, Region } from "@/types";

const GRANULARITIES: { value: ForecastGranularity; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
];

export default function ForecastPage() {
  const [granularity, setGranularity] = useState<ForecastGranularity>("monthly");
  const [series, setSeries] = useState<ForecastPoint[] | null>(null);
  const [drivers, setDrivers] = useState<ForecastDriver[] | null>(null);
  const [filterOptions, setFilterOptions] = useState<{
    regions: Region[];
    products: { id: string; name: string }[];
    dealers: string[];
    plants: { id: string; name: string }[];
  } | null>(null);
  const [filters, setFilters] = useState({
    region: "All Regions",
    product: "All Products",
    dealer: "All Dealers",
    plant: "All Plants",
  });

  useEffect(() => {
    forecastService.getForecastDrivers().then(setDrivers);
    forecastService.getFilterOptions().then(setFilterOptions);
  }, []);

  useEffect(() => {
    let cancelled = false;
    forecastService.getForecastSeries(granularity, filters).then((data) => {
      if (!cancelled) setSeries(data);
    });
    return () => {
      cancelled = true;
    };
  }, [granularity, filters]);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Predictive Intelligence"
        title="Demand Forecast"
        description="AI ensemble forecasting with confidence bands, filterable across region, dealer, plant and SKU."
      />

      <Card>
        <CardHeader className="flex-col items-start gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Forecast vs. Actuals</CardTitle>
            <Badge variant="accent">{filters.region}</Badge>
          </div>
          <Tabs value={granularity} onValueChange={(v) => setGranularity(v as ForecastGranularity)}>
            <TabsList>
              {GRANULARITIES.map((g) => (
                <TabsTrigger key={g.value} value={g.value}>
                  {g.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-0">
          {filterOptions && (
            <ForecastFilters
              regions={filterOptions.regions}
              products={filterOptions.products}
              dealers={filterOptions.dealers}
              plants={filterOptions.plants}
              value={filters}
              onChange={setFilters}
            />
          )}

          <div className="mt-6">
            {series ? (
              <ForecastChart data={series} />
            ) : (
              <Skeleton className="h-[360px] w-full" />
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <LegendDot color="#0F766E" label="Actual" />
            <LegendDot color="#2563EB" label="AI Forecast" />
            <LegendDot color="#93C5FD" label="Confidence Band (Upper / Lower)" />
          </div>
        </CardContent>
      </Card>

      {drivers ? (
        <ForecastExplanation drivers={drivers} />
      ) : (
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
