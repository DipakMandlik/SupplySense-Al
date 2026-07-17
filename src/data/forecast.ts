import { hashString, makeRand } from "./rng";
import type { ForecastDriver, ForecastGranularity, ForecastPoint } from "@/types";

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

// Regions with heavier monsoon/coastal exposure see a stronger seasonal swing
// and a different demand baseline than the national average.
const REGION_PROFILE: Record<string, { demand: number; seasonality: number }> = {
  "All Regions": { demand: 1, seasonality: 1 },
  "North India": { demand: 0.88, seasonality: 0.7 },
  "South India": { demand: 1.18, seasonality: 1.15 },
  "East India": { demand: 0.82, seasonality: 0.9 },
  "West India": { demand: 1.1, seasonality: 1.3 },
  "Central India": { demand: 0.95, seasonality: 0.8 },
};

function seasonalMultiplier(granularity: ForecastGranularity, index: number, seasonality: number) {
  // Monsoon (Jun-Sep) and festival season (Oct-Nov) demand bumps for a paints/coatings business.
  if (granularity === "monthly") {
    if ([5, 6, 7, 8].includes(index)) return 1 + 0.22 * seasonality;
    if ([9, 10].includes(index)) return 1 + 0.35 * seasonality;
    if ([0, 1].includes(index)) return 1 - 0.12 * seasonality;
  }
  if (granularity === "quarterly") {
    const q = index % 4;
    if (q === 1 || q === 2) return 1 + 0.2 * seasonality;
  }
  return 1;
}

export interface ForecastFilterInput {
  region?: string;
  product?: string;
  dealer?: string;
  plant?: string;
}

export function generateForecastSeries(
  granularity: ForecastGranularity,
  filters: ForecastFilterInput = {},
  baseline = 4200
): ForecastPoint[] {
  const { region = "All Regions", product = "All Products", dealer = "All Dealers", plant = "All Plants" } = filters;
  const profile = REGION_PROFILE[region] ?? REGION_PROFILE["All Regions"];

  // A deterministic seed per filter combination keeps a given selection
  // stable (re-picking the same filters reproduces the same curve) while
  // still varying meaningfully as the user changes region/product/dealer/plant.
  const seed = hashString(`${granularity}|${region}|${product}|${dealer}|${plant}`);
  const rand = makeRand(seed);
  const productMultiplier = 0.85 + (hashString(product) % 1000) / 1000 / 2.5;
  const dealerMultiplier = dealer === "Platinum Tier" ? 1.08 : dealer === "Silver Tier" ? 0.94 : 1;
  const effectiveBaseline = baseline * profile.demand * productMultiplier * dealerMultiplier;

  const { points, historicalSplit, labelFn } = GRANULARITY_CONFIG[granularity];
  let level = effectiveBaseline;
  const series: ForecastPoint[] = [];

  for (let i = 0; i < points; i++) {
    const seasonal = seasonalMultiplier(granularity, i, profile.seasonality);
    const drift = 1 + i * 0.006;
    const noise = rand.float(-0.05, 0.05, 3);
    level = effectiveBaseline * seasonal * drift * (1 + noise);

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
