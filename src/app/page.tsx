"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  LineChart,
  Network,
  PlayCircle,
  Presentation,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { PibythreeLogo } from "@/components/layout/PibythreeLogo";
import { Footer } from "@/components/layout/Footer";
import { HeroBackground } from "@/components/landing/HeroBackground";
import { AnimatedNumber } from "@/components/common/AnimatedNumber";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const STATS = [
  { label: "Forecast Accuracy", value: 94.2, suffix: "%" },
  { label: "Products Tracked", value: 108, suffix: "+" },
  { label: "Plants & Warehouses", value: 43, suffix: "" },
  { label: "Dealer Network", value: 350, suffix: "+" },
];

const CAPABILITIES = [
  {
    href: "/dashboard",
    icon: BarChart3,
    title: "Executive Dashboard",
    description: "Real-time KPIs across forecast accuracy, inventory health and working capital.",
  },
  {
    href: "/forecast",
    icon: LineChart,
    title: "Demand Forecasting",
    description: "AI confidence-banded forecasts with plain-language explanations of demand drivers.",
  },
  {
    href: "/inventory",
    icon: Boxes,
    title: "Inventory Intelligence",
    description: "Warehouse-level risk scoring with AI-generated transfer and procurement actions.",
  },
  {
    href: "/supply-chain",
    icon: Network,
    title: "Supply Chain Control Tower",
    description: "Live network visualization with scenario simulation for cost, risk and resilience.",
  },
  {
    href: "/copilot",
    icon: Bot,
    title: "AI Copilot",
    description: "A conversational analyst that explains forecasts and recommends action in seconds.",
  },
  {
    href: "/executive",
    icon: Presentation,
    title: "Executive Briefing",
    description: "Board-ready summaries of revenue impact, supply risk and sustainability metrics.",
  },
];

const ENTERPRISES = ["Aditya Birla Group", "JSW Group", "Tata Enterprises", "UltraTech Cement"];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 lg:px-10">
          <PibythreeLogo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#capabilities" className="hover:text-foreground transition-colors">
              Platform
            </a>
            <a href="#enterprises" className="hover:text-foreground transition-colors">
              Enterprises
            </a>
            <a href="#about" className="hover:text-foreground transition-colors">
              About Pibythree
            </a>
          </nav>
          <Button asChild size="sm">
            <Link href="/dashboard">
              Explore Platform
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border-subtle">
          <HeroBackground />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center lg:py-36">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
              <Badge variant="accent" className="mb-6">
                A Pibythree AI Accelerator for Manufacturing Enterprises
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-balance text-5xl font-semibold tracking-tight text-foreground lg:text-6xl"
            >
              AI Supply Chain Intelligence
            </motion.h1>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground"
            >
              Helping manufacturing enterprises optimize demand forecasting, inventory planning
              and supply chain operations using AI.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Explore Platform
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <WatchDemoDialog />
              <RequestDemoDialog />
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="relative mx-auto grid max-w-5xl grid-cols-2 gap-6 border-t border-border-subtle px-6 py-10 sm:grid-cols-4 lg:px-10"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-semibold text-foreground">
                  <AnimatedNumber
                    value={stat.value}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-1 text-xs font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              What Pibythree Can Build
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              One accelerator, six enterprise-grade capabilities
            </h2>
            <p className="mt-3 text-muted-foreground">
              A production-ready foundation you can integrate with SAP, Snowflake, MES and ERP
              systems &mdash; built to be extended for any manufacturing enterprise.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <Link href={cap.href} className="group block h-full">
                  <Card className="h-full transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex size-11 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                        <cap.icon className="size-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-foreground">{cap.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {cap.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        View module <ArrowRight className="size-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Enterprise relevance */}
        <section id="enterprises" className="border-y border-border-subtle bg-surface">
          <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Built for enterprise scale
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  Designed for the realities of large manufacturing networks
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  This instance is configured for{" "}
                  <span className="font-medium text-foreground">Aditya Birla Group</span>&rsquo;s
                  paints &amp; coatings business &mdash; modeling 18 manufacturing plants, 25
                  regional distribution centers and a 350-dealer network across India. The same
                  accelerator adapts to any Fortune 500 manufacturing enterprise.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {ENTERPRISES.map((name) => (
                    <Badge key={name} variant="outline" className="bg-white">
                      {name}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="bg-white">
                    Fortune 500 Manufacturing
                  </Badge>
                </div>
              </div>
              <Card className="p-2">
                <CardContent className="grid grid-cols-2 gap-4 p-4">
                  {[
                    {
                      icon: ShieldCheck,
                      label: "SAP / ERP Ready",
                      detail: "API abstraction layer for live integration",
                    },
                    {
                      icon: Network,
                      label: "Snowflake Native",
                      detail: "Structured for enterprise data warehousing",
                    },
                    { icon: Bot, label: "MES Connected", detail: "Plant-level production signals" },
                    {
                      icon: LineChart,
                      label: "Composable AI",
                      detail: "Swap-in forecasting & LLM services",
                    },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-border-subtle bg-white p-4">
                      <item.icon className="size-4 text-accent" />
                      <p className="mt-2 text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Pibythree */}
        <section id="about" className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <PibythreeLogo className="justify-center" />
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
              Enterprise AI &amp; Data Engineering, delivered
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Pibythree partners with manufacturing enterprises to design and build
              production-grade AI platforms &mdash; from demand forecasting and supply chain
              intelligence to conversational copilots and executive analytics. This accelerator is
              a working demonstration of that engineering, AI and UX capability, ready to be
              tailored and integrated into your existing enterprise stack.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Explore the Platform
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <RequestDemoDialog variant="outline" />
            </div>
            <p className="mt-6 text-xs font-medium text-muted-foreground">
              Powered by Pibythree AI Platform
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function WatchDemoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <PlayCircle className="size-4" />
          Watch Demo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product walkthrough</DialogTitle>
          <DialogDescription>
            A guided walkthrough of Pibythree SupplySense AI is available on request from our
            solutions team. Explore the live platform now, or request a personalized session
            below.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function RequestDemoDialog({ variant = "subtle" }: { variant?: "subtle" | "outline" }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size="lg">
          Request Demo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request a personalized demo</DialogTitle>
          <DialogDescription>
            Our solutions team will connect with your data, supply chain and IT stakeholders to
            scope an integration tailored to your ERP, MES and data warehouse environment. Reach
            out to your Pibythree account team to schedule a session.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
