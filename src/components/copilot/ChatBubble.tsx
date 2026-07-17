"use client";

import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

export function ChatBubble({ message, streaming }: { message: ChatMessage; streaming?: boolean }) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3", !isAssistant && "flex-row-reverse")}
    >
      <span
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
          isAssistant ? "bg-primary text-white" : "bg-surface text-foreground border border-border-subtle"
        )}
      >
        {isAssistant ? <Bot className="size-4" /> : <User className="size-4" />}
      </span>

      <div className={cn("flex max-w-[80%] flex-col gap-2", !isAssistant && "items-end")}>
        <div
          className={cn(
            "rounded-xl px-4 py-3 text-sm leading-relaxed",
            isAssistant
              ? "bg-surface text-foreground rounded-tl-sm"
              : "bg-primary text-white rounded-tr-sm"
          )}
        >
          {message.content}
          {streaming && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-soft-pulse bg-primary/70" />}
        </div>

        {message.chart && !streaming && (
          <div className="w-full min-w-[280px] rounded-xl border border-border-subtle bg-white p-3">
            <ResponsiveContainer width="100%" height={160}>
              {message.chart.type === "line" ? (
                <LineChart data={message.chart.data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
                  <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} isAnimationActive />
                </LineChart>
              ) : (
                <BarChart data={message.chart.data} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E5E7EB", fontSize: 12 }} />
                  <Bar dataKey="value" fill="#0F766E" radius={[6, 6, 0, 0]} isAnimationActive />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}
