"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info } from "@/components/icons";

type ToastVariant = "default" | "success" | "error" | "info";

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, "id">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const toast = React.useCallback((data: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id, duration: 4000, ...data }]);
    const ms = data.duration ?? 4000;
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, ms);
  }, []);

  const dismiss = (id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const ICONS: Record<ToastVariant, React.ComponentType<{ size?: number; className?: string }>> = {
  default: Info,
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const TONES: Record<ToastVariant, string> = {
  default: "border-border",
  success: "border-emerald-500/30 bg-emerald-500/5",
  error: "border-rose-500/30 bg-rose-500/5",
  info: "border-sky-500/30 bg-sky-500/5",
};

const ICON_TONES: Record<ToastVariant, string> = {
  default: "text-muted-foreground",
  success: "text-emerald-500",
  error: "text-rose-500",
  info: "text-sky-500",
};

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: () => void;
}) {
  const variant = toast.variant ?? "default";
  const Icon = ICONS[variant];
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto flex items-start gap-3 rounded-lg border bg-card p-3 shadow-2xl",
        "animate-in fade-in-0 slide-in-from-right-4 duration-300",
        TONES[variant]
      )}
    >
      <Icon size={16} className={cn("mt-0.5 shrink-0", ICON_TONES[variant])} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        className="rounded text-muted-foreground hover:bg-muted"
      >
        <X size={14} />
      </button>
    </div>
  );
}