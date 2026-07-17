import { dealers, plants, transportRoutes, warehouses } from "@/data/mockData";
import { supplyChainAlerts } from "@/data/insights";
import type { ScenarioInputs, ScenarioResult } from "@/types";
import { delay } from "./utils";

export const supplyChainService = {
  async getNetwork() {
    return delay({ plants, warehouses, dealers, routes: transportRoutes });
  },

  async getAlerts() {
    return delay(supplyChainAlerts);
  },

  async runScenario(inputs: ScenarioInputs): Promise<ScenarioResult> {
    const { demandIncrease, fuelPrice, supplierDelay, rainfall, rawMaterialCost } = inputs;

    const forecastDelta = demandIncrease * 0.9 - supplierDelay * 0.15;
    const inventoryImpact = demandIncrease * 0.6 - rainfall * 0.25 + supplierDelay * 0.3;
    const revenueImpact =
      demandIncrease * 4.8 - fuelPrice * 1.1 - rawMaterialCost * 1.6 - supplierDelay * 0.9;
    const riskScore = Math.min(
      100,
      Math.max(
        0,
        Math.round(
          supplierDelay * 0.9 + rainfall * 0.5 + fuelPrice * 0.3 + rawMaterialCost * 0.3
        )
      )
    );

    let recommendation =
      "Current scenario parameters are within manageable risk tolerance. Continue standard replenishment cadence.";
    if (riskScore > 70) {
      recommendation =
        "High combined risk detected. Recommend pre-positioning safety stock and securing alternate logistics partners for affected corridors.";
    } else if (riskScore > 40) {
      recommendation =
        "Moderate risk detected. Recommend increasing procurement buffer by 8-10% and monitoring supplier lead times weekly.";
    }

    return delay(
      {
        forecastDelta: Number(forecastDelta.toFixed(1)),
        inventoryImpact: Number(inventoryImpact.toFixed(1)),
        revenueImpact: Number(revenueImpact.toFixed(1)),
        riskScore,
        recommendation,
      },
      500
    );
  },
};
