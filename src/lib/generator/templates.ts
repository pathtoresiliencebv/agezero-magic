/**
 * Built-in component templates for the AgeZero UI generator.
 *
 * Used as a fallback when no LLM API key is configured, so the
 * generator still produces real, working AgeZero UI code from a plain
 * description. Each template returns a small TSX snippet ready to
 * paste into a project.
 */

export interface TemplateMatch {
  /** Trigger keyword (lowercase) that selects this template. */
  keyword: string;
  /** Human title shown in the result header. */
  title: string;
  /** Short description. */
  description: string;
  /** Code to render in the preview/code panel. */
  code: string;
}

export const TEMPLATES: TemplateMatch[] = [
  {
    keyword: "button",
    title: "Button",
    description: "A primary call-to-action button with an icon.",
    code: `import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/icons";

export function CTAButton() {
  return (
    <Button size="lg">
      Get started <ArrowRight size={16} />
    </Button>
  );
}`,
  },
  {
    keyword: "card",
    title: "Card",
    description: "A pricing/feature card with header, content, and footer.",
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "@/components/icons";

export function PricingCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Pro</CardTitle>
        <CardDescription>For power users and small teams.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-semibold">$29<span className="text-sm text-muted-foreground">/mo</span></div>
        <ul className="mt-4 space-y-2 text-sm">
          {["Unlimited projects", "Priority support", "Custom domains"].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check size={14} className="text-primary" /> {f}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Subscribe</Button>
      </CardFooter>
    </Card>
  );
}`,
  },
  {
    keyword: "hero",
    title: "Hero",
    description: "A big headline, tagline, and two CTAs.",
    code: `import { Hero } from "@/components/blocks/hero";

export default function LandingHero() {
  return (
    <Hero
      title="Ship faster with AgeZero UI."
      subtitle="A premium React UI kit for Next.js, built for the AI era."
      primaryCta={{ label: "Get started", href: "#" }}
      secondaryCta={{ label: "Browse", href: "#" }}
    />
  );
}`,
  },
  {
    keyword: "feature",
    title: "Feature grid",
    description: "A 3-column feature grid with icons.",
    code: `import { FeatureGrid } from "@/components/blocks/feature-grid";
import { Sparkles, Wrench, Brain } from "@/components/icons";

export function Features() {
  return (
    <FeatureGrid
      title="What's in the box"
      features={[
        { icon: Sparkles, title: "Polished", description: "Hand-crafted, accessible UI." },
        { icon: Wrench, title: "Composable", description: "Copy the bits you need." },
        { icon: Brain, title: "AI-native", description: "Built for the agent era." },
      ]}
    />
  );
}`,
  },
  {
    keyword: "chat",
    title: "Chat UI",
    description: "A live chat thread with user + assistant messages.",
    code: `import {
  Conversation,
  ConversationContent,
} from "@/components/ai/conversation";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ai/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai/prompt-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ChatThread() {
  return (
    <div className="rounded-xl border border-border/60 bg-card">
      <Conversation className="h-96">
        <ConversationContent className="gap-3 p-4">
          <Message role="user">
            <MessageAvatar role="user">
              <Avatar><AvatarFallback>You</AvatarFallback></Avatar>
            </MessageAvatar>
            <MessageContent>Hello!</MessageContent>
          </Message>
          <Message role="assistant">
            <MessageAvatar role="assistant">
              <Avatar><AvatarFallback>AI</AvatarFallback></Avatar>
            </MessageAvatar>
            <MessageContent>Hi there! How can I help?</MessageContent>
          </Message>
        </ConversationContent>
      </Conversation>
      <div className="border-t p-3">
        <PromptInput>
          <PromptInputTextarea placeholder="Send a message..." />
          <PromptInputSubmit />
        </PromptInput>
      </div>
    </div>
  );
}`,
  },
  {
    keyword: "pricing",
    title: "Pricing",
    description: "A 3-tier pricing table.",
    code: `import { Pricing } from "@/components/blocks/pricing";

export function PricingTable() {
  return (
    <Pricing
      title="Pricing"
      tiers={[
        {
          name: "Hobby",
          price: "$0",
          period: " / forever",
          features: ["All components", "Community support"],
          cta: { label: "Get started", href: "#" },
        },
        {
          name: "Pro",
          price: "$29",
          period: " / month",
          highlighted: true,
          features: ["Everything in Hobby", "Private registry", "Priority support"],
          cta: { label: "Subscribe", href: "#" },
        },
        {
          name: "Team",
          price: "Custom",
          features: ["Custom SLA", "On-prem registry"],
          cta: { label: "Contact us", href: "#" },
        },
      ]}
    />
  );
}`,
  },
  {
    keyword: "marquee",
    title: "Marquee",
    description: "An infinite scrolling logo strip.",
    code: `import { Marquee } from "@/components/blocks/marquee";

export function LogoMarquee() {
  return (
    <Marquee
      items={[
        { content: <span className="text-2xl font-semibold">Vercel</span> },
        { content: <span className="text-2xl font-semibold">Stripe</span> },
        { content: <span className="text-2xl font-semibold">Linear</span> },
        { content: <span className="text-2xl font-semibold">OpenAI</span> },
      ]}
      speed={25}
    />
  );
}`,
  },
  {
    keyword: "gradient",
    title: "Gradient text",
    description: "Animated gradient text effect.",
    code: `import { GradientText } from "@/components/blocks/gradient-text";

export function Headline() {
  return (
    <h1 className="text-6xl font-semibold tracking-tight">
      Build with{" "}
      <GradientText animate>AgeZero UI</GradientText>
    </h1>
  );
}`,
  },
];

/**
 * Find the best template match for a free-form description.
 * Returns the first keyword hit, or undefined if nothing matches.
 */
export function findTemplate(prompt: string): TemplateMatch | undefined {
  const lower = prompt.toLowerCase();
  return TEMPLATES.find((t) => lower.includes(t.keyword));
}