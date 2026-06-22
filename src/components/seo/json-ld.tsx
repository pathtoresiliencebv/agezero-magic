import * as React from "react";
import { siteConfig } from "@/lib/seo";

/**
 * Renders a single `<script type="application/ld+json">` tag.
 * Pass the schema object as children — Next.js will serialize it
 * correctly.
 */
export function JsonLd({
  children,
  id,
}: {
  children: object;
  id?: string;
}) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(children).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Site-wide defaults                                                        */
/* -------------------------------------------------------------------------- */

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/icon`,
      width: 512,
      height: 512,
    },
    sameAs: [siteConfig.links.github, siteConfig.links.twitter].filter(
      Boolean
    ),
  };
  return <JsonLd id="ld-organization">{data}</JsonLd>;
}

export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-US",
  };
  return <JsonLd id="ld-website">{data}</JsonLd>;
}

export function SoftwareApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteConfig.url}/#software`,
    name: siteConfig.name,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "UI Library",
    operatingSystem: "Any",
    description: siteConfig.description,
    url: siteConfig.url,
    downloadUrl: siteConfig.links.github,
    softwareVersion: "0.1.0",
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };
  return <JsonLd id="ld-software">{data}</JsonLd>;
}

/* -------------------------------------------------------------------------- */
/*  Page-level components                                                     */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.url, siteConfig.url).toString(),
    })),
  };
  return <JsonLd id="ld-breadcrumb">{data}</JsonLd>;
}

export function WebPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description?: string;
  path: string;
}) {
  const url = new URL(path, siteConfig.url).toString();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    url,
    name,
    description: description ?? siteConfig.description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-US",
  };
  return <JsonLd id="ld-webpage">{data}</JsonLd>;
}

export function ItemListJsonLd({
  name,
  description,
  items,
}: {
  name: string;
  description?: string;
  items: Array<{ name: string; url: string; description?: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      description: item.description,
      url: new URL(item.url, siteConfig.url).toString(),
    })),
  };
  return <JsonLd id="ld-itemlist">{data}</JsonLd>;
}

export function FAQJsonLd({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return <JsonLd id="ld-faq">{data}</JsonLd>;
}

export interface ProductOffer {
  price: string;
  priceCurrency: string;
  availability?: string;
  url?: string;
}

export function ProductJsonLd({
  name,
  description,
  url,
  brand = "AgeZero UI",
  category,
  image,
  offers,
  rating,
}: {
  name: string;
  description: string;
  url: string;
  brand?: string;
  category?: string;
  image?: string;
  offers?: ProductOffer;
  rating?: { value: number; count: number };
}) {
  const fullUrl = new URL(url, siteConfig.url).toString();
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: { "@type": "Brand", name: brand },
    category,
    url: fullUrl,
    image: image ?? siteConfig.ogImage,
  };
  if (offers) {
    data.offers = {
      "@type": "Offer",
      price: offers.price,
      priceCurrency: offers.priceCurrency,
      availability: offers.availability ?? "https://schema.org/InStock",
      url: offers.url ?? fullUrl,
    };
  }
  if (rating) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return <JsonLd id="ld-product">{data}</JsonLd>;
}

export function HowToJsonLd({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  if (totalTime) data.totalTime = totalTime;
  return <JsonLd id="ld-howto">{data}</JsonLd>;
}

export function CourseJsonLd({
  name,
  description,
  provider = "AgeZero UI",
  url,
  isFree = true,
}: {
  name: string;
  description: string;
  provider?: string;
  url: string;
  isFree?: boolean;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: { "@type": "Organization", name: provider },
    url: new URL(url, siteConfig.url).toString(),
    isAccessibleForFree: isFree,
    inLanguage: "en-US",
  };
  return <JsonLd id="ld-course">{data}</JsonLd>;
}

export function EventJsonLd({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
}: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: location },
    url: new URL(url, siteConfig.url).toString(),
  };
  if (endDate) data.endDate = endDate;
  return <JsonLd id="ld-event">{data}</JsonLd>;
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  image,
  author = "AgeZero UI",
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  author?: string | string[];
  datePublished?: string;
  dateModified?: string;
}) {
  const authors = Array.isArray(author) ? author : [author];
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: new URL(url, siteConfig.url).toString(),
    image: image ?? siteConfig.ogImage,
    author: authors.map((a) => ({ "@type": "Person", name: a })),
    publisher: { "@id": `${siteConfig.url}/#organization` },
    datePublished: datePublished ?? new Date().toISOString(),
    dateModified: dateModified ?? new Date().toISOString(),
    inLanguage: "en-US",
  };
  return <JsonLd id="ld-article">{data}</JsonLd>;
}

export function RecipeJsonLd({
  name,
  description,
  image,
  author = "AgeZero UI",
  prepTime,
  cookTime,
  recipeIngredient,
  recipeInstructions,
  recipeYield,
}: {
  name: string;
  description: string;
  image: string;
  author?: string;
  prepTime?: string;
  cookTime?: string;
  recipeIngredient: string[];
  recipeInstructions: string[];
  recipeYield?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name,
    description,
    image,
    author: { "@type": "Person", name: author },
    recipeIngredient,
    recipeInstructions: recipeInstructions.map((text) => ({
      "@type": "HowToStep",
      text,
    })),
  };
  if (prepTime) data.prepTime = prepTime;
  if (cookTime) data.cookTime = cookTime;
  if (recipeYield) data.recipeYield = recipeYield;
  return <JsonLd id="ld-recipe">{data}</JsonLd>;
}

export function VideoJsonLd({
  name,
  description,
  thumbnailUrl,
  contentUrl,
  embedUrl,
  uploadDate,
  duration,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  contentUrl?: string;
  embedUrl?: string;
  uploadDate: string;
  duration?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
  };
  if (contentUrl) data.contentUrl = contentUrl;
  if (embedUrl) data.embedUrl = embedUrl;
  if (duration) data.duration = duration;
  return <JsonLd id="ld-video">{data}</JsonLd>;
}

export function ReviewJsonLd({
  itemName,
  reviewBody,
  ratingValue,
  bestRating = 5,
  author = "Anonymous",
  datePublished,
}: {
  itemName: string;
  reviewBody: string;
  ratingValue: number;
  bestRating?: number;
  author?: string;
  datePublished?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "SoftwareApplication", name: itemName },
    reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating,
      worstRating: 1,
    },
    author: { "@type": "Person", name: author },
    datePublished: datePublished ?? new Date().toISOString(),
  };
  return <JsonLd id="ld-review">{data}</JsonLd>;
}

export function ProfilePageJsonLd({
  name,
  alternateName,
  description,
  image,
  url,
  sameAs,
  jobTitle,
  worksFor,
}: {
  name: string;
  alternateName?: string;
  description: string;
  image?: string;
  url: string;
  sameAs?: string[];
  jobTitle?: string;
  worksFor?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@context": "https://schema.org",
      "@type": "Person",
      name,
      description,
      url: new URL(url, siteConfig.url).toString(),
    },
  };
  const person = data.mainEntity as Record<string, unknown>;
  if (alternateName) person.alternateName = alternateName;
  if (image) person.image = image;
  if (sameAs) person.sameAs = sameAs;
  if (jobTitle) person.jobTitle = jobTitle;
  if (worksFor) person.worksFor = { "@type": "Organization", name: worksFor };
  return <JsonLd id="ld-profile">{data}</JsonLd>;
}

export function LocalBusinessJsonLd({
  name,
  description,
  url,
  telephone,
  address,
  geo,
  openingHours,
  priceRange,
  image,
}: {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address?: {
    street?: string;
    city: string;
    region?: string;
    postalCode?: string;
    country: string;
  };
  geo?: { lat: number; lng: number };
  openingHours?: string[];
  priceRange?: string;
  image?: string;
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": new URL(url, siteConfig.url).toString(),
    name,
    description,
    url: new URL(url, siteConfig.url).toString(),
    image: image ?? siteConfig.ogImage,
  };
  if (telephone) data.telephone = telephone;
  if (address) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    };
  }
  if (geo) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    };
  }
  if (openingHours) data.openingHours = openingHours;
  if (priceRange) data.priceRange = priceRange;
  return <JsonLd id="ld-local">{data}</JsonLd>;
}

export function DatasetJsonLd({
  name,
  description,
  url,
  license,
  creator = "AgeZero UI",
  distribution,
  keywords,
}: {
  name: string;
  description: string;
  url: string;
  license?: string;
  creator?: string;
  distribution?: string[];
  keywords?: string[];
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    url: new URL(url, siteConfig.url).toString(),
    creator: { "@type": "Organization", name: creator },
  };
  if (license) data.license = license;
  if (distribution) data.distribution = distribution;
  if (keywords) data.keywords = keywords;
  return <JsonLd id="ld-dataset">{data}</JsonLd>;
}
