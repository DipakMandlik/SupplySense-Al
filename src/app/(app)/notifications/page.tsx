"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationTimeline } from "@/components/notifications/NotificationTimeline";
import { notificationService } from "@/services/notificationService";
import type { NotificationItem, RiskLevel } from "@/types";

const GROUPS: { levels: RiskLevel[]; title: string; badge: "critical" | "warning" | "success" }[] = [
  { levels: ["critical", "high"], title: "High Priority", badge: "critical" },
  { levels: ["medium"], title: "Medium Priority", badge: "warning" },
  { levels: ["low"], title: "Low Priority", badge: "success" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[] | null>(null);

  useEffect(() => {
    notificationService.getNotifications().then(setNotifications);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader
        eyebrow="AI Monitoring"
        title="Notifications"
        description="AI-generated alerts across demand, inventory and supply chain signals, grouped by priority."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {GROUPS.map((group) => {
          const items = notifications?.filter((n) => group.levels.includes(n.severity)) ?? null;
          return (
            <Card key={group.title}>
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>{group.title}</CardTitle>
                <Badge variant={group.badge}>{items ? items.length : "-"}</Badge>
              </CardHeader>
              <CardContent className="pt-0">
                {items ? (
                  items.length > 0 ? (
                    <NotificationTimeline notifications={items} />
                  ) : (
                    <p className="py-6 text-center text-sm text-muted-foreground">
                      No alerts in this category.
                    </p>
                  )
                ) : (
                  <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
