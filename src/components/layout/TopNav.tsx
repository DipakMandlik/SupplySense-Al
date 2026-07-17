"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChartSpline, Settings } from "lucide-react";
import { PibythreeLogo } from "./PibythreeLogo";
import { cn } from "@/lib/utils";
import { notifications } from "@/data/insights";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/forecast", label: "Forecast" },
  { href: "/inventory", label: "Inventory" },
  { href: "/supply-chain", label: "Supply Chain" },
  { href: "/copilot", label: "AI Copilot" },
  { href: "/executive", label: "Executive View" },
];

export function TopNav() {
  const pathname = usePathname();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-6 lg:px-10">
        <Link href="/dashboard" className="flex items-center gap-3 shrink-0">
          <PibythreeLogo />
          <span className="hidden h-5 w-px bg-border-strong sm:block" />
          <span className="hidden text-sm font-medium text-muted-foreground sm:block">
            SupplySense AI
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-surface",
                  active && "text-primary bg-primary-soft hover:bg-primary-soft hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            href="/analytics"
            className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground sm:flex"
            aria-label="Analytics"
          >
            <ChartSpline className="size-[18px]" />
          </Link>
          <Link
            href="/notifications"
            className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-[18px]" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-critical" />
            )}
          </Link>
          <Link
            href="/settings"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Settings"
          >
            <Settings className="size-[18px]" />
          </Link>
          <div className="ml-2 hidden items-center gap-2 rounded-full border border-border-subtle bg-surface py-1 pl-1 pr-3 lg:flex">
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-white">
              AB
            </span>
            <span className="text-xs font-medium text-foreground">Aditya Birla Group</span>
          </div>
        </div>
      </div>
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border-subtle px-4 py-1.5 md:hidden">
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground",
                active && "text-primary bg-primary-soft"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
