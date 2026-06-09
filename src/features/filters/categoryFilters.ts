import type { CategoryFilters, WeaponCategory } from "@/domain";

export type CategoryFilterState = CategoryFilters;

export const DEFAULT_CATEGORY_FILTERS: CategoryFilterState = {
  included: new Set(),
  excluded: new Set(),
};

function toggleInSet(
  set: ReadonlySet<WeaponCategory>,
  category: WeaponCategory
): Set<WeaponCategory> {
  const next = new Set(set);
  if (next.has(category)) {
    next.delete(category);
  } else {
    next.add(category);
  }
  return next;
}

export function selectAllCategories(
  filters: CategoryFilterState
): CategoryFilterState {
  return { included: new Set(), excluded: filters.excluded };
}

export function toggleIncludedCategory(
  filters: CategoryFilterState,
  category: WeaponCategory
): CategoryFilterState {
  const nextExcluded = new Set(filters.excluded);
  nextExcluded.delete(category);

  if (filters.included.size === 0) {
    return { included: new Set([category]), excluded: nextExcluded };
  }

  return {
    included: toggleInSet(filters.included, category),
    excluded: nextExcluded,
  };
}

export function toggleExcludedCategory(
  filters: CategoryFilterState,
  category: WeaponCategory
): CategoryFilterState {
  const wasExcluded = filters.excluded.has(category);
  const nextExcluded = toggleInSet(filters.excluded, category);

  if (wasExcluded) {
    return { included: filters.included, excluded: nextExcluded };
  }

  const nextIncluded = new Set(filters.included);
  nextIncluded.delete(category);

  return { included: nextIncluded, excluded: nextExcluded };
}

export function categoryFilterKey(filters: CategoryFilterState): string {
  const included = [...filters.included].sort().join(",") || "all";
  const excluded = [...filters.excluded].sort().join(",") || "none";
  return `${included}|${excluded}`;
}
