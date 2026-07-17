import { makeRand } from "./rng";
import type { ForecastDriver, ForecastGranularity, ForecastPoint } from "@/types";

const rand = makeRand(101);

const GRANULARITY_CONFIG: Record<
  ForecastGranularity,
  { points: number; historicalSplit: number; labelFn: (i: number) => string }
> = {
  daily: {
    points: 30,
    historicalSplit: 18,
    labelFn: (i) => `Day ${i + 1}`,
  },
  weekly: {
    points: 16,
    historicalSplit: 10,
    labelFn: (i) => `Week ${i + 1}`,
  },
  monthly: {
    points: 12,
    historicalSplit: 7,
    labelFn: (i) =>
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  },
  quarterly: {
    points: 8,
    historicalSplit: 5,
    labelFn: (i) => `Q${(i % 4) + 1} FY${25 + Math.floor(i / 4)}`,
  },
};

function seasonalMultiplier(granularity: ForecastGranularity, index: number) {
  // Monsoon (Jun-Sep) and festival season (Oct-Nov) demand bumps for a paints/coatings business.
  if (granularity === "monthly") {
    if ([5, 6, 7, 8].includes(index)) return 1.22;
    if ([9, 10].includes(index)) return 1.35;
    if ([0, 1].includes(index)) return 0.88;
  }
  if (granularity === "quarterly") {
    const q = index % 4;
    if (q === 1 || q === 2) return 1.2;
  }
  return 1;
}

export function generateForecastSeries(
  granularity: ForecastGranularity,
  baseline = 4200
): ForecastPoint[] {
  const { points, historicalSplit, labelFn } = GRANULARITY_CONFIG[granularity];
  let level = baseline;
  const series: ForecastPoint[] = [];

  for (let i = 0; i < points; i++) {
    const seasonal = seasonalMultiplier(granularity, i);
    const drift = 1 + i * 0.006;
    const noise = rand.float(-0.05, 0.05, 3);
    level = baseline * seasonal * drift * (1 + noise);

    const isHistorical = i < historicalSplit;
    const confidenceSpread = 0.06 + (i - historicalSplit) * 0.012;
    const spread = isHistorical ? 0.03 : Math.max(0.06, confidenceSpread);

    series.push({
      period: labelFn(i),
      actual: isHistorical ? Math.round(level * (1 + rand.float(-0.02, 0.02, 3))) : null,
      forecast: Math.round(level),
      upperBound: Math.round(level * (1 + spread)),
      lowerBound: Math.round(level * (1 - spread)),
    });
  }

  return series;
}

export const FORECAST_DRIVERS: ForecastDriver[] = [
  {
    factor: "Monsoon Season Demand",
    impact: 8.4,
    description:
      "Waterproofing and exterior coating demand typically rises 15-20% across South & West India during monsoon months.",
  },
  {
    factor: "Festival Season Uplift",
    impact: 6.1,
    description:
      "Diwali and regional festival repainting activity drives dealer restocking orders through October-November.",
  },
  {
    factor: "Dealer Order Increase",
    impact: 3.2,
    description:
      "Platinum-tier dealers in Maharashtra and Tamil Nadu increased standing order quantities by 12% this cycle.",
  },
  {
    factor: "Historical Trend",
    impact: 2.5,
    description:
      "3-year rolling trend shows consistent YoY volume growth of 9-11% in Interior Emulsion category.",
  },
  {
    factor: "Marketing Campaign",
    impact: 1.8,
    description:
      "Regional 'Fresh Coat' campaign in North India correlated with a measurable uplift in dealer sell-through.",
  },
];
