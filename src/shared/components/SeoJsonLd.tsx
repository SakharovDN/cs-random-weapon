import { getJsonLd, getSiteUrl } from "@/lib/seo";

export function SeoJsonLd() {
  const jsonLd = getJsonLd("en");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function SeoHiddenSummary() {
  const siteUrl = getSiteUrl();

  return (
    <div className="sr-only">
      <p>
        CS2 Random Weapon is a free Counter-Strike 2 loadout randomizer with team filters,
        weapon categories, round budget, armor selection, exclusions, and a slot-style
        weapon picker. Available in English and Russian.
      </p>
      <a href={siteUrl}>CS2 Random Weapon</a>
    </div>
  );
}
