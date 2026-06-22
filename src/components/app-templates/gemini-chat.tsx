"use client"

/**
 * Gemini Chat — centered chat layout, branded gradient, model picker.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message, MessageAvatar, MessageContent } from "@/components/ai/message";
import { ModelSelector, type ModelOption } from "@/components/ai/model-selector";
import { TokenCounter } from "@/components/ai/token-counter";
import { MultimodalInput, type Attachment } from "@/components/ai/multimodal-input";
import { Sparkles, Send } from "@/components/icons";

const MODELS: ModelOption[] = [
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", vendor: "Google", description: "Best quality", contextWindow: 1_000_000 },
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash", vendor: "Google", description: "Fast + cheap", contextWindow: 1_000_000 },
  { id: "gemini-2.0", label: "Gemini 2.0", vendor: "Google", description: "Balanced", contextWindow: 32_000 },
];

export function GeminiChatApp() {
  const [model, setModel] = React.useState("gemini-2.5-pro");
  const [messages, setMessages] = React.useState([
    { id: "0", role: "assistant", content: "Hello! I'm Gemini. Ask me anything — text, code, or reasoning." },
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
          content: "Got it. Here's a thoughtful response…",
        },
      ]);
    }, 1100);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Branded header */}
      <header
        className="border-b border-border bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-rose-500/10 px-4 py-3"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="grid size-8 place-items-center rounded-full text-white"
              style={{ backgroundImage: "linear-gradient(135deg,#4285f4,#9b72cb,#d96570)" }}
            >
              <Sparkles size={14} />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Gemini</h1>
              <p className="text-xs text-muted-foreground">
                Powered by Google DeepMind
              </p>
            </div>
          </div>
          <ModelSelector
            value={model}
            onChange={setModel}
            options={MODELS}
            className="w-56"
          />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-8">
        {messages.length === 1 && (
          <div className="mb-6 text-center">
            <h2 className="bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 bg-clip-text text-3xl font-semibold text-transparent">
              Hello, world
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ask me anything, or pick a prompt below.
            </p>
          </div>
        )}

        <div className="flex-1 space-y-3">
          {messages.map((m) => (
            <Message key={m.id} role={m.role as "user" | "assistant"}>
              <MessageAvatar role={m.role as "user" | "assistant"}>
                <Avatar>
                  <AvatarFallback>
                    {m.role === "user" ? "You" : "G"}
                  </AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>{m.content}</MessageContent>
            </Message>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-2">
          <MultimodalInput onSubmit={send} placeholder="Ask Gemini anything…" />
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <Badge variant="outline" className="text-[10px]">
            <Sparkles size={10} className="mr-1" /> Gemini may display inaccurate info
          </Badge>
          <TokenCounter value={256} max={320} />
        </div>
      </main>
    </div>
  );
}