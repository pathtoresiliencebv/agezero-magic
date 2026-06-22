import type { Metadata } from "next";

/**
 * Site-wide SEO configuration. The `createMetadata` factory below
 * produces per-page `Metadata` objects based on this config.
 */
export const siteConfig = {
  name: "AgeZero UI",
  shortName: "JSN",
  description:
    "A premium React UI kit for Next.js — shadcn-grade primitives, AI/Agent components, motion elements, charts, themes, and a CLI. Ship AI products in an afternoon.",
  url: "https://agezero-ui.vercel.app",
  ogImage: "https://agezero-ui.vercel.app/og",
  twitter: "@jsnui",
  github: "https://github.com/javashn/agezero-ui",
  creator: "AgeZero UI",
  publisher: "AgeZero UI",
  locale: "en_US",
  category: "Developer Tools",
  keywords: [
    "react ui kit",
    "next.js ui",
    "shadcn",
    "tailwind components",
    "ai components",
    "agent ui",
    "magic ui",
    "framer motion",
    "registry",
    "cli",
    "next-seo",
  ],
  links: {
    github: "https://github.com/javashn/agezero-ui",
    twitter: "https://twitter.com/jsnui",
    registry: "https://agezero-ui.vercel.app/registry.json",
  },
} as const;

export interface CreateMetadataInput {
  /** Page-specific title (will be templated with site name). */
  title: string;
  /** Page-specific description. */
  description?: string;
  /** Path on the site, e.g. "/components". Used for canonical + OG URL. */
  path?: string;
  /** Absolute URL to a custom OG image. Defaults to the dynamic /og route. */
  image?: string;
  /** OpenGraph type. */
  type?: "website" | "article" | "product" | "profile";
  /** Article-specific metadata. */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  /** Whether the page should be indexed. */
  indexable?: boolean;
  /** Override the canonical URL. */
  canonical?: string;
  /** Keywords for this page. */
  keywords?: string[];
  /** Locale override. */
  locale?: string;
}

/**
 * Factory for the Next.js App Router `Metadata` object. Every page
 * should `export const metadata = createMetadata({ ... })`.
 */
export function createMetadata(input: CreateMetadataInput): Metadata {
  const {
    title,
    description = siteConfig.description,
    path = "/",
    image,
    type = "website",
    article,
    indexable = true,
    canonical,
    keywords,
    locale = siteConfig.locale,
  } = input;

  // The root layout applies a "%s · AgeZero UI" template. We just send
  // the page-specific title; the template adds the site name.
  const fullTitle = title;
  const url = canonical ?? new URL(path, siteConfig.url).toString();
  const ogImage = image ?? siteConfig.ogImage;
  const ogType: "website" | "article" | "profile" =
    type === "product" ? "website" : type;

  return {
    title: fullTitle,
    description,
    keywords: [...(keywords ?? siteConfig.keywords)],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: ogType,
      locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: siteConfig.twitter,
      site: siteConfig.twitter,
    },
    other: {},
  };
}

/* -------------------------------------------------------------------------- */
/*  Schema.org helpers                                                        */
/* -------------------------------------------------------------------------- */

export const SCHEMA = {
  Organization: "https://schema.org/Organization",
  WebSite: "https://schema.org/WebSite",
  WebPage: "https://schema.org/WebPage",
  SoftwareApplication: "https://schema.org/SoftwareApplication",
  ItemList: "https://schema.org/ItemList",
  BreadcrumbList: "https://schema.org/BreadcrumbList",
  FAQPage: "https://schema.org/FAQPage",
  Product: "https://schema.org/Product",
  Article: "https://schema.org/Article",
  BlogPosting: "https://schema.org/BlogPosting",
  NewsArticle: "https://schema.org/NewsArticle",
  HowTo: "https://schema.org/HowTo",
  Course: "https://schema.org/Course",
  Event: "https://schema.org/Event",
  Recipe: "https://schema.org/Recipe",
  VideoObject: "https://schema.org/VideoObject",
  Review: "https://schema.org/Review",
  ProfilePage: "https://schema.org/ProfilePage",
  LocalBusiness: "https://schema.org/LocalBusiness",
} as const;
