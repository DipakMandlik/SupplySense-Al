"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { cn } from "@/lib/utils";

interface ExecutiveKpiTileProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  index?: number;
  tone?: "default" | "critical";
}

export function ExecutiveKpiTile({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 1,
  index = 0,
  tone = "default",
}: ExecutiveKpiTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Card>
        <CardContent className="p-5">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p
            className={cn(
              "mt-2 text-2xl font-semibold tracking-tight",
              tone === "critical" ? "text-critical" : "text-foreground"
            )}
          >
            <AnimatedNumber value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
