"use client";

import { type WeaponCategory } from "@/domain";
import { useTranslations } from "next-intl";
import { useCategoryLabel, useWeaponCategories } from "@/i18n";
import { FilterChip } from "@/shared/components/FilterChip";
import {
  selectAllCategories,
  toggleExcludedCategory,
  toggleIncludedCategory,
  type CategoryFilterState,
} from "./categoryFilters";

interface CategoryFilterPanelProps {
  value: CategoryFilterState;
  onChange: (value: CategoryFilterState) => void;
  disabled?: boolean;
}

export function CategoryFilterPanel({
  value,
  onChange,
  disabled = false,
}: CategoryFilterPanelProps) {
  const t = useTranslations("filters");
  const categories = useWeaponCategories();
  const allLabel = useCategoryLabel("all");
  const allIncluded = value.included.size === 0;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {t("categories")}
        </p>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={allIncluded}
            disabled={disabled}
            onClick={() => onChange(selectAllCategories(value))}
          >
            {allLabel}
          </FilterChip>
          {categories.map((category) => (
            <CategoryChip
              key={category}
              category={category}
              active={!allIncluded && value.included.has(category)}
              disabled={disabled}
              onClick={() => onChange(toggleIncludedCategory(value, category))}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {t("excludeCategories")}
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <CategoryChip
              key={category}
              category={category}
              tone="exclude"
              active={value.excluded.has(category)}
              disabled={disabled}
              onClick={() => onChange(toggleExcludedCategory(value, category))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryChip({
  category,
  active,
  disabled,
  onClick,
  tone = "default",
}: {
  category: WeaponCategory;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  tone?: "default" | "exclude";
}) {
  const label = useCategoryLabel(category);

  return (
    <FilterChip active={active} tone={tone} disabled={disabled} onClick={onClick}>
      {label}
    </FilterChip>
  );
}

export {
  DEFAULT_CATEGORY_FILTERS,
  categoryFilterKey,
  type CategoryFilterState,
} from "./categoryFilters";
