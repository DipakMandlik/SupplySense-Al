import { makeRand } from "./rng";
import type { KpiMetric } from "@/types";

const rand = makeRand(7);

function sparkline(base: number, points = 12, volatility = 0.04) {
  let v = base;
  return Array.from({ length: points }, () => {
    v = v * (1 + rand.float(-volatility, volatility, 3));
    return Math.round(v * 10) / 10;
  });
}

export const kpiMetrics: KpiMetric[] = [
  {
    id: "forecast-accuracy",
    label: "Forecast Accuracy",
    value: 94.2,
    unit: "%",
    trend: "up",
    trendValue: 1.8,
    status: "good",
    sparkline: sparkline(92, 12, 0.015),
    description: "AI ensemble model accuracy vs. actuals, trailing 90 days.",
  },
  {
    id: "inventory-health",
    label: "Inventory Health",
    value: 87.5,
    unit: "%",
    trend: "up",
    trendValue: 2.3,
    status: "good",
    sparkline: sparkline(84, 12, 0.02),
    description: "Composite score of stock coverage, aging and safety-stock adherence.",
  },
  {
    id: "demand-confidence",
    label: "Demand Confidence",
    value: 91.6,
    unit: "%",
    trend: "flat",
    trendValue: 0.2,
    status: "good",
    sparkline: sparkline(91, 12, 0.012),
    description: "Model confidence interval tightness across active SKUs.",
  },
  {
    id: "stockout-risk",
    label: "Stockout Risk",
    value: 12.4,
    unit: "%",
    trend: "down",
    trendValue: -1.4,
    status: "medium",
    sparkline: sparkline(14, 12, 0.06),
    description: "Share of SKU-warehouse combinations at risk of stockout in 14 days.",
  },
  {
    id: "plant-utilization",
    label: "Plant Utilization",
    value: 82.1,
    unit: "%",
    trend: "up",
    trendValue: 3.1,
    status: "good",
    sparkline: sparkline(78, 12, 0.025),
    description: "Average manufacturing capacity utilization across 18 plants.",
  },
  {
    id: "working-capital",
    label: "Working Capital",
    value: 428,
    unit: "₹Cr",
    trend: "down",
    trendValue: -2.6,
    status: "good",
    sparkline: sparkline(440, 12, 0.02),
    description: "Capital deployed in inventory and receivables, trailing month.",
  },
];
