"use client";

import {
  formatPrice,
  getWeaponTeams,
  groupWeaponsByCategory,
  type Weapon,
  type WeaponCategory,
} from "@/domain";
import { useTranslations } from "next-intl";
import { useCategoryLabel, useWeaponCategories } from "@/i18n";
import { TeamBadge } from "@/shared/components/TeamBadge";
import { WeaponImage } from "@/shared/components/WeaponImage";

interface WeaponExclusionPanelProps {
  excludedIds: ReadonlySet<string>;
  onToggle: (weaponId: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

function WeaponExclusionCard({
  weapon,
  excluded,
  disabled,
  onToggle,
}: {
  weapon: Weapon;
  excluded: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations("exclusions");
  const teams = getWeaponTeams(weapon);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onToggle}
      title={excluded ? t("includeInPool") : t("excludeFromPool")}
      className={[
        "flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-lg border px-2 py-2 text-center transition-all",
        "disabled:cursor-not-allowed disabled:opacity-50",
        excluded
          ? "border-red-900/50 bg-red-950/20 opacity-65 hover:opacity-80"
          : "border-slate-800 bg-slate-950/40 hover:border-slate-600 hover:bg-slate-900/60",
      ].join(" ")}
    >
      <WeaponImage weapon={weapon} size={52} grayscale={excluded} />

      <p
        className={[
          "line-clamp-2 w-full text-xs font-semibold uppercase leading-snug tracking-wide sm:text-sm",
          excluded ? "text-slate-500 line-through" : "text-slate-200",
        ].join(" ")}
      >
        {weapon.name}
      </p>

      <p className="font-mono text-xs leading-none text-amber-400/80">
        {formatPrice(weapon.price)}
      </p>

      <div className="flex flex-wrap gap-0.5">
        {teams.map((team) => (
          <TeamBadge key={team} team={team} />
        ))}
      </div>
    </button>
  );
}

export function WeaponExclusionPanel({
  excludedIds,
  onToggle,
  onClear,
  disabled = false,
}: WeaponExclusionPanelProps) {
  const t = useTranslations("exclusions");
  const categories = useWeaponCategories();
  const groupedWeapons = groupWeaponsByCategory();
  const excludedCount = excludedIds.size;

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 backdrop-blur-sm sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold uppercase tracking-wide text-white">
          {t("title")}
        </h2>

        {excludedCount > 0 && (
          <button
            type="button"
            disabled={disabled}
            onClick={onClear}
            className="shrink-0 cursor-pointer rounded border border-slate-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400 transition hover:border-slate-500 hover:text-white disabled:opacity-50"
          >
            {t("reset", { count: excludedCount })}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            weapons={groupedWeapons[category]}
            excludedIds={excludedIds}
            disabled={disabled}
            onToggle={onToggle}
          />
        ))}
      </div>
    </section>
  );
}

function CategorySection({
  category,
  weapons,
  excludedIds,
  disabled,
  onToggle,
}: {
  category: WeaponCategory;
  weapons: Weapon[];
  excludedIds: ReadonlySet<string>;
  disabled?: boolean;
  onToggle: (weaponId: string) => void;
}) {
  const label = useCategoryLabel(category);

  return (
    <div>
      <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400/70">
        {label}
      </h3>
      <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {weapons.map((weapon) => (
          <WeaponExclusionCard
            key={weapon.id}
            weapon={weapon}
            excluded={excludedIds.has(weapon.id)}
            disabled={disabled}
            onToggle={() => onToggle(weapon.id)}
          />
        ))}
      </div>
    </div>
  );
}
