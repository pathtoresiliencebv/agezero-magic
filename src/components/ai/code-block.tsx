"use client";

import * as React from "react";

import { Check } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  CodeBlock                                                                 */
/*  A self-contained syntax-highlighted code block with a header row         */
/*  (language + copy-to-clipboard) and a monospace body. No external         */
/*  highlighter dependencies — a small regex tokenizer covers the most        */
/*  common languages (ts, tsx, js, jsx, py, json, bash, css, html).           */
/* -------------------------------------------------------------------------- */

export type SupportedLanguage =
  | "ts"
  | "tsx"
  | "js"
  | "jsx"
  | "py"
  | "json"
  | "bash"
  | "css"
  | "html"
  | "text";

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  ts: "TypeScript",
  tsx: "TSX",
  js: "JavaScript",
  jsx: "JSX",
  py: "Python",
  json: "JSON",
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  text: "Plain",
};

/* -------------------------------------------------------------------------- */
/*  Tokenizer                                                                 */
/* -------------------------------------------------------------------------- */

type TokenKind =
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "operator"
  | "punct"
  | "tag"
  | "attr"
  | "plain";

interface Token {
  kind: TokenKind;
  value: string;
}

const TOKEN_CLASSES: Record<TokenKind, string> = {
  keyword: "text-purple-600 dark:text-purple-400",
  string: "text-emerald-600 dark:text-emerald-400",
  number: "text-amber-600 dark:text-amber-400",
  comment: "text-muted-foreground italic",
  operator: "text-sky-600 dark:text-sky-400",
  punct: "text-muted-foreground",
  tag: "text-rose-600 dark:text-rose-400",
  attr: "text-sky-600 dark:text-sky-400",
  plain: "",
};

const TS_KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "class",
  "extends",
  "implements",
  "interface",
  "type",
  "enum",
  "public",
  "private",
  "protected",
  "readonly",
  "static",
  "async",
  "await",
  "yield",
  "import",
  "export",
  "from",
  "as",
  "default",
  "this",
  "super",
  "try",
  "catch",
  "finally",
  "throw",
  "typeof",
  "instanceof",
  "in",
  "of",
  "void",
  "null",
  "undefined",
  "true",
  "false",
  "never",
  "any",
  "unknown",
]);

const PY_KEYWORDS = new Set([
  "def",
  "class",
  "if",
  "elif",
  "else",
  "for",
  "while",
  "break",
  "continue",
  "return",
  "yield",
  "import",
  "from",
  "as",
  "with",
  "try",
  "except",
  "finally",
  "raise",
  "pass",
  "lambda",
  "True",
  "False",
  "None",
  "and",
  "or",
  "not",
  "is",
  "in",
  "global",
  "nonlocal",
]);

const BASH_KEYWORDS = new Set([
  "if",
  "then",
  "else",
  "elif",
  "fi",
  "for",
  "in",
  "do",
  "done",
  "while",
  "case",
  "esac",
  "function",
  "return",
  "export",
  "local",
  "echo",
  "cd",
  "set",
  "unset",
]);

const CSS_KEYWORDS = new Set([
  "important",
  "media",
  "keyframes",
  "from",
  "to",
  "and",
  "not",
  "only",
  "screen",
  "print",
  "hover",
  "focus",
  "active",
]);

interface LanguageConfig {
  keywords: Set<string>;
  lineComment: string | null;
  blockComment: [string, string] | null;
  stringDelims: string[];
}

const LANG_CONFIG: Record<SupportedLanguage, LanguageConfig> = {
  ts: {
    keywords: TS_KEYWORDS,
    lineComment: "//",
    blockComment: ["/*", "*/"],
    stringDelims: ['"', "'", "`"],
  },
  tsx: {
    keywords: TS_KEYWORDS,
    lineComment: "//",
    blockComment: ["/*", "*/"],
    stringDelims: ['"', "'", "`"],
  },
  js: {
    keywords: TS_KEYWORDS,
    lineComment: "//",
    blockComment: ["/*", "*/"],
    stringDelims: ['"', "'", "`"],
  },
  jsx: {
    keywords: TS_KEYWORDS,
    lineComment: "//",
    blockComment: ["/*", "*/"],
    stringDelims: ['"', "'", "`"],
  },
  py: {
    keywords: PY_KEYWORDS,
    lineComment: "#",
    blockComment: null,
    stringDelims: ['"', "'"],
  },
  json: {
    keywords: new Set(["true", "false", "null"]),
    lineComment: null,
    blockComment: null,
    stringDelims: ['"'],
  },
  bash: {
    keywords: BASH_KEYWORDS,
    lineComment: "#",
    blockComment: null,
    stringDelims: ['"', "'"],
  },
  css: {
    keywords: CSS_KEYWORDS,
    lineComment: null,
    blockComment: ["/*", "*/"],
    stringDelims: ['"', "'"],
  },
  html: {
    keywords: new Set<string>(),
    lineComment: null,
    blockComment: ["<!--", "-->"],
    stringDelims: ['"', "'"],
  },
  text: {
    keywords: new Set<string>(),
    lineComment: null,
    blockComment: null,
    stringDelims: [],
  },
};

function tokenize(source: string, lang: SupportedLanguage): Token[] {
  const cfg = LANG_CONFIG[lang];
  if (lang === "text" || !cfg) {
    return [{ kind: "plain", value: source }];
  }

  // HTML / XML-ish: special-case tag + attribute handling.
  if (lang === "html") {
    return tokenizeMarkup(source);
  }

  const tokens: Token[] = [];
  let i = 0;
  const len = source.length;

  const push = (kind: TokenKind, value: string) => {
    if (!value) return;
    const last = tokens[tokens.length - 1];
    if (last && last.kind === kind) {
      last.value += value;
    } else {
      tokens.push({ kind, value });
    }
  };

  while (i < len) {
    const ch = source[i]!;

    // Block comment.
    if (
      cfg.blockComment &&
      source.startsWith(cfg.blockComment[0], i)
    ) {
      const end = source.indexOf(cfg.blockComment[1], i + cfg.blockComment[0].length);
      const stop =
        end === -1 ? len : end + cfg.blockComment[1].length;
      push("comment", source.slice(i, stop));
      i = stop;
      continue;
    }

    // Line comment.
    if (cfg.lineComment && source.startsWith(cfg.lineComment, i)) {
      const nl = source.indexOf("\n", i);
      const stop = nl === -1 ? len : nl;
      push("comment", source.slice(i, stop));
      i = stop;
      continue;
    }

    // Strings.
    if (cfg.stringDelims.includes(ch)) {
      const delim = ch;
      let j = i + 1;
      while (j < len) {
        const c = source[j]!;
        if (c === "\\" && j + 1 < len) {
          j += 2;
          continue;
        }
        if (c === delim) {
          j += 1;
          break;
        }
        j += 1;
      }
      push("string", source.slice(i, j));
      i = j;
      continue;
    }

    // Numbers.
    if (/[0-9]/.test(ch)) {
      let j = i + 1;
      while (j < len && /[0-9._a-fA-FxXbBoO]/.test(source[j]!)) j += 1;
      push("number", source.slice(i, j));
      i = j;
      continue;
    }

    // Identifiers / keywords.
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i + 1;
      while (j < len && /[A-Za-z0-9_$]/.test(source[j]!)) j += 1;
      const word = source.slice(i, j);
      const next = source[j];
      if (cfg.keywords.has(word)) {
        push("keyword", word);
      } else if (
        // Treat as an attribute when followed by ':' (CSS) or '.' (property access).
        (lang === "css" && (next === ":" || next === " " || next === "{" || next === ";")) ||
        // Bare property names in JSON keys aren't colored — leave plain.
        false
      ) {
        if (lang === "css" && next === ":") {
          push("attr", word);
        } else {
          push("plain", word);
        }
      } else {
        push("plain", word);
      }
      i = j;
      continue;
    }

    // Operators / punctuation.
    if (/[+\-*/%=<>!&|^~?:]/.test(ch)) {
      push("operator", ch);
      i += 1;
      continue;
    }

    if (/[(){}[\];,.]/.test(ch)) {
      push("punct", ch);
      i += 1;
      continue;
    }

    // Whitespace and everything else.
    push("plain", ch);
    i += 1;
  }

  return tokens;
}

function tokenizeMarkup(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = source.length;

  const push = (kind: TokenKind, value: string) => {
    if (!value) return;
    const last = tokens[tokens.length - 1];
    if (last && last.kind === kind) {
      last.value += value;
    } else {
      tokens.push({ kind, value });
    }
  };

  while (i < len) {
    if (source.startsWith("<!--", i)) {
      const end = source.indexOf("-->", i + 4);
      const stop = end === -1 ? len : end + 3;
      push("comment", source.slice(i, stop));
      i = stop;
      continue;
    }
    if (source[i] === "<") {
      // Tag block.
      let j = i + 1;
      // Tag name.
      if (source[j] === "/") j += 1;
      while (j < len && /[A-Za-z0-9-]/.test(source[j]!)) j += 1;
      const tagName = source.slice(i, j);
      push("tag", tagName);
      // Attributes.
      while (j < len) {
        const c = source[j]!;
        if (c === ">") {
          push("tag", ">");
          j += 1;
          break;
        }
        if (c === "/") {
          push("punct", "/");
          j += 1;
          continue;
        }
        if (c === "=") {
          push("operator", "=");
          j += 1;
          continue;
        }
        if (c === '"' || c === "'") {
          const d = c;
          let k = j + 1;
          while (k < len && source[k] !== d) k += 1;
          push("string", source.slice(j, k + 1));
          j = k + 1;
          continue;
        }
        if (/[A-Za-z_-]/.test(c)) {
          let k = j + 1;
          while (k < len && /[A-Za-z0-9_:-]/.test(source[k]!)) k += 1;
          push("attr", source.slice(j, k));
          j = k;
          continue;
        }
        push("plain", c);
        j += 1;
      }
      i = j;
      continue;
    }
    // Text content.
    let j = i;
    while (j < len && source[j] !== "<") j += 1;
    push("plain", source.slice(i, j));
    i = j;
  }

  return tokens;
}

function renderTokens(tokens: Token[]): React.ReactNode {
  return tokens.map((tok, idx) => (
    <span key={idx} className={cn(TOKEN_CLASSES[tok.kind])}>
      {tok.value}
    </span>
  ));
}

export interface CodeBlockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Code source. */
  code: string;
  /** Language for syntax highlighting + label. */
  language?: SupportedLanguage;
  /** Show a copy-to-clipboard button. Default `true`. */
  showCopy?: boolean;
  /** Optional filename displayed in the header. */
  filename?: string;
}

/**
 * A code block with a header row and a syntax-highlighted body.
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  function CodeBlock(
    {
      className,
      code,
      language = "ts",
      showCopy = true,
      filename,
      ...props
    },
    ref,
  ) {
    const [copied, setCopied] = React.useState(false);
    const tokens = React.useMemo(
      () => tokenize(code, language),
      [code, language],
    );

    const onCopy = React.useCallback(() => {
      if (typeof navigator === "undefined" || !navigator.clipboard) return;
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        })
        .catch(() => {
          // Best-effort; ignore failures (e.g. insecure context).
        });
    }, [code]);

    return (
      <div
        ref={ref}
        data-slot="code-block"
        data-language={language}
        className={cn(
          "my-3 w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-3 py-1.5">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="rounded-md bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-foreground">
              {LANGUAGE_LABELS[language] ?? language}
            </span>
            {filename && (
              <span className="truncate font-mono text-[10px]">
                {filename}
              </span>
            )}
          </div>
          {showCopy && (
            <button
              type="button"
              onClick={onCopy}
              aria-label={copied ? "Copied" : "Copy code"}
              data-slot="code-block-copy"
              className={cn(
                "inline-flex h-6 items-center gap-1 rounded-md px-1.5 text-[11px]",
                "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "transition-colors",
              )}
            >
              {copied ? <Check size={12} /> : null}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
        <pre className="m-0 max-h-[28rem] overflow-auto bg-card px-4 py-3 font-mono text-[12px] leading-relaxed">
          <code>{renderTokens(tokens)}</code>
        </pre>
      </div>
    );
  },
);
