"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { PibythreeLogo } from "@/components/layout/PibythreeLogo";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Deferred a tick so the very first client render matches the server
    // render (both show the loading state) — avoids a hydration mismatch
    // while still deciding access exactly once, with no redirect race.
    Promise.resolve().then(() => {
      if (cancelled) return;
      if (isAuthenticated()) {
        setReady(true);
      } else {
        router.replace("/login");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
        <PibythreeLogo size={36} />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading workspace...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
