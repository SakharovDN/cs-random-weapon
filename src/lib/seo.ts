import type { Locale } from "@/i18n/config";

export const SITE_NAME = "CS2 Random Weapon";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://cs-random-weapon.vercel.app";
}

export interface SeoContent {
  title: string;
  description: string;
  keywords: string[];
  ogLocale: string;
}

export const SEO_CONTENT: Record<Locale, SeoContent> = {
  en: {
    title: "CS2 Random Weapon — Random Gun Picker for Counter-Strike 2",
    description:
      "Free Counter-Strike 2 random weapon picker. Filter by team, category, round budget and armor, exclude guns, and spin the slot to pick your loadout.",
    keywords: [
      "CS2",
      "Counter-Strike 2",
      "random weapon",
      "weapon picker",
      "gun randomizer",
      "loadout generator",
      "buy menu",
      "CS2 challenge",
      "slot machine",
    ],
    ogLocale: "en_US",
  },
  ru: {
    title: "CS2 Random Weapon — случайное оружие в Counter-Strike 2",
    description:
      "Бесплатный генератор случайного оружия для CS2. Фильтры по команде, категории, бюджету раунда и броне — крутите слот и получайте лоадаут.",
    keywords: [
      "CS2",
      "Counter-Strike 2",
      "случайное оружие",
      "рандом оружия",
      "генератор лоадаута",
      "меню закупки",
      "челлендж CS2",
      "слот",
    ],
    ogLocale: "ru_RU",
  },
};

export function getSeoContent(locale: Locale): SeoContent {
  return SEO_CONTENT[locale];
}

export function getJsonLd(locale: Locale = "en") {
  const seo = getSeoContent(locale);
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: siteUrl,
    description: seo.description,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: ["en", "ru"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    image: `${siteUrl}/bg/inferno-background.jpg`,
  };
}

export function applyClientSeo(locale: Locale): void {
  const seo = getSeoContent(locale);

  document.documentElement.lang = locale;
  document.title = seo.title;

  setMetaByName("description", seo.description);
  setMetaByName("keywords", seo.keywords.join(", "));
  setMetaByProperty("og:title", seo.title);
  setMetaByProperty("og:description", seo.description);
  setMetaByProperty("og:locale", seo.ogLocale);
  setMetaByProperty("twitter:title", seo.title);
  setMetaByProperty("twitter:description", seo.description);
}

function setMetaByName(name: string, content: string): void {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string): void {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}
