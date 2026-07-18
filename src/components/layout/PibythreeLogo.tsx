import { cn } from "@/lib/utils";

// Source dimensions of the cropped brand assets in public/brand/ — used to
// preserve aspect ratio when the logo is rendered at a given height.
const ICON_ASPECT = 421 / 174;
const FULL_ASPECT = 524 / 225;

// next/image does not prefix `src` with basePath when images.unoptimized is
// true (required for static export), so this is applied manually — see
// next.config.ts. Empty in local dev, "/SupplySense-Al" on GitHub Pages.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

interface PibythreeLogoProps {
  className?: string;
  /** Rendered height in px; width follows the source asset's aspect ratio. */
  size?: number;
  /** Use the full lockup (icon + "Transforming Enterprises for Future" tagline) instead of the icon alone. */
  tagline?: boolean;
  priority?: boolean;
}

export function PibythreeLogo({ className, size = 32, tagline = false, priority = false }: PibythreeLogoProps) {
  const aspect = tagline ? FULL_ASPECT : ICON_ASPECT;
  const width = Math.round(size * aspect);
  const src = `${BASE_PATH}/brand/${tagline ? "pibythree-logo-full.png" : "pibythree-icon.png"}`;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- avoids next/image's basePath gap under unoptimized static export
    <img
      src={src}
      alt="Pibythree"
      width={width}
      height={size}
      fetchPriority={priority ? "high" : undefined}
      className={cn("object-contain", className)}
      style={{ height: size, width }}
    />
  );
}
