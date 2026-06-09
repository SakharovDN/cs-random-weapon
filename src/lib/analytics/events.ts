import type { ArmorOption, TeamFilter, Weapon, WeaponCategory } from "@/domain";
import { captureEvent } from "./client";

export interface FilterSummary {
  team: TeamFilter;
  poolSize: number;
  budget: number | null;
  armor: ArmorOption;
  excludedWeapons: number;
  excludedCategories: number;
  includedCategories: number;
}

export function buildFilterSummary(input: {
  teamFilter: TeamFilter;
  filteredWeapons: Weapon[];
  budget: number | null;
  armor: ArmorOption;
  excludedIds: ReadonlySet<string>;
  categoryFilters: {
    included: ReadonlySet<WeaponCategory>;
    excluded: ReadonlySet<WeaponCategory>;
  };
}): FilterSummary {
  return {
    team: input.teamFilter,
    poolSize: input.filteredWeapons.length,
    budget: input.budget,
    armor: input.armor,
    excludedWeapons: input.excludedIds.size,
    excludedCategories: input.categoryFilters.excluded.size,
    includedCategories: input.categoryFilters.included.size,
  };
}

export function trackPageView(path: string = window.location.pathname): void {
  track("page_view", { path });
}

export function trackSpin(summary: FilterSummary): void {
  track("spin", { ...summary });
}

export function trackSpinComplete(
  summary: FilterSummary,
  weapon: Pick<Weapon, "id" | "category" | "price">
): void {
  track("spin_complete", {
    ...summary,
    weaponId: weapon.id,
    weaponCategory: weapon.category,
    weaponPrice: weapon.price,
  });
}

export function trackSpinBlocked(
  summary: FilterSummary,
  reason: "empty_pool" | "spinning"
): void {
  track("spin_blocked", { ...summary, reason });
}

export function trackFilterChange(summary: FilterSummary): void {
  track("filter_change", { ...summary });
}

export function trackWeaponExcluded(input: {
  weaponId: string;
  excludedCount: number;
  action: "exclude" | "include";
}): void {
  track("weapon_excluded", input);
}

export function trackLocaleChange(locale: string, previousLocale: string): void {
  track("locale_change", { locale, previousLocale });
}

export function trackImageLoadError(input: {
  kind: "weapon" | "armor";
  id: string;
  src: string;
}): void {
  track("image_load_error", input);
}

function track(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  try {
    captureEvent(event, properties);
  } catch {
    // Analytics must never break the app.
  }
}
