"use client"

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AuthTemplateProps {
  title: string;
  description?: string;
  /** "sign-in" | "sign-up" | "forgot" | "reset". Affects default copy. */
  mode?: "sign-in" | "sign-up" | "forgot" | "reset";
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

/**
 * Centered auth card with email + password fields, optional social
 * buttons, and a link to the alternate flow.
 */
export function AuthTemplate({
  title,
  description,
  mode = "sign-in",
  onSubmit,
  className,
}: AuthTemplateProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const showName = mode === "sign-up";
  const cta =
    mode === "sign-in"
      ? "Sign in"
      : mode === "sign-up"
        ? "Create account"
        : mode === "forgot"
          ? "Send reset link"
          : "Update password";

  const alt =
    mode === "sign-in"
      ? { label: "Don't have an account?", href: "#", text: "Sign up" }
      : mode === "sign-up"
        ? { label: "Already have an account?", href: "#", text: "Sign in" }
        : { label: "Remembered your password?", href: "#", text: "Sign in" };

  return (
    <div
      className={cn(
        "flex min-h-screen items-center justify-center bg-background p-4",
        className
      )}
    >
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-border bg-card p-8 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-sm font-bold">J</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.(e);
          }}
          className="space-y-3"
        >
          {showName && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                required
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          {mode !== "forgot" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === "sign-in" && (
                  <Link
                    href="#"
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Forgot?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                autoComplete={
                  mode === "sign-up" ? "new-password" : "current-password"
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
          )}
          <Button type="submit" className="w-full">
            {cta}
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" type="button">
            Google
          </Button>
          <Button variant="outline" type="button">
            GitHub
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {alt.label}{" "}
          <Link href={alt.href} className="text-foreground hover:underline">
            {alt.text}
          </Link>
        </p>
      </div>
    </div>
  );
}