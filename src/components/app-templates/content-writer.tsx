"use client"

/**
 * Content Writer AI — generate blog posts, emails, tweets.
 */
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { TokenCounter } from "@/components/ai/token-counter";
import {
  Sparkles,
  Wand,
  Pen,
  Mail,
  Twitter,
  FileText,
  Loader,
  Copy,
  Check,
} from "@/components/icons";

const TONES = ["Professional", "Casual", "Funny", "Persuasive", "Technical"];
const TYPES = [
  { id: "blog", label: "Blog post", icon: FileText },
  { id: "email", label: "Email", icon: Mail },
  { id: "tweet", label: "Tweet", icon: Twitter },
  { id: "thread", label: "Thread", icon: Twitter },
];

export function ContentWriterApp() {
  const [topic, setTopic] = React.useState("");
  const [tone, setTone] = React.useState("Professional");
  const [type, setType] = React.useState("blog");
  const [output, setOutput] = React.useState("");
  const [generating, setGenerating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const generate = () => {
    if (!topic.trim() || generating) return;
    setGenerating(true);
    setOutput("");
    setTimeout(() => {
      setOutput(
        type === "tweet"
          ? "Building AI apps is now as simple as dropping in components. ✨\n\n#AI #buildinpublic"
          : `# ${topic}\n\nThis is a generated ${tone.toLowerCase()} ${type} on the topic you provided. In production this would stream tokens from your LLM.`
      );
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl gap-4 px-4 py-6 lg:grid-cols-[1fr_2fr]">
      <Card>
        <CardContent className="space-y-3 p-4">
          <h2 className="text-base font-semibold">Prompt</h2>
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Type</p>
            <div className="grid grid-cols-2 gap-1.5">
              {TYPES.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs ${
                      type === t.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <Icon size={12} /> {t.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Topic</p>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={4}
              className="resize-none"
              placeholder="What are we writing about?"
            />
          </div>
          <div>
            <p className="mb-1 text-xs text-muted-foreground">Tone</p>
            <div className="flex flex-wrap gap-1">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`rounded-md border px-2 py-1 text-xs ${
                    tone === t ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Button onClick={generate} className="w-full" disabled={generating}>
            {generating ? (
              <>
                <Loader size={14} className="mr-1 animate-spin" /> Writing…
              </>
            ) : (
              <>
                <Wand size={14} className="mr-1" /> Generate
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Pen size={14} /> Output
            </h2>
            {output && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1200);
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy"}
              </Button>
            )}
          </div>
          <div className="min-h-[300px] rounded-md border border-border bg-muted/20 p-4 text-sm leading-relaxed">
            {output ? (
              <pre className="whitespace-pre-wrap font-sans">{output}</pre>
            ) : (
              <div className="grid h-full place-items-center text-center text-muted-foreground">
                <div>
                  <Sparkles size={20} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Your {type} will appear here.</p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center justify-end text-xs text-muted-foreground">
            <TokenCounter value={120} max={440} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}