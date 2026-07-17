import { generateForecastSeries, FORECAST_DRIVERS } from "@/data/forecast";
import { products } from "@/data/mockData";
import { REGIONS } from "@/data/mockData";
import type { ForecastGranularity } from "@/types";
import { delay } from "./utils";

// Future backend integration: replace bodies with calls to the forecasting
// microservice (e.g. `fetch('/api/forecast?granularity=...')`), keeping the
// same function signatures so consuming components require no changes.

export const forecastService = {
  async getForecastSeries(granularity: ForecastGranularity) {
    return delay(generateForecastSeries(granularity));
  },

  async getForecastDrivers() {
    return delay(FORECAST_DRIVERS);
  },

  async getFilterOptions() {
    return delay({
      regions: REGIONS,
      products: products.slice(0, 40).map((p) => ({ id: p.id, name: p.name })),
      dealers: ["All Dealers", "Platinum Tier", "Gold Tier", "Silver Tier"],
      plants: ["All Plants"],
    });
  },
};
