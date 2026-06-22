"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader } from "@/components/icons";

export interface VoiceInputProps {
  onTranscript?: (text: string) => void;
  lang?: string;
  className?: string;
}

type SpeechRecognitionLike = {
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
  onerror: (e: { error: string }) => void;
  onend: () => void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
};

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

/**
 * Microphone button that uses the Web Speech API to transcribe voice
 * into text. SSR-safe — silently does nothing on the server.
 */
export function VoiceInput({
  onTranscript,
  lang = "en-US",
  className,
}: VoiceInputProps) {
  const [supported, setSupported] = React.useState(false);
  const [state, setState] = React.useState<"idle" | "listening" | "transcribing">(
    "idle"
  );
  const recognitionRef = React.useRef<SpeechRecognitionLike | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const SR =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) return;
    setSupported(true);
    const r = new SR();
    r.continuous = false;
    r.interimResults = false;
    r.lang = lang;
    r.onresult = (e) => {
      const text = Array.from(e.results)
        .map((r) => Array.from(r).map((rr) => rr.transcript).join(""))
        .join(" ");
      onTranscript?.(text);
      setState("idle");
    };
    r.onerror = () => setState("idle");
    r.onend = () => setState("idle");
    recognitionRef.current = r;
    return () => r.abort?.();
  }, [lang, onTranscript]);

  if (!supported) return null;

  const toggle = () => {
    const r = recognitionRef.current;
    if (!r) return;
    if (state === "listening") {
      setState("transcribing");
      r.stop();
    } else {
      setState("listening");
      try {
        r.start();
      } catch {
        setState("idle");
      }
    }
  };

  return (
    <Button
      type="button"
      variant={state === "listening" ? "default" : "outline"}
      size="icon"
      onClick={toggle}
      className={cn(
        "shrink-0",
        state === "listening" && "animate-pulse",
        className
      )}
      aria-label={
        state === "listening"
          ? "Stop recording"
          : state === "transcribing"
            ? "Transcribing"
            : "Start voice input"
      }
    >
      {state === "transcribing" ? (
        <Loader size={16} />
      ) : state === "listening" ? (
        <MicOff size={16} />
      ) : (
        <Mic size={16} />
      )}
    </Button>
  );
}