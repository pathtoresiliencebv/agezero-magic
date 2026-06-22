"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

import { Bot, User, Sparkles } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Message                                                                   */
/*  A chat bubble with avatar, content, and (optional) action row.            */
/* -------------------------------------------------------------------------- */

const messageVariants = cva(
  "group/message flex w-full gap-3 py-2",
  {
    variants: {
      role: {
        user: "flex-row-reverse",
        assistant: "flex-row",
        system: "flex-row",
      },
    },
    defaultVariants: {
      role: "assistant",
    },
  },
);

const bubbleVariants = cva(
  "relative max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
  {
    variants: {
      role: {
        user: "bg-primary text-primary-foreground rounded-tr-sm",
        assistant: "bg-card text-card-foreground border border-border rounded-tl-sm",
        system:
          "bg-muted text-muted-foreground border border-dashed border-border italic",
      },
    },
    defaultVariants: {
      role: "assistant",
    },
  },
);

export type MessageRole = "user" | "assistant" | "system";

export interface MessageProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Speaker / sender of the message. Controls alignment and bubble color. */
  role?: MessageRole;
  /**
   * Optional custom avatar element. If omitted a default icon is rendered
   * based on `role` (Bot / User / Sparkles).
   */
  avatar?: React.ReactNode;
  /**
   * Hide the avatar slot entirely. Useful for compact lists.
   */
  hideAvatar?: boolean;
  /** Body content of the message bubble. */
  children?: React.ReactNode;
}

export const Message = React.forwardRef<HTMLDivElement, MessageProps>(
  function Message(
    {
      role = "assistant",
      avatar,
      hideAvatar = false,
      className,
      children,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        data-slot="message"
        data-role={role}
        className={cn(messageVariants({ role }), className)}
        {...props}
      >
        {!hideAvatar && (
          <MessageAvatar role={role}>{avatar}</MessageAvatar>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <MessageContent role={role}>{children}</MessageContent>
        </div>
      </div>
    );
  },
);

export interface MessageAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  role?: MessageRole;
}

export const MessageAvatar = React.forwardRef<
  HTMLDivElement,
  MessageAvatarProps
>(function MessageAvatar(
  { role = "assistant", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="message-avatar"
      aria-hidden="true"
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        role === "user"
          ? "bg-foreground text-background"
          : role === "system"
            ? "bg-muted text-muted-foreground"
            : "bg-card text-foreground border border-border",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          {role === "user" && <User size={16} />}
          {role === "assistant" && <Bot size={16} />}
          {role === "system" && <Sparkles size={16} />}
        </>
      )}
    </div>
  );
});

export interface MessageContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  role?: MessageRole;
}

export const MessageContent = React.forwardRef<
  HTMLDivElement,
  MessageContentProps
>(function MessageContent(
  { role = "assistant", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="message-content"
      className={cn(
        bubbleVariants({ role }),
        // user bubbles push themselves to the right via the parent flex-row-reverse
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export interface MessageActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  role?: MessageRole;
}

export const MessageActions = React.forwardRef<
  HTMLDivElement,
  MessageActionsProps
>(function MessageActions(
  { role = "assistant", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="message-actions"
      className={cn(
        "flex items-center gap-1 opacity-0 transition-opacity group-hover/message:opacity-100",
        role === "user" ? "justify-end" : "justify-start",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export interface MessageActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Tooltip / aria-label for the action button. */
  label: string;
  /** Optional icon. If omitted, render `children`. */
  icon?: React.ReactNode;
}

export const MessageAction = React.forwardRef<
  HTMLButtonElement,
  MessageActionProps
>(function MessageAction(
  { label, icon, className, children, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      data-slot="message-action"
      className={cn(
        "inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs",
        "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "transition-colors",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
});

export { messageVariants, bubbleVariants };
