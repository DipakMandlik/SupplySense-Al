import { makeRand } from "./rng";
import type {
  Dealer,
  Plant,
  Product,
  Region,
  RiskLevel,
  TransportRoute,
  Warehouse,
} from "@/types";

const rand = makeRand(42);

export const REGIONS: Region[] = [
  "North India",
  "South India",
  "East India",
  "West India",
  "Central India",
];

const STATE_BY_REGION: Record<Region, string[]> = {
  "North India": ["Punjab", "Haryana", "Delhi NCR", "Uttar Pradesh"],
  "South India": ["Karnataka", "Tamil Nadu", "Telangana", "Kerala"],
  "East India": ["West Bengal", "Odisha", "Bihar", "Jharkhand"],
  "West India": ["Maharashtra", "Gujarat", "Rajasthan", "Goa"],
  "Central India": ["Madhya Pradesh", "Chhattisgarh"],
};

const CITY_BY_STATE: Record<string, string> = {
  Punjab: "Ludhiana",
  Haryana: "Gurugram",
  "Delhi NCR": "Faridabad",
  "Uttar Pradesh": "Kanpur",
  Karnataka: "Bengaluru",
  "Tamil Nadu": "Chennai",
  Telangana: "Hyderabad",
  Kerala: "Kochi",
  "West Bengal": "Kolkata",
  Odisha: "Bhubaneswar",
  Bihar: "Patna",
  Jharkhand: "Jamshedpur",
  Maharashtra: "Pune",
  Gujarat: "Ahmedabad",
  Rajasthan: "Jaipur",
  Goa: "Panaji",
  "Madhya Pradesh": "Indore",
  Chhattisgarh: "Raipur",
};

// Approximate lat/lng anchors per state for the India map visualization.
const COORDS_BY_STATE: Record<string, [number, number]> = {
  Punjab: [30.9, 75.85],
  Haryana: [28.45, 77.02],
  "Delhi NCR": [28.4, 77.31],
  "Uttar Pradesh": [26.45, 80.33],
  Karnataka: [12.97, 77.59],
  "Tamil Nadu": [13.08, 80.27],
  Telangana: [17.38, 78.48],
  Kerala: [9.93, 76.26],
  "West Bengal": [22.57, 88.36],
  Odisha: [20.29, 85.82],
  Bihar: [25.6, 85.13],
  Jharkhand: [22.8, 86.18],
  Maharashtra: [18.52, 73.85],
  Gujarat: [23.02, 72.57],
  Rajasthan: [26.91, 75.79],
  Goa: [15.49, 73.82],
  "Madhya Pradesh": [22.72, 75.86],
  Chhattisgarh: [21.25, 81.63],
};

const PRODUCT_CATEGORIES = [
  "Interior Emulsion",
  "Exterior Emulsion",
  "Wood Coatings",
  "Metal Coatings",
  "Primer & Undercoat",
  "Waterproofing",
  "Industrial Coatings",
  "Putty & Fillers",
  "Texture Finishes",
  "Adhesives & Sealants",
];

const PRODUCT_ADJECTIVES = [
  "Premium",
  "Ultra",
  "Pro",
  "Classic",
  "Advanced",
  "Weatherproof",
  "SmartShield",
  "DuraShine",
  "AquaGuard",
  "TitanCoat",
];

const RISK_LEVELS: RiskLevel[] = ["low", "medium", "high", "critical"];

function riskWeighted(): RiskLevel {
  const r = rand.next();
  if (r < 0.55) return "low";
  if (r < 0.8) return "medium";
  if (r < 0.94) return "high";
  return "critical";
}

// ---------- Products (100+) ----------
export const products: Product[] = Array.from({ length: 108 }, (_, i) => {
  const category = PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length];
  const adjective = rand.pick(PRODUCT_ADJECTIVES);
  const variant = rand.int(1, 999);
  return {
    id: `PRD-${String(i + 1).padStart(4, "0")}`,
    sku: `SKU-${category.slice(0, 3).toUpperCase()}-${variant}`,
    name: `${adjective} ${category} ${variant}`,
    category,
    unit: rand.pick(["20L", "10L", "4L", "1L", "1kg", "20kg"]),
    unitPrice: rand.int(180, 8500),
  };
});

// ---------- Plants (18) ----------
const PLANT_TYPES: Plant["type"][] = ["manufacturing", "blending", "packaging"];
export const plants: Plant[] = Array.from({ length: 18 }, (_, i) => {
  const region = REGIONS[i % REGIONS.length];
  const state = rand.pick(STATE_BY_REGION[region]);
  const city = CITY_BY_STATE[state];
  const [lat, lng] = COORDS_BY_STATE[state];
  return {
    id: `PLT-${String(i + 1).padStart(3, "0")}`,
    name: `${city} ${rand.pick(["Manufacturing Hub", "Production Plant", "Fabrication Unit"])}`,
    region,
    state,
    city,
    lat: lat + rand.float(-0.3, 0.3, 2),
    lng: lng + rand.float(-0.3, 0.3, 2),
    capacity: rand.int(8000, 45000),
    utilization: rand.int(58, 97),
    type: rand.pick(PLANT_TYPES),
  };
});

// ---------- Warehouses (25) ----------
export const warehouses: Warehouse[] = Array.from({ length: 25 }, (_, i) => {
  const region = REGIONS[i % REGIONS.length];
  const state = rand.pick(STATE_BY_REGION[region]);
  const city = CITY_BY_STATE[state];
  const [lat, lng] = COORDS_BY_STATE[state];
  const linkedPlant = rand.pick(plants.filter((p) => p.region === region)) ?? rand.pick(plants);
  const inventoryLevel = rand.int(22, 96);
  const daysRemaining = rand.int(2, 45);
  let riskLevel: RiskLevel = "low";
  if (daysRemaining < 6 || inventoryLevel < 30) riskLevel = "critical";
  else if (daysRemaining < 12 || inventoryLevel < 45) riskLevel = "high";
  else if (daysRemaining < 20 || inventoryLevel < 60) riskLevel = "medium";

  return {
    id: `WH-${String(i + 1).padStart(3, "0")}`,
    name: `${city} Distribution Center`,
    region,
    state,
    city,
    lat: lat + rand.float(-0.5, 0.5, 2),
    lng: lng + rand.float(-0.5, 0.5, 2),
    capacity: rand.int(15000, 60000),
    inventoryLevel,
    safetyStock: rand.int(15, 35),
    agingDays: rand.int(4, 90),
    daysRemaining,
    riskLevel,
    linkedPlantId: linkedPlant.id,
  };
});

// ---------- Dealers (350) ----------
const DEALER_TIERS: Dealer["tier"][] = ["Platinum", "Gold", "Silver"];
export const dealers: Dealer[] = Array.from({ length: 350 }, (_, i) => {
  const region = REGIONS[i % REGIONS.length];
  const state = rand.pick(STATE_BY_REGION[region]);
  const city = CITY_BY_STATE[state];
  const [lat, lng] = COORDS_BY_STATE[state];
  const linkedWarehouse =
    rand.pick(warehouses.filter((w) => w.region === region)) ?? rand.pick(warehouses);
  return {
    id: `DLR-${String(i + 1).padStart(4, "0")}`,
    name: `${city} ${rand.pick(["Paints & Hardware", "Building Solutions", "Home Center", "Trading Co.", "Enterprises"])}`,
    region,
    state,
    city,
    lat: lat + rand.float(-0.7, 0.7, 2),
    lng: lng + rand.float(-0.7, 0.7, 2),
    tier: rand.pick(DEALER_TIERS),
    monthlyOrderValue: rand.int(80_000, 42_00_000),
    linkedWarehouseId: linkedWarehouse.id,
  };
});

// ---------- Transport routes (plant -> warehouse -> dealer sample) ----------
export const transportRoutes: TransportRoute[] = [
  ...warehouses.map((wh, i) => ({
    id: `RTE-P-${i + 1}`,
    fromId: wh.linkedPlantId,
    fromType: "plant" as const,
    toId: wh.id,
    toType: "warehouse" as const,
    distanceKm: rand.int(80, 1400),
    avgTransitDays: rand.int(1, 6),
    riskLevel: riskWeighted(),
  })),
  ...dealers.slice(0, 60).map((dealer, i) => ({
    id: `RTE-D-${i + 1}`,
    fromId: dealer.linkedWarehouseId,
    fromType: "warehouse" as const,
    toId: dealer.id,
    toType: "dealer" as const,
    distanceKm: rand.int(15, 320),
    avgTransitDays: rand.int(1, 3),
    riskLevel: riskWeighted(),
  })),
];

export const RISK_LEVEL_ORDER: RiskLevel[] = RISK_LEVELS;
