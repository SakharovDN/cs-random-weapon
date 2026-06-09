"use client";

import { formatPrice, type Weapon } from "@/domain";
import { useTranslations } from "next-intl";
import { WeaponImage } from "@/shared/components/WeaponImage";

interface WinnerOverlayProps {
  weapon: Weapon;
}

export function WinnerOverlay({ weapon }: WinnerOverlayProps) {
  const t = useTranslations("slot");

  return (
    <div className="slot-winner-overlay absolute inset-0 z-30 flex flex-col items-center justify-center rounded-2xl bg-slate-950/90 px-4 text-center backdrop-blur-sm">
      <WeaponImage weapon={weapon} size={96} className="mx-auto" />
      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-amber-400/80">
        {t("result")}
      </p>
      <p className="mt-1 text-xl font-bold uppercase text-white">{weapon.name}</p>
      <p className="mt-0.5 font-mono text-base text-amber-300">{formatPrice(weapon.price)}</p>
    </div>
  );
}
