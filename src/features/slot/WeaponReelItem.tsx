"use client";

import { formatPrice, getTeamBadge, type Weapon } from "@/domain";
import { useCategoryLabel } from "@/i18n";
import { WeaponImage } from "@/shared/components/WeaponImage";
import { ITEM_HEIGHT } from "./constants";

interface WeaponReelItemProps {
  weapon: Weapon;
}

export function WeaponReelItem({ weapon }: WeaponReelItemProps) {
  const categoryLabel = useCategoryLabel(weapon.category);

  return (
    <div
      className="flex items-center gap-3 border-b border-slate-800/80 px-3"
      style={{ height: ITEM_HEIGHT }}
    >
      <WeaponImage weapon={weapon} size={64} className="shrink-0" />
      <div className="min-w-0 flex-1 text-left">
        <span className="block truncate text-base font-bold uppercase tracking-wide text-white">
          {weapon.name}
        </span>
        <span className="mt-0.5 block font-mono text-sm text-amber-400">
          {formatPrice(weapon.price)}
        </span>
        <span className="mt-0.5 block text-[10px] uppercase tracking-widest text-slate-500">
          {categoryLabel} · {getTeamBadge(weapon.team)}
        </span>
      </div>
    </div>
  );
}
