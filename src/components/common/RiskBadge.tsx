import { AlertTriangle, CheckCircle2, ShieldAlert, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RiskLevel } from "@/types";
import { cn } from "@/lib/utils";

const RISK_CONFIG: Record<
  RiskLevel,
  { variant: "success" | "warning" | "critical" | "neutral"; label: string; Icon: typeof CheckCircle2 }
> = {
  low: { variant: "success", label: "Low Risk", Icon: CheckCircle2 },
  medium: { variant: "warning", label: "Medium Risk", Icon: TriangleAlert },
  high: { variant: "critical", label: "High Risk", Icon: AlertTriangle },
  critical: { variant: "critical", label: "Critical", Icon: ShieldAlert },
};

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  const { variant, label, Icon } = RISK_CONFIG[level];
  return (
    <Badge variant={variant} className={cn(className)}>
      <Icon className="size-3" />
      {label}
    </Badge>
  );
}

export function riskDotColor(level: RiskLevel) {
  switch (level) {
    case "low":
      return "bg-success";
    case "medium":
      return "bg-warning";
    case "high":
    case "critical":
      return "bg-critical";
  }
}
