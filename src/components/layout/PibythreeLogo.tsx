import { Caveat } from "next/font/google";
import { cn } from "@/lib/utils";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-script" });

interface PibythreeLogoProps {
  className?: string;
  /** Pixel height the mark is sized against; everything scales proportionally. */
  size?: number;
  /** Show the "Transforming Enterprises for the Future" tagline beneath the mark. */
  tagline?: boolean;
}

// The Pibythree brand mark: a navy "π", a gold script "by" and a sky-blue "3"
// badge — reproduced to match the official logo (π by 3).
export function PibythreeLogo({ className, size = 32, tagline = false }: PibythreeLogoProps) {
  return (
    <div className={cn("inline-flex flex-col", className)}>
      <div className="flex items-end" style={{ height: size, gap: size * 0.04 }}>
        <span
          aria-hidden
          className="font-serif italic font-bold leading-none text-[#1B3A6B]"
          style={{ fontSize: size * 1.05 }}
        >
          π
        </span>
        <span
          aria-hidden
          className={cn(caveat.className, "italic leading-none text-[#E3A008]")}
          style={{ fontSize: size * 0.46, marginBottom: size * 0.16 }}
        >
          by
        </span>
        <span
          aria-hidden
          className="relative flex shrink-0 items-center justify-center rounded-[0.28em] bg-[#27A9E1] font-bold text-white shadow-sm"
          style={{ width: size * 0.64, height: size * 0.64, fontSize: size * 0.42, marginBottom: size * 0.02 }}
        >
          3
          <sup
            className="absolute -right-1.5 -top-0.5 font-semibold text-[#27A9E1]"
            style={{ fontSize: size * 0.16 }}
          >
            TM
          </sup>
        </span>
        <span className="sr-only">Pibythree</span>
      </div>
      {tagline && (
        <span
          className="mt-1 whitespace-nowrap font-semibold uppercase tracking-wide text-[#1B3A6B]"
          style={{ fontSize: Math.max(10, size * 0.19) }}
        >
          Transforming Enterprises for the Future
        </span>
      )}
    </div>
  );
}
