import { makeRand } from "@/data/rng";
import { products, REGIONS } from "@/data/mockData";
import { delay } from "./utils";

const rand = makeRand(303);

export interface HeatmapCell {
  row: string;
  col: string;
  value: number;
}

function buildHeatmap(rows: string[], cols: string[], min: number, max: number): HeatmapCell[] {
  const cells: HeatmapCell[] = [];
  for (const row of rows) {
    for (const col of cols) {
      cells.push({ row, col, value: rand.float(min, max, 1) });
    }
  }
  return cells;
}

const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const TOP_CATEGORIES = Array.from(new Set(products.map((p) => p.category))).slice(0, 8);

export const analyticsService = {
  async getForecastErrorHeatmap() {
    return delay(buildHeatmap(TOP_CATEGORIES, MONTHS, 1, 14));
  },

  async getRegionalPerformanceHeatmap() {
    return delay(buildHeatmap(REGIONS, MONTHS, 70, 105));
  },

  async getSkuComparison() {
    const topSkus = products.slice(0, 10).map((p) => ({
      name: p.sku,
      forecastAccuracy: rand.float(82, 98, 1),
      volume: rand.int(1200, 18000),
    }));
    return delay(topSkus);
  },

  async getSeasonalityTrend() {
    const monthly = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].map((month, i) => {
      const seasonal = [5, 6, 7, 8].includes(i) ? 1.2 : [9, 10].includes(i) ? 1.3 : 1;
      return { month, index: Number((100 * seasonal * (1 + rand.float(-0.04, 0.04, 3))).toFixed(1)) };
    });
    return delay(monthly);
  },
};
