"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { WEAPON_CATEGORIES, type TeamFilter, type WeaponCategory } from "@/domain";

export function useTeamFilterOptions(): { value: TeamFilter; label: string }[] {
  const t = useTranslations("teams");

  return useMemo(
    () => [
      { value: "all", label: t("all") },
      { value: "ct", label: t("ct") },
      { value: "t", label: t("t") },
    ],
    [t]
  );
}

export function useCategoryLabel(category: WeaponCategory | "all"): string {
  const t = useTranslations("categories");
  return t(category);
}

export function useWeaponCategories(): WeaponCategory[] {
  return WEAPON_CATEGORIES;
}
