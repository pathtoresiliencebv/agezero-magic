/**
 * All playground previews. They export a default component that the
 * /playground/[component] page renders inside the live area. Each
 * playground bundles its own controls inline so the page stays simple.
 */
"use client";

import * as React from "react";
import { Field, Select, TextInput, NumberInput, Checkbox, Controls } from "./_shared";

// --- shadcn primitives ---
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Select as USelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

// --- AI ---
import { StreamingText } from "@/components/ai/streaming-text";
import { TokenCounter } from "@/components/ai/token-counter";
import { ModelSelector, type ModelOption } from "@/components/ai/model-selector";
import { Citation, type CitationSource } from "@/components/ai/citation";

// --- Motion ---
import { FadeIn } from "@/components/motion/fade-in";
import { GlowCard } from "@/components/motion/glow-card";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { Magnetic } from "@/components/motion/magnetic";

// --- Charts ---
import { Sparkline } from "@/components/charts/sparkline";
import { Bar, type BarDatum } from "@/components/charts/bar";
import { Donut } from "@/components/charts/donut";

// --- Blocks ---
import { AnimatedNumber } from "@/components/blocks/animated-number";
import { ScrollProgress } from "@/components/blocks/scroll-progress";
import { Parallax } from "@/components/blocks/parallax";
import { Confetti } from "@/components/blocks/confetti";

/* -------------------------------------------------------------------------- */
/*                                  Button                                    */
/* -------------------------------------------------------------------------- */
export function ButtonPlayground() {
  const [variant, setVariant] = React.useState("default");
  const [size, setSize] = React.useState("default");
  const [disabled, setDisabled] = React.useState(false);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Button variant={variant as never} size={size as never} disabled={disabled}>
          Click me
        </Button>
      </div>
      <Controls>
        <Field label="Variant">
          <Select value={variant} onChange={setVariant} options={[
            { value: "default", label: "default" },
            { value: "secondary", label: "secondary" },
            { value: "outline", label: "outline" },
            { value: "ghost", label: "ghost" },
            { value: "destructive", label: "destructive" },
            { value: "link", label: "link" },
          ]} />
        </Field>
        <Field label="Size">
          <Select value={size} onChange={setSize} options={[
            { value: "default", label: "default" },
            { value: "sm", label: "sm" },
            { value: "lg", label: "lg" },
            { value: "icon", label: "icon" },
          ]} />
        </Field>
        <Checkbox checked={disabled} onChange={setDisabled} label="Disabled" />
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Card                                     */
/* -------------------------------------------------------------------------- */
export function CardPlayground() {
  const [showFooter, setShowFooter] = React.useState(true);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>A short description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This is the card content area.</p>
          </CardContent>
          {showFooter && (
            <CardFooter>
              <Button size="sm">Action</Button>
              <Button size="sm" variant="ghost">Cancel</Button>
            </CardFooter>
          )}
        </Card>
      </div>
      <Controls>
        <Checkbox checked={showFooter} onChange={setShowFooter} label="Show footer" />
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Dialog                                    */
/* -------------------------------------------------------------------------- */
export function DialogPlayground() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hello there</DialogTitle>
              <DialogDescription>This is a Radix-powered dialog.</DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Click the button to open the modal.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Input                                    */
/* -------------------------------------------------------------------------- */
export function InputPlayground() {
  const [placeholder, setPlaceholder] = React.useState("Search…");
  const [type, setType] = React.useState("text");
  const [disabled, setDisabled] = React.useState(false);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Input placeholder={placeholder} type={type} disabled={disabled} className="w-full max-w-sm" />
      </div>
      <Controls>
        <Field label="Placeholder">
          <TextInput value={placeholder} onChange={setPlaceholder} />
        </Field>
        <Field label="Type">
          <Select value={type} onChange={setType} options={[
            { value: "text", label: "text" },
            { value: "email", label: "email" },
            { value: "password", label: "password" },
            { value: "number", label: "number" },
          ]} />
        </Field>
        <Checkbox checked={disabled} onChange={setDisabled} label="Disabled" />
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Select                                    */
/* -------------------------------------------------------------------------- */
export function SelectPlayground() {
  const [value, setValue] = React.useState("claude");
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <USelect value={value} onValueChange={setValue}>
          <SelectTrigger className="w-full max-w-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="claude">Claude</SelectItem>
            <SelectItem value="gpt">GPT-4o</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
          </SelectContent>
        </USelect>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Value: <code>{value}</code></p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Tabs                                     */
/* -------------------------------------------------------------------------- */
export function TabsPlayground() {
  const [tab, setTab] = React.useState("overview");
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex flex-col items-stretch gap-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="self-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="rounded-md border border-border p-4 text-sm">
            Overview panel
          </TabsContent>
          <TabsContent value="metrics" className="rounded-md border border-border p-4 text-sm">
            Metrics panel
          </TabsContent>
          <TabsContent value="logs" className="rounded-md border border-border p-4 text-sm">
            Logs panel
          </TabsContent>
        </Tabs>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Active tab: <code>{tab}</code></p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Tooltip                                   */
/* -------------------------------------------------------------------------- */
export function TooltipPlayground() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Hello from AgeZero UI</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Hover the button.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Avatar                                    */
/* -------------------------------------------------------------------------- */
export function AvatarPlayground() {
  const [size, setSize] = React.useState(48);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center gap-2">
        <Avatar style={{ width: size, height: size }}>
          <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=jsn" />
          <AvatarFallback>JSN</AvatarFallback>
        </Avatar>
        <Avatar style={{ width: size, height: size }}>
          <AvatarImage src="https://api.dicebear.com/9.x/glass/svg?seed=ui" />
          <AvatarFallback>UI</AvatarFallback>
        </Avatar>
      </div>
      <Controls>
        <Field label={`Size: ${size}px`}>
          <Slider value={[size]} onValueChange={(v) => setSize(v[0] ?? 48)} min={24} max={120} step={4} />
        </Field>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Switch                                    */
/* -------------------------------------------------------------------------- */
export function SwitchPlayground() {
  const [on, setOn] = React.useState(false);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center gap-3">
        <Switch checked={on} onCheckedChange={setOn} />
        <Label>{on ? "On" : "Off"}</Label>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Click the switch to toggle.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Slider                                    */
/* -------------------------------------------------------------------------- */
export function SliderPlayground() {
  const [value, setValue] = React.useState(50);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex w-full max-w-sm flex-col gap-3 self-center">
        <Slider value={[value]} onValueChange={(v) => setValue(v[0] ?? 0)} min={0} max={100} step={1} />
        <p className="text-sm text-muted-foreground">Value: {value}</p>
      </div>
      <Controls>
        <Field label="Value">
          <NumberInput value={value} onChange={setValue} min={0} max={100} />
        </Field>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Progress                                   */
/* -------------------------------------------------------------------------- */
export function ProgressPlayground() {
  const [value, setValue] = React.useState(60);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex w-full max-w-sm flex-col gap-3 self-center">
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 w-full overflow-hidden rounded-full bg-muted"
        >
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${value}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">{value}%</p>
      </div>
      <Controls>
        <Field label="Value">
          <NumberInput value={value} onChange={setValue} min={0} max={100} />
        </Field>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Sparkline                                  */
/* -------------------------------------------------------------------------- */
export function SparklinePlayground() {
  const [n, setN] = React.useState(24);
  const data = React.useMemo(
    () => Array.from({ length: n }, (_, i) => 50 + Math.sin(i / 3) * 20 + Math.random() * 8),
    [n]
  );
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Sparkline data={data} height={120} className="w-full max-w-md" />
      </div>
      <Controls>
        <Field label={`Points: ${n}`}>
          <Slider value={[n]} onValueChange={(v) => setN(v[0] ?? 12)} min={6} max={60} />
        </Field>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Bar                                     */
/* -------------------------------------------------------------------------- */
export function BarPlayground() {
  const data: BarDatum[] = [
    { label: "Mon", value: 32 },
    { label: "Tue", value: 51 },
    { label: "Wed", value: 18 },
    { label: "Thu", value: 74 },
    { label: "Fri", value: 42 },
    { label: "Sat", value: 9 },
    { label: "Sun", value: 27 },
  ];
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Bar data={data} className="w-full max-w-md" />
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Static data — week of activity.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Donut                                    */
/* -------------------------------------------------------------------------- */
export function DonutPlayground() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Donut
          data={[
            { label: "Direct", value: 412 },
            { label: "Search", value: 287 },
            { label: "Social", value: 95 },
            { label: "Email", value: 56 },
          ]}
        />
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Source attribution.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  FadeIn                                    */
/* -------------------------------------------------------------------------- */
export function FadeInPlayground() {
  const [key, setKey] = React.useState(0);
  const [direction, setDirection] = React.useState<"up" | "down" | "left" | "right" | "none">("up");
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center" key={key}>
        <FadeIn direction={direction} duration={600}>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm font-medium">Re-rendered</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The animation replays on every re-render.
            </p>
          </div>
        </FadeIn>
      </div>
      <Controls>
        <Field label="Direction">
          <Select value={direction} onChange={setDirection} options={[
            { value: "up", label: "up" },
            { value: "down", label: "down" },
            { value: "left", label: "left" },
            { value: "right", label: "right" },
            { value: "none", label: "none" },
          ]} />
        </Field>
        <Button size="sm" variant="outline" onClick={() => setKey((k) => k + 1)}>
          Replay
        </Button>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              StreamingText                                 */
/* -------------------------------------------------------------------------- */
export function StreamingTextPlayground() {
  const [text, setText] = React.useState(
    "Hello, I'm a AgeZero UI streaming text component. I'll type out at the speed you set."
  );
  const [speed, setSpeed] = React.useState(50);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center rounded-md border border-border bg-card p-4">
        <StreamingText text={text} speed={speed} />
      </div>
      <Controls>
        <Field label={`Speed: ${speed} cps`}>
          <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0] ?? 50)} min={5} max={200} />
        </Field>
        <Field label="Text">
          <TextInput value={text} onChange={setText} />
        </Field>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              TokenCounter                                 */
/* -------------------------------------------------------------------------- */
export function TokenCounterPlayground() {
  const [value, setValue] = React.useState(1234);
  const [max, setMax] = React.useState(4096);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <TokenCounter value={value} max={max} />
      </div>
      <Controls>
        <Field label="Value">
          <NumberInput value={value} onChange={setValue} min={0} max={100000} />
        </Field>
        <Field label="Max">
          <NumberInput value={max} onChange={setMax} min={100} max={1000000} step={100} />
        </Field>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              ModelSelector                                 */
/* -------------------------------------------------------------------------- */
const SAMPLE_MODELS: ModelOption[] = [
  { id: "claude-3.5", label: "Claude 3.5 Sonnet", vendor: "Anthropic", contextWindow: 200_000, costTier: "mid" },
  { id: "gpt-4o", label: "GPT-4o", vendor: "OpenAI", contextWindow: 128_000, costTier: "mid" },
  { id: "gpt-4o-mini", label: "GPT-4o mini", vendor: "OpenAI", contextWindow: 128_000, costTier: "low" },
  { id: "gemini-1.5", label: "Gemini 1.5 Pro", vendor: "Google", contextWindow: 1_000_000, costTier: "mid" },
  { id: "llama-3.1", label: "Llama 3.1 70B", vendor: "Meta", contextWindow: 128_000, costTier: "free" },
];
export function ModelSelectorPlayground() {
  const [value, setValue] = React.useState(SAMPLE_MODELS[0]!.id);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-start justify-center">
        <ModelSelector options={SAMPLE_MODELS} value={value} onChange={setValue} />
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Selected: <code>{value}</code></p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Citation                                   */
/* -------------------------------------------------------------------------- */
export function CitationPlayground() {
  const sources: CitationSource[] = [
    { id: "a", title: "Attention is All You Need", author: "Vaswani et al.", publishedAt: "2017", url: "arxiv.org/abs/1706.03762" },
    { id: "b", title: "GPT-4 Technical Report", author: "OpenAI", publishedAt: "2023", url: "arxiv.org/abs/2303.08774" },
    { id: "c", title: "Constitutional AI", author: "Anthropic", publishedAt: "2022", url: "anthropic.com/constitutional-ai" },
  ];
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center rounded-md border border-border bg-card p-4 text-sm leading-relaxed">
        <p>
          Modern transformers use self-attention
          <Citation source={sources[0]!} index={1} /> and have been scaled
          to billions of parameters
          <Citation source={sources[1]!} index={2} />. Recent work has
          shown that safety can be baked into training
          <Citation source={sources[2]!} index={3} />.
        </p>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Hover the markers.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 GlowCard                                   */
/* -------------------------------------------------------------------------- */
export function GlowCardPlayground() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <GlowCard className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold">Glow card</h3>
          <p className="mt-1 text-sm text-muted-foreground">Move your mouse across the card.</p>
        </GlowCard>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Cursor-tracked radial glow.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Tilt3D                                    */
/* -------------------------------------------------------------------------- */
export function Tilt3DPlayground() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Tilt3D className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold">3D tilt</h3>
          <p className="mt-1 text-sm text-muted-foreground">Hover for perspective tilt.</p>
        </Tilt3D>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Move your mouse.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Magnetic                                   */
/* -------------------------------------------------------------------------- */
export function MagneticPlayground() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center">
        <Magnetic strength={0.4}>
          <Button size="lg">Try to click me</Button>
        </Magnetic>
      </div>
      <Controls>
        <p className="text-xs text-muted-foreground">Button is pulled toward the cursor.</p>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             AnimatedNumber                                 */
/* -------------------------------------------------------------------------- */
export function AnimatedNumberPlayground() {
  const [value, setValue] = React.useState(1000);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-[1fr_200px]">
      <div className="flex items-center justify-center text-4xl font-semibold tabular-nums">
        <AnimatedNumber value={value} />
      </div>
      <Controls>
        <Field label="Value">
          <NumberInput value={value} onChange={setValue} min={0} max={100000} />
        </Field>
      </Controls>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             ScrollProgress                                 */
/* -------------------------------------------------------------------------- */
export function ScrollProgressPlayground() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1">
      <div className="rounded-md border border-border bg-card p-4 text-center text-xs text-muted-foreground">
        Scroll the playground to see the bar fill. The bar is fixed to the
        page, not the card.
      </div>
      <ScrollProgress />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Parallax                                   */
/* -------------------------------------------------------------------------- */
export function ParallaxPlayground() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1">
      <div className="rounded-md border border-border bg-card p-4 text-center text-xs text-muted-foreground">
        Scroll the playground to see the block move at a different rate
        from the page.
      </div>
      <Parallax speed={0.3} className="h-40">
        <div className="flex h-full items-center justify-center rounded-lg border border-border bg-primary/10 text-2xl font-semibold text-primary">
          Parallax
        </div>
      </Parallax>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Confetti                                   */
/* -------------------------------------------------------------------------- */
export function ConfettiPlayground() {
  const [fire, setFire] = React.useState(false);
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-1">
      <div className="flex flex-col items-center gap-3 rounded-md border border-border bg-card p-6 text-center text-sm">
        <p className="font-medium">Press the button to fire a confetti burst.</p>
        <Button onClick={() => setFire(true)}>Celebrate</Button>
      </div>
      <Confetti fire={fire} />
    </div>
  );
}