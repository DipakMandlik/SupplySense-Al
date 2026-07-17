"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Region } from "@/types";

interface FilterState {
  region: string;
  product: string;
  dealer: string;
  plant: string;
}

interface ForecastFiltersProps {
  regions: Region[];
  products: { id: string; name: string }[];
  dealers: string[];
  plants: string[];
  value: FilterState;
  onChange: (value: FilterState) => void;
}

export function ForecastFilters({ regions, products, dealers, plants, value, onChange }: ForecastFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <FilterField label="Region">
        <Select value={value.region} onValueChange={(v) => onChange({ ...value, region: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Regions">All Regions</SelectItem>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label="Product / SKU">
        <Select value={value.product} onValueChange={(v) => onChange({ ...value, product: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Products">All Products</SelectItem>
            {products.map((p) => (
              <SelectItem key={p.id} value={p.name}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label="Dealer Tier">
        <Select value={value.dealer} onValueChange={(v) => onChange({ ...value, dealer: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dealers.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>

      <FilterField label="Plant">
        <Select value={value.plant} onValueChange={(v) => onChange({ ...value, plant: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {plants.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterField>
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
