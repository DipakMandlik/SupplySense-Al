"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "@/components/copilot/ChatBubble";
import { SuggestedQuestions } from "@/components/copilot/SuggestedQuestions";
import { copilotService, suggestedQuestions } from "@/services/copilotService";
import type { ChatMessage } from "@/types";

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm the Pibythree SupplySense AI Copilot. Ask me about demand forecasts, inventory risk, production planning or supply chain performance across your network.",
  timestamp: new Date(2026, 6, 17, 9, 0).toISOString(),
};

export default function CopilotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const streamTarget = useRef<{ content: string; chart?: ChatMessage["chart"] } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streamingText]);

  async function handleAsk(question: string) {
    if (!question.trim() || thinking || streamingText !== null) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: question,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setThinking(true);

    const response = await copilotService.ask(question);
    setThinking(false);

    streamTarget.current = response;
    setStreamingText("");

    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      setStreamingText(response.content.slice(0, index));
      if (index >= response.content.length) {
        clearInterval(interval);
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: response.content,
            chart: response.chart,
            timestamp: new Date().toISOString(),
          },
        ]);
        setStreamingText(null);
        streamTarget.current = null;
      }
    }, 14);
  }

  return (
    <div className="flex h-[calc(100vh-9.5rem)] flex-col gap-6">
      <SectionHeader
        eyebrow="Conversational Analyst"
        title="AI Copilot"
        description="Ask questions in plain language and get grounded answers about demand, inventory and supply chain performance."
      />

      <Card className="flex flex-1 flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-6">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}

          {thinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
                <Bot className="size-4" />
              </span>
              <div className="flex items-center gap-1 rounded-xl rounded-tl-sm bg-surface px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1.5 rounded-full bg-muted-foreground"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {streamingText !== null && (
            <ChatBubble
              message={{
                id: "streaming",
                role: "assistant",
                content: streamingText,
                timestamp: new Date().toISOString(),
              }}
              streaming
            />
          )}
        </div>

        <CardContent className="border-t border-border-subtle p-4">
          {messages.length <= 1 && (
            <div className="mb-4">
              <SuggestedQuestions questions={suggestedQuestions} onSelect={handleAsk} />
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about forecasts, inventory, production or supply risk..."
              className="h-11 flex-1 rounded-lg border border-border-strong bg-white px-4 text-sm outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            />
            <Button type="submit" size="icon" disabled={thinking || streamingText !== null}>
              <Send className="size-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
