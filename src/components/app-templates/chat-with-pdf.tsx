"use client"

/**
 * Chat-with-PDF — full app template.
 *
 * Drop-in page that lets a user upload one or more PDFs and chat with
 * them. Wires the existing AgeZero UI AI primitives (Message, MultimodalInput,
 * Sources, Reasoning). To go live, swap the mock onSubmit for a real
 * call to your vector-search / LLM endpoint.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message, MessageAvatar, MessageContent } from "@/components/ai/message";
import { Sources, Source } from "@/components/ai/sources";
import { MultimodalInput, type Attachment } from "@/components/ai/multimodal-input";
import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai/reasoning";
import { TokenCounter } from "@/components/ai/token-counter";
import { FileText, Sparkles, Plus, Trash } from "@/components/icons";
import { EmptyState } from "@/components/ui/empty-state";

export interface PdfChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ id: string; label: string; page?: number }>;
  reasoning?: string;
}

export interface ChatWithPdfAppProps {
  documents?: Array<{ id: string; name: string; pages: number }>;
}

export function ChatWithPdfApp({
  documents: initialDocs = [
    { id: "1", name: "annual-report-2025.pdf", pages: 32 },
    { id: "2", name: "pricing-strategy.pdf", pages: 12 },
  ],
}: ChatWithPdfAppProps) {
  const [docs] = React.useState(() => initialDocs);
  const [messages, setMessages] = React.useState<PdfChatMessage[]>([
    {
      id: "0",
      role: "assistant",
      content: "Hi! Upload a PDF (or pick one from your library) and ask me anything about it.",
    },
  ]);
  const [thinking, setThinking] = React.useState(false);

  const send = (text: string, attachments: Attachment[]) => {
    if (!text.trim() && attachments.length === 0) return;
    const userMsg: PdfChatMessage = {
      id: Math.random().toString(36).slice(2, 9),
      role: "user",
      content: text + (attachments.length > 0 ? ` (+${attachments.length} attachment${attachments.length > 1 ? "s" : ""})` : ""),
    };
    setMessages((m) => [...m, userMsg]);
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Math.random().toString(36).slice(2, 9),
          role: "assistant",
          content: "Based on the document, here are the key takeaways…",
          reasoning: "Embedding search → top-3 chunks → synthesize.",
          sources: [
            { id: "s1", label: "annual-report-2025.pdf", page: 4 },
            { id: "s2", label: "annual-report-2025.pdf", page: 7 },
          ],
        },
      ]);
      setThinking(false);
    }, 1400);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] w-full max-w-6xl gap-4 px-4 py-4">
      {/* Sidebar: documents */}
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Documents</h3>
          <Button variant="ghost" size="icon" className="size-6" aria-label="Add document">
            <Plus size={12} />
          </Button>
        </div>
        <div className="space-y-1">
          {docs.map((d) => (
            <button
              key={d.id}
              type="button"
              className="flex w-full items-center justify-between gap-2 rounded-md border border-border/60 bg-card px-2 py-1.5 text-left text-xs hover:border-primary/40"
            >
              <span className="flex min-w-0 items-center gap-2">
                <FileText size={12} className="shrink-0 text-muted-foreground" />
                <span className="truncate">{d.name}</span>
              </span>
              <span className="text-[10px] text-muted-foreground">{d.pages}p</span>
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-md border border-dashed border-border bg-card/50 p-3 text-center text-xs text-muted-foreground">
          <Sparkles size={14} className="mx-auto mb-1" />
          Drop PDFs here
        </div>
      </aside>

      {/* Main: chat */}
      <main className="flex min-w-0 flex-1 flex-col rounded-lg border border-border bg-card/40">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">PDF Chat</Badge>
            <TokenCounter value={420} max={600} />
          </div>
          <Button variant="ghost" size="sm" onClick={() => setMessages([])}>
            <Trash size={12} className="mr-1" /> Clear
          </Button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 1 ? (
            <EmptyState
              icon={<FileText size={20} />}
              title="Ask anything about your PDFs"
              description="Try: 'Summarize page 4' or 'What was Q3 revenue?'"
            />
          ) : (
            messages.map((m) => (
              <Message key={m.id} role={m.role as "user" | "assistant"}>
                <MessageAvatar role={m.role as "user" | "assistant"}>
                  <Avatar>
                    <AvatarFallback>{m.role === "user" ? "You" : "PDF"}</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  {m.role === "assistant" && m.reasoning && (
                    <Reasoning>
                      <ReasoningTrigger>Reasoning</ReasoningTrigger>
                      <ReasoningContent>{m.reasoning}</ReasoningContent>
                    </Reasoning>
                  )}
                  <p className="mt-1">{m.content}</p>
                  {m.sources && m.sources.length > 0 && (
                    <Sources className="mt-2" items={m.sources.map((s) => ({ title: s.label, url: "#" }))} />
                  )}
                </MessageContent>
              </Message>
            ))
          )}
          {thinking && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles size={12} className="animate-pulse text-primary" />
              Reading {docs.length} document{docs.length !== 1 ? "s" : ""}…
            </div>
          )}
        </div>

        <div className="border-t border-border p-3">
          <MultimodalInput onSubmit={send} placeholder="Ask about your PDFs…" />
        </div>
      </main>
    </div>
  );
}