// Core domain types for the Pibythree SupplySense AI accelerator.
// Structured to map 1:1 onto future ERP / MES / SAP / Snowflake data contracts.

export type Region =
  | "North India"
  | "South India"
  | "East India"
  | "West India"
  | "Central India";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type TrendDirection = "up" | "down" | "flat";

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: string;
  unitPrice: number;
}

export interface Plant {
  id: string;
  name: string;
  region: Region;
  state: string;
  city: string;
  lat: number;
  lng: number;
  capacity: number;
  utilization: number; // percent
  type: "manufacturing" | "blending" | "packaging";
}

export interface Warehouse {
  id: string;
  name: string;
  region: Region;
  state: string;
  city: string;
  lat: number;
  lng: number;
  capacity: number;
  inventoryLevel: number; // percent of capacity
  safetyStock: number; // percent
  agingDays: number;
  daysRemaining: number;
  riskLevel: RiskLevel;
  linkedPlantId: string;
}

export interface Dealer {
  id: string;
  name: string;
  region: Region;
  state: string;
  city: string;
  lat: number;
  lng: number;
  tier: "Platinum" | "Gold" | "Silver";
  monthlyOrderValue: number;
  linkedWarehouseId: string;
}

export interface TransportRoute {
  id: string;
  fromId: string;
  fromType: "plant" | "warehouse";
  toId: string;
  toType: "warehouse" | "dealer";
  distanceKm: number;
  avgTransitDays: number;
  riskLevel: RiskLevel;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  unit: "%" | "₹Cr" | "days" | "score";
  trend: TrendDirection;
  trendValue: number;
  status: RiskLevel | "good";
  sparkline: number[];
  description: string;
}

export interface AiInsight {
  id: string;
  severity: RiskLevel;
  category: "demand" | "inventory" | "supply" | "procurement" | "weather";
  title: string;
  detail: string;
  region?: Region;
  timestamp: string;
  confidence: number;
}

export type ForecastGranularity = "daily" | "weekly" | "monthly" | "quarterly";

export interface ForecastPoint {
  period: string;
  actual: number | null;
  forecast: number;
  upperBound: number;
  lowerBound: number;
}

export interface ForecastDriver {
  factor: string;
  impact: number; // percentage points contribution
  description: string;
}

export interface InventoryRecommendation {
  id: string;
  type: "transfer" | "procure" | "reduce" | "reorder";
  warehouseId: string;
  title: string;
  detail: string;
  impact: string;
  priority: RiskLevel;
}

export interface SupplyChainAlert {
  id: string;
  type:
    | "supplier-delay"
    | "material-shortage"
    | "route-risk"
    | "warehouse-congestion"
    | "weather-impact";
  title: string;
  detail: string;
  riskScore: number;
  region: Region;
  timestamp: string;
}

export interface ScenarioInputs {
  demandIncrease: number;
  fuelPrice: number;
  supplierDelay: number;
  rainfall: number;
  rawMaterialCost: number;
}

export interface ScenarioResult {
  forecastDelta: number;
  inventoryImpact: number;
  revenueImpact: number;
  riskScore: number;
  recommendation: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  chart?: {
    type: "line" | "bar";
    data: { label: string; value: number }[];
  };
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  severity: RiskLevel;
  title: string;
  detail: string;
  category: string;
  timestamp: string;
  read: boolean;
}

export interface ExecutiveSummaryData {
  forecastAccuracy: number;
  revenueImpact: number;
  inventoryValue: number;
  supplyRisk: number;
  workingCapital: number;
  co2Impact: number;
  narrative: string[];
}
