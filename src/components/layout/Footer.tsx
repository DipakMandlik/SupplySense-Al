import { PibythreeLogo } from "./PibythreeLogo";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-3 px-6 py-6 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="flex items-center gap-3">
          <PibythreeLogo showWordmark={false} />
          <div>
            <p className="text-sm font-medium text-foreground">Pibythree SupplySense AI</p>
            <p className="text-xs text-muted-foreground">
              Intelligent Demand Forecasting &amp; Autonomous Supply Chain Platform
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 lg:items-end">
          <p className="text-xs font-medium text-muted-foreground">
            Powered by <span className="text-foreground">Pibythree AI Platform</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            &copy; 2026 Pibythree. Enterprise AI &amp; Data Engineering Solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}
