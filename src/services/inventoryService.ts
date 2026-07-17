import { warehouses } from "@/data/mockData";
import { inventoryRecommendations } from "@/data/insights";
import { delay } from "./utils";

export const inventoryService = {
  async getWarehouses() {
    return delay(warehouses);
  },

  async getWarehouse(id: string) {
    return delay(warehouses.find((w) => w.id === id) ?? null);
  },

  async getRecommendations() {
    return delay(inventoryRecommendations);
  },
};
