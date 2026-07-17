import { executiveSummary } from "@/data/insights";
import { kpiMetrics } from "@/data/kpis";
import { aiInsights } from "@/data/insights";
import { delay } from "./utils";

export const executiveService = {
  async getSummary() {
    return delay(executiveSummary);
  },

  async getKpis() {
    return delay(kpiMetrics);
  },

  async getInsights() {
    return delay(aiInsights);
  },
};
