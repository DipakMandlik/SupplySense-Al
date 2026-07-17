import type {
  AiInsight,
  ExecutiveSummaryData,
  InventoryRecommendation,
  NotificationItem,
  SupplyChainAlert,
} from "@/types";
import { warehouses } from "./mockData";

export const aiInsights: AiInsight[] = [
  {
    id: "INS-001",
    severity: "medium",
    category: "demand",
    title: "AI predicts 18% demand increase in South India",
    detail:
      "Waterproofing and exterior coating orders across Karnataka and Tamil Nadu dealer networks are trending 18% above seasonal baseline for the next 3 weeks.",
    region: "South India",
    timestamp: "2026-07-17T06:12:00Z",
    confidence: 91,
  },
  {
    id: "INS-002",
    severity: "high",
    category: "inventory",
    title: "Inventory shortage expected in Maharashtra within 12 days",
    detail:
      "Pune Distribution Center inventory coverage is projected to fall below safety stock threshold in 12 days at current dealer draw-down rates.",
    region: "West India",
    timestamp: "2026-07-17T05:40:00Z",
    confidence: 88,
  },
  {
    id: "INS-003",
    severity: "medium",
    category: "demand",
    title: "Paint Primer demand likely to spike due to monsoon",
    detail:
      "Historical correlation shows Primer & Undercoat category volume rises 22-27% within 2 weeks of monsoon onset in coastal regions.",
    region: "West India",
    timestamp: "2026-07-16T22:05:00Z",
    confidence: 85,
  },
  {
    id: "INS-004",
    severity: "low",
    category: "procurement",
    title: "Raw material procurement recommended this week",
    detail:
      "Titanium dioxide and resin input costs are projected to rise 4-6% next month. Advancing procurement could preserve margin on Q3 production runs.",
    timestamp: "2026-07-16T14:22:00Z",
    confidence: 79,
  },
  {
    id: "INS-005",
    severity: "high",
    category: "supply",
    title: "Supplier delay risk flagged for East India corridor",
    detail:
      "A key packaging materials supplier serving the Kolkata and Bhubaneswar network is reporting logistics congestion, adding an estimated 2-3 day delay.",
    region: "East India",
    timestamp: "2026-07-16T09:15:00Z",
    confidence: 82,
  },
];

export const inventoryRecommendations: InventoryRecommendation[] = [
  {
    id: "REC-001",
    type: "transfer",
    warehouseId: warehouses[2]?.id ?? "WH-003",
    title: "Transfer stock from Ahmedabad to Pune",
    detail:
      "Ahmedabad DC is carrying 34% surplus safety stock in Exterior Emulsion while Pune trends toward shortage.",
    impact: "Prevents ₹1.2 Cr stockout exposure",
    priority: "high",
  },
  {
    id: "REC-002",
    type: "procure",
    warehouseId: warehouses[5]?.id ?? "WH-006",
    title: "Increase procurement for Waterproofing line",
    detail:
      "Projected monsoon-driven demand exceeds current replenishment schedule by 19% across West India network.",
    impact: "Protects fulfillment SLA at 98%+",
    priority: "high",
  },
  {
    id: "REC-003",
    type: "reduce",
    warehouseId: warehouses[9]?.id ?? "WH-010",
    title: "Reduce purchase orders for slow-moving Metal Coatings",
    detail:
      "Aging inventory beyond 75 days in this category is tying up ₹68L of working capital with low turnover.",
    impact: "Frees ₹68L working capital",
    priority: "medium",
  },
  {
    id: "REC-004",
    type: "reorder",
    warehouseId: warehouses[14]?.id ?? "WH-015",
    title: "Optimize reorder point for fast-moving SKUs",
    detail:
      "Reorder point recalibration recommended based on updated lead-time variance from the Kanpur plant corridor.",
    impact: "Improves fill rate by 3.4%",
    priority: "medium",
  },
  {
    id: "REC-005",
    type: "transfer",
    warehouseId: warehouses[18]?.id ?? "WH-019",
    title: "Move inventory ahead of festival season demand",
    detail:
      "Pre-position Interior Emulsion stock in East India ahead of projected festival season order surge.",
    impact: "Reduces stockout risk by 26%",
    priority: "low",
  },
];

export const supplyChainAlerts: SupplyChainAlert[] = [
  {
    id: "ALT-001",
    type: "supplier-delay",
    title: "Packaging supplier delay — East corridor",
    detail: "Key vendor reporting 2-3 day logistics congestion impacting Kolkata network.",
    riskScore: 72,
    region: "East India",
    timestamp: "2026-07-17T04:00:00Z",
  },
  {
    id: "ALT-002",
    type: "material-shortage",
    title: "Titanium dioxide input shortage risk",
    detail: "Global supply tightness may affect raw material availability within 3 weeks.",
    riskScore: 58,
    region: "West India",
    timestamp: "2026-07-16T19:30:00Z",
  },
  {
    id: "ALT-003",
    type: "route-risk",
    title: "NH48 corridor congestion",
    detail: "Increased transit times reported between Ahmedabad and Pune distribution routes.",
    riskScore: 44,
    region: "West India",
    timestamp: "2026-07-16T11:00:00Z",
  },
  {
    id: "ALT-004",
    type: "warehouse-congestion",
    title: "Chennai DC nearing dock capacity",
    detail: "Inbound truck queuing has increased average unload time by 40 minutes.",
    riskScore: 38,
    region: "South India",
    timestamp: "2026-07-15T15:45:00Z",
  },
  {
    id: "ALT-005",
    type: "weather-impact",
    title: "Heavy rainfall forecast — Konkan coast",
    detail: "Potential 1-2 day transit delays for routes through the Konkan coastal belt.",
    riskScore: 61,
    region: "West India",
    timestamp: "2026-07-15T08:20:00Z",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "NOT-001",
    severity: "critical",
    title: "Stockout risk crossed threshold — Pune DC",
    detail: "Inventory coverage dropped below 6 days for 3 high-velocity SKUs.",
    category: "Inventory",
    timestamp: "2026-07-17T06:45:00Z",
    read: false,
  },
  {
    id: "NOT-002",
    severity: "high",
    title: "Supplier delay flagged — East India corridor",
    detail: "Packaging vendor congestion may impact Kolkata DC replenishment.",
    category: "Supply Chain",
    timestamp: "2026-07-17T04:05:00Z",
    read: false,
  },
  {
    id: "NOT-003",
    severity: "medium",
    title: "Demand forecast revised upward — South India",
    detail: "AI model revised 3-week forecast up by 18% for waterproofing category.",
    category: "Forecast",
    timestamp: "2026-07-16T21:10:00Z",
    read: true,
  },
  {
    id: "NOT-004",
    severity: "medium",
    title: "Raw material cost trend alert",
    detail: "Titanium dioxide input pricing trending up 4-6% next month.",
    category: "Procurement",
    timestamp: "2026-07-16T13:50:00Z",
    read: true,
  },
  {
    id: "NOT-005",
    severity: "low",
    title: "Plant utilization improved — Indore",
    detail: "Utilization rose to 89% following line rebalancing.",
    category: "Operations",
    timestamp: "2026-07-15T18:30:00Z",
    read: true,
  },
  {
    id: "NOT-006",
    severity: "low",
    title: "Weekly executive briefing ready",
    detail: "Your AI-generated executive summary for the week is now available.",
    category: "Executive",
    timestamp: "2026-07-15T09:00:00Z",
    read: true,
  },
];

export const executiveSummary: ExecutiveSummaryData = {
  forecastAccuracy: 94.2,
  revenueImpact: 186,
  inventoryValue: 512,
  supplyRisk: 34,
  workingCapital: 428,
  co2Impact: -8.4,
  narrative: [
    "Demand signals across South and West India continue to strengthen, led by waterproofing and exterior coatings ahead of peak monsoon activity.",
    "Inventory health remains stable at 87.5%, though the Pune distribution center requires proactive stock transfer within the next 12 days to avoid a coverage gap.",
    "Forecast accuracy held at 94.2% this cycle, reflecting strong model performance across the top 60 SKUs by volume.",
    "Working capital deployed in inventory decreased 2.6% quarter-over-quarter following optimized reorder points across four regional distribution centers.",
    "One supplier delay risk has been identified in the East India packaging corridor; mitigation options have been queued for review.",
  ],
};
