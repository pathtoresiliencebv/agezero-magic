"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Image as ImageIcon, X, Send } from "@/components/icons";

export interface Attachment {
  id: string;
  name: string;
  type: "image" | "file";
  url?: string;
}

export interface MultimodalInputProps {
  onSubmit?: (text: string, attachments: Attachment[]) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Chat input that accepts text + image/file attachments. Previews
 * attachments as chips above the textarea.
 */
export function MultimodalInput({
  onSubmit,
  placeholder = "Ask anything…",
  className,
}: MultimodalInputProps) {
  const [text, setText] = React.useState("");
  const [attachments, setAttachments] = React.useState<Attachment[]>([]);
  const fileRef = React.useRef<HTMLInputElement | null>(null);

  const add = (files: FileList | null) => {
    if (!files) return;
    const next: Attachment[] = Array.from(files).map((f) => ({
      id: Math.random().toString(36).slice(2, 9),
      name: f.name,
      type: f.type.startsWith("image/") ? "image" : "file",
      url: f.type.startsWith("image/")
        ? URL.createObjectURL(f)
        : undefined,
    }));
    setAttachments((a) => [...a, ...next]);
  };

  const remove = (id: string) => {
    setAttachments((a) => {
      const found = a.find((x) => x.id === id);
      if (found?.url) URL.revokeObjectURL(found.url);
      return a.filter((x) => x.id !== id);
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && attachments.length === 0) return;
    onSubmit?.(text, attachments);
    setText("");
    setAttachments([]);
  };

  return (
    <form onSubmit={submit} className={cn("space-y-2", className)}>
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="group flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1.5 text-xs"
            >
              {a.type === "image" && a.url ? (
                <img
                  src={a.url}
                  alt={a.name}
                  className="size-6 rounded object-cover"
                />
              ) : a.type === "image" ? (
                <ImageIcon size={14} className="text-muted-foreground" />
              ) : (
                <Paperclip size={14} className="text-muted-foreground" />
              )}
              <span className="max-w-32 truncate">{a.name}</span>
              <button
                type="button"
                onClick={() => remove(a.id)}
                aria-label={`Remove ${a.name}`}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2">
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            add(e.target.files);
            if (fileRef.current) fileRef.current.value = "";
          }}
          className="hidden"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => fileRef.current?.click()}
          aria-label="Attach image"
        >
          <ImageIcon size={16} />
        </Button>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit(e);
            }
          }}
          placeholder={placeholder}
          rows={1}
          className="min-h-10 flex-1 resize-none border-0 bg-transparent px-1 focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!text.trim() && attachments.length === 0}
          aria-label="Send"
        >
          <Send size={16} />
        </Button>
      </div>
    </form>
  );
}