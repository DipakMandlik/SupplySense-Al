# Pibythree SupplySense AI

Intelligent Demand Forecasting & Autonomous Supply Chain Platform — a Pibythree AI Accelerator
for manufacturing enterprises.

This is a solution accelerator demo built to showcase Pibythree's AI, data engineering and product
design capabilities for manufacturing enterprises (this instance is configured for Aditya Birla
Group's paints & coatings business, and can be re-themed for any manufacturing client).

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui-style components
- Framer Motion for microinteractions
- Recharts for data visualization

## Structure

- `src/app` — routes. `/` is the marketing landing page; the `(app)` route group holds the
  authenticated product surface (Dashboard, Forecast, Inventory, Supply Chain, AI Copilot,
  Executive View, Analytics, Notifications, Settings).
- `src/components` — UI primitives (`ui/`), shared layout (`layout/`), and feature components
  grouped by module.
- `src/data` — deterministic mock data generators (products, plants, warehouses, dealers,
  forecasts, insights). Seeded, so output is stable across server/client renders.
- `src/services` — thin async service functions consumed by pages. These are the seam for
  swapping mock data for real backend/API calls (SAP, Snowflake, MES, etc.) without touching UI
  code.
- `src/types` — shared domain types.

## Notes

This accelerator ships with realistic mock data and simulated network latency in the services
layer so loading states can be exercised. No backend is wired up yet — see `src/services` for the
integration points.
