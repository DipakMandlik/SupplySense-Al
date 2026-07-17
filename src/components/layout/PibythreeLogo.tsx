import { cn } from "@/lib/utils";

interface PibythreeLogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}

// Small, professional Pibythree brand mark: a stylized "π/3" glyph.
// Kept intentionally understated per brand guidance — never overpowers the UI.
export function PibythreeLogo({ className, markClassName, showWordmark = true }: PibythreeLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 32 32"
        className={cn("size-7 shrink-0", markClassName)}
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="#2563EB" />
        <path
          d="M9 12h14M12 12v9M20 12v9"
          stroke="white"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="23.5" cy="22.5" r="2.1" fill="#0F766E" />
      </svg>
      {showWordmark && (
        <span className="flex items-baseline gap-1 leading-none">
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Pibythree
          </span>
        </span>
      )}
    </div>
  );
}
