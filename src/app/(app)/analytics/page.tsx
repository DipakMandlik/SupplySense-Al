"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Heatmap } from "@/components/analytics/Heatmap";
import { analyticsService } from "@/services/analyticsService";
import { REGIONS } from "@/data/mockData";
import type { HeatmapCell } from "@/services/analyticsService";

const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export default function AnalyticsPage() {
  const [errorHeatmap, setErrorHeatmap] = useState<HeatmapCell[] | null>(null);
  const [regionalHeatmap, setRegionalHeatmap] = useState<HeatmapCell[] | null>(null);
  const [skuComparison, setSkuComparison] = useState<
    { name: string; forecastAccuracy: number; volume: number }[] | null
  >(null);
  const [seasonality, setSeasonality] = useState<{ month: string; index: number }[] | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    analyticsService.getForecastErrorHeatmap().then((cells) => {
      setErrorHeatmap(cells);
      setCategories(Array.from(new Set(cells.map((c) => c.row))));
    });
    analyticsService.getRegionalPerformanceHeatmap().then(setRegionalHeatmap);
    analyticsService.getSkuComparison().then(setSkuComparison);
    analyticsService.getSeasonalityTrend().then(setSeasonality);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="Deep Analytics"
        title="Analytics"
        description="Forecast error diagnostics, regional performance and seasonality trends across the product portfolio."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Forecast Error Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {errorHeatmap ? (
              <Heatmap cells={errorHeatmap} rows={categories} cols={MONTHS} colorScale="error" valueSuffix="% MAPE" />
            ) : (
              <Skeleton className="h-56 w-full" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Performance Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {regionalHeatmap ? (
              <Heatmap cells={regionalHeatmap} rows={REGIONS} cols={MONTHS} colorScale="performance" valueSuffix="% fill rate" />
            ) : (
              <Skeleton className="h-56 w-full" />
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>SKU Forecast Accuracy Comparison</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {skuComparison ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={skuComparison} layout="vertical" margin={{ left: 16, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis type="number" domain={[70, 100]} tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "#64748B" }}
                    axisLine={false}
                    tickLine={false}
                    width={140}
                  />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
                  <Bar dataKey="forecastAccuracy" fill="#2563EB" radius={[0, 6, 6, 0]} isAnimationActive />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-72 w-full" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seasonality Trend Index</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {seasonality ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={seasonality} margin={{ top: 8, right: 16, bottom: 0, left: -12 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={{ stroke: "#E5E7EB" }} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
                  <Line type="monotone" dataKey="index" stroke="#0F766E" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Skeleton className="h-72 w-full" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
