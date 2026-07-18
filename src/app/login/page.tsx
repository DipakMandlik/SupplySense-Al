"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, LogIn, User } from "lucide-react";
import { PibythreeLogo } from "@/components/layout/PibythreeLogo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DEMO_CREDENTIALS, signIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState(DEMO_CREDENTIALS.username);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.password);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const ok = signIn(username, password);
      if (ok) {
        router.push("/dashboard");
      } else {
        setError("Invalid username or password. Try the default demo credentials below.");
        setLoading(false);
      }
    }, 550);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#16294f] via-[#101d3b] to-[#0a1428] px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-blue-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-sky-400/10 blur-3xl"
      />

      <Link href="/" className="absolute left-6 top-6 text-sm font-medium text-white/60 transition-colors hover:text-white">
        &larr; Back to overview
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full max-w-md flex-col items-center"
      >
        <div className="rounded-2xl bg-white p-4 shadow-xl">
          <PibythreeLogo size={40} priority />
        </div>
        <h1 className="mt-6 text-center text-xl font-semibold text-white">
          Pibythree SupplySense AI Platform
        </h1>
        <p className="mt-1 text-center text-sm text-white/50">
          Transforming Enterprises for the Future
        </p>

        <div className="mt-8 w-full rounded-2xl border border-white/10 bg-white p-7 shadow-2xl">
          <h2 className="text-base font-semibold text-foreground">Enterprise Sign In</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Access the Aditya Birla Group supply chain intelligence console
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-xs text-muted-foreground">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-9"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg bg-critical-soft px-3 py-2 text-xs font-medium text-critical"
              >
                {error}
              </motion.p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
              Sign In
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Default demo credentials:{" "}
            <span className="font-medium text-foreground">
              {DEMO_CREDENTIALS.username} / {DEMO_CREDENTIALS.password}
            </span>
          </p>
        </div>

        <div className="mt-8 text-center text-[11px] text-white/40">
          <p>Powered by Pibythree AI Platform</p>
          <p className="mt-1">&copy; 2026 Pibythree. Enterprise AI &amp; Data Engineering Solutions.</p>
        </div>
      </motion.div>
    </div>
  );
}
