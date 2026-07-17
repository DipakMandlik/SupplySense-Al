"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ForecastPoint } from "@/types";
import { formatNumber } from "@/lib/utils";

function ForecastTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border-subtle bg-white p-3 shadow-lg">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <div className="mt-1.5 space-y-1">
        {payload
          .filter((p) => p.name !== "band")
          .map((p) => (
            <div key={p.name} className="flex items-center gap-2 text-xs">
              <span className="size-2 rounded-full" style={{ backgroundColor: p.color }} />
              <span className="text-muted-foreground">{p.name}</span>
              <span className="ml-auto font-medium text-foreground">{formatNumber(p.value)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export function ForecastChart({ data }: { data: ForecastPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -12 }}>
        <defs>
          <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity={0.16} />
            <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
        <XAxis
          dataKey="period"
          tick={{ fontSize: 11, fill: "#64748B" }}
          axisLine={{ stroke: "#E5E7EB" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#64748B" }}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip content={<ForecastTooltip />} />
        <Area
          type="monotone"
          dataKey="upperBound"
          stroke="none"
          fill="url(#confidenceBand)"
          name="Upper Bound"
          isAnimationActive
        />
        <Area
          type="monotone"
          dataKey="lowerBound"
          stroke="none"
          fill="#FFFFFF"
          fillOpacity={1}
          name="Lower Bound"
          legendType="none"
        />
        <Line
          type="monotone"
          dataKey="forecast"
          stroke="#2563EB"
          strokeWidth={2.5}
          dot={false}
          name="AI Forecast"
          isAnimationActive
        />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#0F766E"
          strokeWidth={2}
          strokeDasharray="0"
          dot={{ r: 2.5, fill: "#0F766E", strokeWidth: 0 }}
          name="Actual"
          connectNulls={false}
          isAnimationActive
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
