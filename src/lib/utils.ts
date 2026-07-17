import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-IN", opts).format(value);
}

export function formatCompactINR(value: number) {
  if (Math.abs(value) >= 1_00_00_000) {
    return `₹${(value / 1_00_00_000).toFixed(1)} Cr`;
  }
  if (Math.abs(value) >= 1_00_000) {
    return `₹${(value / 1_00_000).toFixed(1)} L`;
  }
  return `₹${formatNumber(value)}`;
}

export function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}
