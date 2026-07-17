import { generateForecastSeries, FORECAST_DRIVERS, type ForecastFilterInput } from "@/data/forecast";
import { plants, products, REGIONS } from "@/data/mockData";
import type { ForecastGranularity } from "@/types";
import { delay } from "./utils";

// Future backend integration: replace bodies with calls to the forecasting
// microservice (e.g. `fetch('/api/forecast?granularity=...&region=...')`),
// keeping the same function signatures so consuming components require no
// changes.

export const forecastService = {
  async getForecastSeries(granularity: ForecastGranularity, filters?: ForecastFilterInput) {
    return delay(generateForecastSeries(granularity, filters));
  },

  async getForecastDrivers() {
    return delay(FORECAST_DRIVERS);
  },

  async getFilterOptions() {
    return delay({
      regions: REGIONS,
      products: products.slice(0, 40).map((p) => ({ id: p.id, name: p.name })),
      dealers: ["All Dealers", "Platinum Tier", "Gold Tier", "Silver Tier"],
      plants: [
        { id: "All Plants", name: "All Plants" },
        ...plants.slice(0, 12).map((p) => ({ id: p.id, name: p.name })),
      ],
    });
  },
};
