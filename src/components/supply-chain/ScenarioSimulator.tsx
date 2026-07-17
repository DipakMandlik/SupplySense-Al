"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gauge, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supplyChainService } from "@/services/supplyChainService";
import type { ScenarioInputs, ScenarioResult } from "@/types";

const SLIDER_CONFIG: { key: keyof ScenarioInputs; label: string; unit: string; max: number }[] = [
  { key: "demandIncrease", label: "Demand Increase", unit: "%", max: 50 },
  { key: "fuelPrice", label: "Fuel Price Change", unit: "%", max: 40 },
  { key: "supplierDelay", label: "Supplier Delay", unit: "days", max: 20 },
  { key: "rainfall", label: "Rainfall Intensity", unit: "%", max: 100 },
  { key: "rawMaterialCost", label: "Raw Material Cost", unit: "%", max: 40 },
];

const DEFAULT_INPUTS: ScenarioInputs = {
  demandIncrease: 12,
  fuelPrice: 8,
  supplierDelay: 3,
  rainfall: 40,
  rawMaterialCost: 6,
};

function riskVariant(score: number): "critical" | "warning" | "success" {
  if (score >= 65) return "critical";
  if (score >= 35) return "warning";
  return "success";
}

export function ScenarioSimulator() {
  const [inputs, setInputs] = useState<ScenarioInputs>(DEFAULT_INPUTS);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function runSimulation() {
    setLoading(true);
    const res = await supplyChainService.runScenario(inputs);
    setResult(res);
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2 space-y-0">
        <span className="flex size-7 items-center justify-center rounded-md bg-primary-soft text-primary">
          <Gauge className="size-4" />
        </span>
        <CardTitle>Scenario Simulator</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8 pt-0 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6">
          {SLIDER_CONFIG.map((config) => (
            <div key={config.key}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{config.label}</span>
                <span className="text-muted-foreground">
                  {inputs[config.key]}
                  {config.unit === "days" ? " days" : "%"}
                </span>
              </div>
              <Slider
                className="mt-2"
                min={0}
                max={config.max}
                step={1}
                value={[inputs[config.key]]}
                onValueChange={([v]) => setInputs((prev) => ({ ...prev, [config.key]: v }))}
              />
            </div>
          ))}

          <Button onClick={runSimulation} disabled={loading} className="w-full">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Run Simulation
          </Button>
        </div>

        <div className="rounded-xl border border-border-subtle bg-surface p-5">
          {result ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <ResultTile
                  label="Forecast Impact"
                  value={`${result.forecastDelta > 0 ? "+" : ""}${result.forecastDelta}%`}
                />
                <ResultTile
                  label="Inventory Impact"
                  value={`${result.inventoryImpact > 0 ? "+" : ""}${result.inventoryImpact}%`}
                />
                <ResultTile
                  label="Revenue Impact"
                  value={`₹${result.revenueImpact > 0 ? "+" : ""}${result.revenueImpact} Cr`}
                />
                <div className="rounded-lg border border-border-subtle bg-white p-3 text-center">
                  <p className="text-lg font-semibold text-foreground">{result.riskScore}</p>
                  <p className="text-[10px] text-muted-foreground">Risk Score</p>
                  <Badge variant={riskVariant(result.riskScore)} className="mt-1">
                    {riskVariant(result.riskScore) === "critical"
                      ? "High"
                      : riskVariant(result.riskScore) === "warning"
                        ? "Moderate"
                        : "Low"}
                  </Badge>
                </div>
              </div>
              <div className="rounded-lg bg-primary-soft p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <Sparkles className="size-3.5" />
                  AI Recommendation
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">{result.recommendation}</p>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
              <Gauge className="size-8 text-muted-foreground/40" />
              <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                Adjust the parameters and run a simulation to see AI-projected impact on forecast,
                inventory and revenue.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ResultTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border-subtle bg-white p-3 text-center">
      <p className="text-lg font-semibold text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
