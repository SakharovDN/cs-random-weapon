import { getWeaponBudget } from "./budget";
import type {
  CategoryFilters,
  TeamFilter,
  Weapon,
  WeaponCategory,
} from "./types";
import { WEAPONS } from "./catalog";

export function isCategoryIncluded(
  category: WeaponCategory,
  filters: CategoryFilters
): boolean {
  if (filters.excluded.has(category)) return false;
  if (filters.included.size === 0) return true;
  return filters.included.has(category);
}

export function isWeaponExcluded(
  weapon: Weapon,
  excludedIds: ReadonlySet<string>
): boolean {
  return excludedIds.has(weapon.id);
}

export function matchesTeamFilter(weapon: Weapon, teamFilter: TeamFilter): boolean {
  if (teamFilter === "ct" && weapon.team === "t") return false;
  if (teamFilter === "t" && weapon.team === "ct") return false;
  return true;
}

export interface WeaponFilterCriteria {
  teamFilter: TeamFilter;
  categoryFilters: CategoryFilters;
  budget: number | null;
  armorCost?: number;
  excludedIds?: ReadonlySet<string>;
}

export function filterWeapons({
  teamFilter,
  categoryFilters,
  budget,
  armorCost = 0,
  excludedIds = new Set(),
}: WeaponFilterCriteria): Weapon[] {
  const weaponBudget = getWeaponBudget(budget, armorCost);

  return WEAPONS.filter((weapon) => {
    if (!matchesTeamFilter(weapon, teamFilter)) return false;
    if (!isCategoryIncluded(weapon.category, categoryFilters)) return false;
    if (weaponBudget !== null && weapon.price > weaponBudget) return false;
    if (isWeaponExcluded(weapon, excludedIds)) return false;
    return true;
  });
}
