import {
  ARMOR_OPTIONS,
  WEAPON_CATEGORIES,
  WEAPONS,
  type ArmorOption,
  type TeamFilter,
  type WeaponCategory,
} from "@/domain";
import type { CategoryFilterState } from "@/features/filters/categoryFilters";

export const RANDOMIZER_SETTINGS_KEY = "cs-random-weapon:settings";
export const RANDOMIZER_SETTINGS_VERSION = 1;

export interface RandomizerSettings {
  teamFilter: TeamFilter;
  categoryFilters: CategoryFilterState;
  budgetInput: string;
  armor: ArmorOption;
  excludedIds: Set<string>;
}

export interface StoredRandomizerSettings {
  version: number;
  teamFilter: TeamFilter;
  categoryFilters: {
    included: WeaponCategory[];
    excluded: WeaponCategory[];
  };
  budgetInput: string;
  armor: ArmorOption;
  excludedIds: string[];
}

const VALID_TEAM_FILTERS = new Set<TeamFilter>(["all", "ct", "t"]);
const VALID_ARMOR = new Set<ArmorOption>(ARMOR_OPTIONS.map((option) => option.value));
const VALID_CATEGORIES = new Set<WeaponCategory>(WEAPON_CATEGORIES);
const VALID_WEAPON_IDS = new Set(WEAPONS.map((weapon) => weapon.id));

export function createDefaultRandomizerSettings(): RandomizerSettings {
  return {
    teamFilter: "all",
    categoryFilters: {
      included: new Set(),
      excluded: new Set(),
    },
    budgetInput: "",
    armor: "none",
    excludedIds: new Set(),
  };
}

export function serializeRandomizerSettings(
  settings: RandomizerSettings
): StoredRandomizerSettings {
  return {
    version: RANDOMIZER_SETTINGS_VERSION,
    teamFilter: settings.teamFilter,
    categoryFilters: {
      included: [...settings.categoryFilters.included],
      excluded: [...settings.categoryFilters.excluded],
    },
    budgetInput: settings.budgetInput,
    armor: settings.armor,
    excludedIds: [...settings.excludedIds],
  };
}

function parseCategoryList(value: unknown): WeaponCategory[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is WeaponCategory =>
      typeof item === "string" && VALID_CATEGORIES.has(item as WeaponCategory)
  );
}

function parseExcludedIds(value: unknown): Set<string> {
  if (!Array.isArray(value)) return new Set();

  return new Set(
    value.filter(
      (item): item is string => typeof item === "string" && VALID_WEAPON_IDS.has(item)
    )
  );
}

export function deserializeRandomizerSettings(
  value: unknown
): RandomizerSettings | null {
  if (!value || typeof value !== "object") return null;

  const raw = value as Partial<StoredRandomizerSettings>;
  if (raw.version !== RANDOMIZER_SETTINGS_VERSION) return null;

  const teamFilter = VALID_TEAM_FILTERS.has(raw.teamFilter as TeamFilter)
    ? (raw.teamFilter as TeamFilter)
    : "all";

  const armor = VALID_ARMOR.has(raw.armor as ArmorOption)
    ? (raw.armor as ArmorOption)
    : "none";

  const budgetInput = typeof raw.budgetInput === "string" ? raw.budgetInput : "";

  const included = parseCategoryList(raw.categoryFilters?.included);
  const excluded = parseCategoryList(raw.categoryFilters?.excluded);

  const includedSet = new Set(included);
  const excludedSet = new Set(excluded.filter((category) => !includedSet.has(category)));

  return {
    teamFilter,
    categoryFilters: { included: includedSet, excluded: excludedSet },
    budgetInput,
    armor,
    excludedIds: parseExcludedIds(raw.excludedIds),
  };
}

export function loadRandomizerSettings(): RandomizerSettings | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(RANDOMIZER_SETTINGS_KEY);
    if (!raw) return null;

    return deserializeRandomizerSettings(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveRandomizerSettings(settings: RandomizerSettings): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      RANDOMIZER_SETTINGS_KEY,
      JSON.stringify(serializeRandomizerSettings(settings))
    );
  } catch {
    // Quota exceeded or private mode — ignore silently.
  }
}

export function clearRandomizerSettings(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(RANDOMIZER_SETTINGS_KEY);
}

/** Defaults used until localStorage is read on the client. */
export const INITIAL_RANDOMIZER_SETTINGS: RandomizerSettings =
  createDefaultRandomizerSettings();
