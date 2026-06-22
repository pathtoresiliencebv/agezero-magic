"use client"

/**
 * Chat-with-YouTube — full app template.
 *
 * Drop in a YouTube URL, transcribe, then ask questions. Uses the same
 * AgeZero UI AI primitives as Chat-with-PDF but with a URL picker instead of
 * a file uploader.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message, MessageAvatar, MessageContent } from "@/components/ai/message";
import { Input } from "@/components/ui/input";
import { MultimodalInput, type Attachment } from "@/components/ai/multimodal-input";
import { Sources } from "@/components/ai/sources";
import { TokenCounter } from "@/components/ai/token-counter";
import { Play, Sparkles, Youtube, Loader, MessageSquare, Clock } from "@/components/icons";
import { EmptyState } from "@/components/ui/empty-state";

export interface ChatWithYoutubeAppProps {
  video?: { id: string; title: string; channel: string; duration: string; thumbnail: string };
}

export function ChatWithYoutubeApp({
  video: initialVideo,
}: ChatWithYoutubeAppProps = {}) {
  const [url, setUrl] = React.useState("https://youtube.com/watch?v=dQw4w9WgXcQ");
  const [video] = React.useState(
    initialVideo ?? {
      id: "dQw4w9WgXcQ",
      title: "Building production AI agents in 2026",
      channel: "AgeZero UI",
      duration: "24:18",
      thumbnail: `https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`,
    }
  );
  const [messages, setMessages] = React.useState([
    { id: "0", role: "assistant", content: "Loaded. Ask me anything about the video." },
  ]);
  const [thinking, setThinking] = React.useState(false);

  const send = (text: string, _a: Attachment[]) => {
    if (!text.trim()) return;
    setMessages((m) => [
      ...m,
      { id: Math.random().toString(36).slice(2, 9), role: "user", content: text },
    ]);
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Math.random().toString(36).slice(2, 9),
          role: "assistant",
          content: `At 4:12, the speaker says… (and references a similar point at 18:50)`,
        },
      ]);
      setThinking(false);
    }, 1200);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] w-full max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-96">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="relative aspect-video bg-muted">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 grid place-items-center bg-black/30">
              <Button size="icon" className="size-12 rounded-full" aria-label="Play">
                <Play size={20} />
              </Button>
            </div>
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
              <Clock size={10} className="mr-1" /> {video.duration}
            </Badge>
          </div>
          <div className="p-3">
            <h3 className="text-sm font-semibold leading-snug">{video.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{video.channel}</p>
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <Youtube size={16} className="text-rose-500" />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a YouTube URL…"
                className="h-7 text-xs"
              />
              <Button size="sm" variant="outline">Load</Button>
            </div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
          <div className="rounded-md border border-border bg-card p-2">
            <p className="font-semibold text-foreground">3:42</p>
            <p>chapters</p>
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <p className="font-semibold text-foreground">12.4k</p>
            <p>words</p>
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <p className="font-semibold text-foreground">en</p>
            <p>language</p>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col rounded-lg border border-border bg-card/40">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <Badge variant="secondary">
            <MessageSquare size={10} className="mr-1" /> Chat with this video
          </Badge>
          <TokenCounter value={1024} max={1280} />
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 1 ? (
            <EmptyState
              icon={<Sparkles size={20} />}
              title="Chat with this video"
              description="Try: 'Summarize the first 5 minutes' or 'What are the key takeaways?'"
            />
          ) : (
            messages.map((m) => (
              <Message key={m.id} role={m.role as "user" | "assistant"}>
                <MessageAvatar role={m.role as "user" | "assistant"}>
                  <Avatar>
                    <AvatarFallback>{m.role === "user" ? "You" : "YT"}</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <p>{m.content}</p>
                  {m.role === "assistant" && (
                    <Sources className="mt-2" items={[
                      { title: "0:42", url: "#" },
                      { title: "4:12", url: "#" },
                      { title: "18:50", url: "#" },
                    ]} />
                  )}
                </MessageContent>
              </Message>
            ))
          )}
          {thinking && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader size={12} className="animate-spin text-primary" />
              Searching the transcript…
            </div>
          )}
        </div>
        <div className="border-t border-border p-3">
          <MultimodalInput onSubmit={send} placeholder="Ask about the video…" />
        </div>
      </main>
    </div>
  );
}