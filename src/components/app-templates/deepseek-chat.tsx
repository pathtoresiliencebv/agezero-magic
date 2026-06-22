"use client"

/**
 * DeepSeek Chat — clone the DeepSeek UI: two-column layout, sidebar
 * with conversations, chat thread on the right.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message, MessageAvatar, MessageContent } from "@/components/ai/message";
import { TokenCounter } from "@/components/ai/token-counter";
import { ModelSelector, type ModelOption } from "@/components/ai/model-selector";
import {
  Sparkles,
  Plus,
  MessageSquare,
  Search,
  Settings,
  Cpu,
} from "@/components/icons";
import { MultimodalInput, type Attachment } from "@/components/ai/multimodal-input";

const MODELS: ModelOption[] = [
  { id: "deepseek-chat", label: "DeepSeek-V3", vendor: "DeepSeek", description: "General chat", contextWindow: 64_000 },
  { id: "deepseek-coder", label: "DeepSeek-Coder", vendor: "DeepSeek", description: "Code tasks", contextWindow: 32_000 },
  { id: "deepseek-r1", label: "DeepSeek-R1", vendor: "DeepSeek", description: "Reasoning model", contextWindow: 64_000 },
];

export function DeepseekChatApp() {
  const [model, setModel] = React.useState("deepseek-chat");
  const [conversations, setConversations] = React.useState([
    { id: "1", title: "Refactor auth flow", active: true },
    { id: "2", title: "Pandas vs Polars" },
    { id: "3", title: "Travel: Lisbon" },
  ]);
  const [messages, setMessages] = React.useState([
    { id: "0", role: "assistant", content: "Ready when you are. What are we building?" },
  ]);

  const send = (text: string, _a: Attachment[]) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { id: Math.random().toString(36).slice(2, 9), role: "user", content: text },
    ]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Math.random().toString(36).slice(2, 9),
          role: "assistant",
          content: "Here is my take…",
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card/40 lg:flex lg:flex-col">
        <div className="border-b border-border p-3">
          <Button className="w-full" size="sm">
            <Plus size={14} className="mr-1" /> New chat
          </Button>
        </div>
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search
              size={12}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              placeholder="Search…"
              className="h-7 w-full rounded-md border border-border bg-background pl-7 pr-2 text-xs"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Today
          </p>
          {conversations.slice(0, 2).map((c) => (
            <button
              key={c.id}
              onClick={() =>
                setConversations((cs) =>
                  cs.map((x) => ({ ...x, active: x.id === c.id }))
                )
              }
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs ${
                c.active ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <MessageSquare size={12} /> <span className="truncate">{c.title}</span>
            </button>
          ))}
          <p className="mt-3 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Earlier
          </p>
          {conversations.slice(2).map((c) => (
            <button
              key={c.id}
              onClick={() =>
                setConversations((cs) =>
                  cs.map((x) => ({ ...x, active: x.id === c.id }))
                )
              }
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted"
            >
              <MessageSquare size={12} /> <span className="truncate">{c.title}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-border p-3">
          <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted">
            <Settings size={12} /> Settings
          </button>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <ModelSelector
            value={model}
            onChange={setModel}
            options={MODELS}
            className="w-56"
          />
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">
              <Cpu size={10} className="mr-1" /> {MODELS.find((m) => m.id === model)?.label}
            </Badge>
            <TokenCounter value={512} max={640} />
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-6">
          {messages.map((m) => (
            <Message key={m.id} role={m.role as "user" | "assistant"}>
              <MessageAvatar role={m.role as "user" | "assistant"}>
                <Avatar>
                  <AvatarFallback>{m.role === "user" ? "You" : "DS"}</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>{m.content}</MessageContent>
            </Message>
          ))}
        </div>

        <div className="border-t border-border p-3">
          <MultimodalInput onSubmit={send} placeholder="Message DeepSeek…" />
        </div>
      </main>
    </div>
  );
}