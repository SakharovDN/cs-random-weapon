"use client";

import { useTranslations } from "next-intl";
import { useTeamFilterOptions } from "@/i18n";
import { WeaponExclusionPanel } from "@/features/exclusions/WeaponExclusionPanel";
import { BudgetArmorBlock } from "@/features/filters/BudgetArmorBlock";
import { CategoryFilterPanel } from "@/features/filters/CategoryFilterPanel";
import { FilterGroup } from "@/features/filters/FilterGroup";
import { SpinPanel } from "./SpinPanel";
import { useRandomizer } from "./useRandomizer";

export function WeaponRandomizer() {
  const randomizer = useRandomizer();
  const tFilters = useTranslations("filters");
  const tSpin = useTranslations("spin");
  const tSlot = useTranslations("slot");
  const teamOptions = useTeamFilterOptions();

  const spinPanelProps = {
    filteredWeapons: randomizer.filteredWeapons,
    winner: randomizer.winner,
    spinning: randomizer.spinning,
    spinId: randomizer.spinId,
    filterKey: randomizer.filterKey,
    canSpin: randomizer.canSpin,
    budget: randomizer.budget,
    weaponBudget: randomizer.weaponBudget,
    armorCost: randomizer.armorCost,
    excludedCount: randomizer.excludedIds.size,
    excludedCategoriesCount: randomizer.categoryFilters.excluded.size,
    onSpinComplete: randomizer.handleSpinComplete,
  };

  return (
    <>
      <div className="mb-6 lg:hidden">
        <SpinPanel {...spinPanelProps} onSpin={randomizer.handleSpin} compact />
      </div>

      <div className="grid items-start gap-6 pb-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 lg:pb-0 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 backdrop-blur-sm sm:p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-white">
              {tFilters("title")}
            </h2>

            <div className="grid gap-5">
              <FilterGroup
                label={tFilters("team")}
                options={teamOptions}
                value={randomizer.teamFilter}
                onChange={randomizer.setTeamFilter}
                disabled={randomizer.spinning}
              />
              <CategoryFilterPanel
                value={randomizer.categoryFilters}
                onChange={randomizer.setCategoryFilters}
                disabled={randomizer.spinning}
              />
            </div>

            <div className="mt-5">
              <BudgetArmorBlock
                budgetInput={randomizer.budgetInput}
                onBudgetChange={randomizer.setBudgetInput}
                budget={randomizer.budget}
                armor={randomizer.armor}
                onArmorChange={randomizer.setArmor}
                armorCost={randomizer.armorCost}
                disabled={randomizer.spinning}
              />
            </div>
          </section>

          <WeaponExclusionPanel
            excludedIds={randomizer.excludedIds}
            onToggle={randomizer.handleToggleExclusion}
            onClear={randomizer.handleClearExclusions}
            disabled={randomizer.spinning}
          />
        </div>

        <aside className="hidden self-stretch lg:block">
          <div className="sticky top-6">
            <SpinPanel {...spinPanelProps} onSpin={randomizer.handleSpin} />
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1 text-sm text-slate-400">
            {tSlot("weaponsInPool", { count: randomizer.filteredWeapons.length })}
            {randomizer.spinning && (
              <span className="ml-2 text-amber-400">· {tSpin("spinning")}</span>
            )}
          </div>
          <button
            type="button"
            onClick={randomizer.handleSpin}
            disabled={!randomizer.canSpin}
            className={[
              "shrink-0 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-[0.15em] transition-all",
              "border-2 border-amber-500 bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950",
              "disabled:cursor-not-allowed disabled:border-slate-700 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500",
            ].join(" ")}
          >
            {randomizer.spinning ? tSpin("spinningShort") : tSpin("spin")}
          </button>
        </div>
      </div>
    </>
  );
}
