"use client";

import { formatPrice, type Weapon } from "@/domain";
import { useTranslations } from "next-intl";
import { SlotMachine } from "@/features/slot/SlotMachine";

interface SpinPanelProps {
  filteredWeapons: Weapon[];
  winner: Weapon | null;
  spinning: boolean;
  spinId: number;
  filterKey: string;
  canSpin: boolean;
  budget: number | null;
  weaponBudget: number | null;
  armorCost: number;
  excludedCount: number;
  excludedCategoriesCount: number;
  onSpin: () => void;
  onSpinComplete: () => void;
  compact?: boolean;
}

export function SpinPanel({
  filteredWeapons,
  winner,
  spinning,
  spinId,
  filterKey,
  canSpin,
  budget,
  weaponBudget,
  armorCost,
  excludedCount,
  excludedCategoriesCount,
  onSpin,
  onSpinComplete,
  compact = false,
}: SpinPanelProps) {
  const tSlot = useTranslations("slot");
  const tSpin = useTranslations("spin");

  return (
    <div
      className={[
        "rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm",
        compact ? "p-4" : "p-5 shadow-[0_0_40px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      {!compact && (
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          {tSlot("title")}
        </p>
      )}

      <SlotMachine
        weapons={filteredWeapons}
        winner={winner}
        spinning={spinning}
        spinId={spinId}
        filterKey={filterKey}
        onSpinComplete={onSpinComplete}
      />

      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/50 px-3 py-2 text-center text-sm text-slate-400">
        {tSpin("inPool")}{" "}
        <span className="font-semibold text-white">{filteredWeapons.length}</span>
        {budget !== null && (
          <>
            {" · "}
            <span className="font-mono text-amber-300">
              {formatPrice(weaponBudget ?? 0)} {tSpin("forWeapons")}
            </span>
            {armorCost > 0 && (
              <span className="text-slate-500">
                {" "}
                {tSpin("fromBudget", {
                  budget: formatPrice(budget),
                  armor: formatPrice(armorCost),
                })}
              </span>
            )}
          </>
        )}
        {excludedCount > 0 && (
          <>
            {" · "}
            <span className="text-red-300">
              {tSpin("excludedWeapons", { count: excludedCount })}
            </span>
          </>
        )}
        {excludedCategoriesCount > 0 && (
          <>
            {" · "}
            <span className="text-red-300">
              {tSpin("excludedCategories", { count: excludedCategoriesCount })}
            </span>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={onSpin}
        disabled={!canSpin}
        className={[
          "mt-4 w-full rounded-xl px-6 py-4 text-lg font-bold uppercase tracking-[0.2em] transition-all",
          "border-2 border-amber-500 bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950",
          "shadow-[0_8px_30px_rgba(240,165,0,0.35)] hover:brightness-110 active:scale-[0.98]",
          "disabled:cursor-not-allowed disabled:border-slate-700 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 disabled:shadow-none",
        ].join(" ")}
      >
        {spinning ? tSpin("spinning") : tSpin("spin")}
      </button>

      {!canSpin && filteredWeapons.length === 0 && (
        <p className="mt-3 text-center text-sm text-red-400">{tSpin("emptyPool")}</p>
      )}
    </div>
  );
}
