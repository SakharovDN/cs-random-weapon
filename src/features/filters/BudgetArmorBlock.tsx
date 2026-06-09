"use client";

import { formatPrice, getWeaponBudget, type ArmorOption } from "@/domain";
import { useTranslations } from "next-intl";
import { ArmorSelector } from "./ArmorSelector";

interface BudgetArmorBlockProps {
  budgetInput: string;
  onBudgetChange: (value: string) => void;
  budget: number | null;
  armor: ArmorOption;
  onArmorChange: (value: ArmorOption) => void;
  armorCost: number;
  disabled?: boolean;
}

export function BudgetArmorBlock({
  budgetInput,
  onBudgetChange,
  budget,
  armor,
  onArmorChange,
  armorCost,
  disabled = false,
}: BudgetArmorBlockProps) {
  const t = useTranslations("filters");
  const budgetActive = budget !== null;
  const weaponBudget = getWeaponBudget(budget, armorCost);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {t("roundBudget")}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span className="font-mono text-lg text-amber-400">$</span>
        <input
          id="budget"
          type="number"
          min={0}
          step={50}
          placeholder="3000"
          value={budgetInput}
          disabled={disabled}
          onChange={(event) => onBudgetChange(event.target.value)}
          className="w-full max-w-xs rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 font-mono text-white outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 disabled:opacity-50"
        />
      </div>

      <div
        className={[
          "budget-armor-panel",
          budgetActive ? "budget-armor-panel-open" : "",
        ].join(" ")}
        aria-hidden={!budgetActive}
      >
        <div className="budget-armor-panel-inner">
          <div className="border-t border-slate-800 pt-4">
            <ArmorSelector
              value={armor}
              onChange={onArmorChange}
              disabled={disabled}
              compact
            />

            {armorCost > 0 && weaponBudget !== null && (
              <p className="mt-3 text-sm text-slate-500">
                {t("leftForWeapons", {
                  amount: formatPrice(weaponBudget),
                })}{" "}
                <span className="text-slate-600">
                  {t("armorCost", { amount: formatPrice(armorCost) })}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
