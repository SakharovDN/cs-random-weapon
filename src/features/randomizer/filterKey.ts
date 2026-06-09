import type { ArmorOption, TeamFilter, Weapon } from "@/domain";
import { categoryFilterKey, type CategoryFilterState } from "@/features/filters/categoryFilters";

export function buildFilterKey(params: {
  teamFilter: TeamFilter;
  categoryFilters: CategoryFilterState;
  budget: number | null;
  armor: ArmorOption;
  excludedIds: ReadonlySet<string>;
  filteredWeapons: Weapon[];
}): string {
  const budgetActive = params.budget !== null;

  return [
    params.teamFilter,
    categoryFilterKey(params.categoryFilters),
    params.budget ?? "all",
    budgetActive ? params.armor : "none",
    [...params.excludedIds].sort().join(","),
    params.filteredWeapons.map((weapon) => weapon.id).join(","),
  ].join("|");
}
