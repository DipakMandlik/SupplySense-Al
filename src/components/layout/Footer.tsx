import Link from "next/link";
import { PibythreeLogo } from "./PibythreeLogo";

const QUICK_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/forecast", label: "Forecast" },
  { href: "/inventory", label: "Inventory" },
  { href: "/supply-chain", label: "Supply Chain" },
  { href: "/copilot", label: "AI Copilot" },
  { href: "/executive", label: "Executive View" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-white">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <PibythreeLogo size={30} />
          <div>
            <p className="text-sm font-semibold text-foreground">Pibythree SupplySense AI</p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Intelligent Demand Forecasting &amp; Autonomous Supply Chain Platform for
              manufacturing enterprises.
            </p>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Platform
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-2 text-center sm:items-end sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Enterprise Accelerator
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-medium text-foreground">Pibythree AI Platform</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            &copy; 2026 Pibythree. Enterprise AI &amp; Data Engineering Solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
