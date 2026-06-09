"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  filterWeapons,
  getEffectiveArmorCost,
  getWeaponBudget,
  parseBudgetInput,
  spinWeapon,
  type ArmorOption,
  type TeamFilter,
  type Weapon,
} from "@/domain";
import type { CategoryFilterState } from "@/features/filters/categoryFilters";
import {
  buildFilterSummary,
  trackFilterChange,
  trackSpin,
  trackSpinBlocked,
  trackSpinComplete,
  trackWeaponExcluded,
} from "@/lib/analytics";
import { buildFilterKey } from "./filterKey";
import {
  INITIAL_RANDOMIZER_SETTINGS,
  loadRandomizerSettings,
  saveRandomizerSettings,
} from "./settings";

const SAVE_DEBOUNCE_MS = 400;

export function useRandomizer() {
  const [teamFilter, setTeamFilter] = useState<TeamFilter>(
    INITIAL_RANDOMIZER_SETTINGS.teamFilter
  );
  const [categoryFilters, setCategoryFilters] = useState<CategoryFilterState>(
    INITIAL_RANDOMIZER_SETTINGS.categoryFilters
  );
  const [budgetInput, setBudgetInput] = useState(
    INITIAL_RANDOMIZER_SETTINGS.budgetInput
  );
  const [armor, setArmor] = useState<ArmorOption>(INITIAL_RANDOMIZER_SETTINGS.armor);
  const [excludedIds, setExcludedIds] = useState<Set<string>>(
    INITIAL_RANDOMIZER_SETTINGS.excludedIds
  );
  const [spinning, setSpinning] = useState(false);
  const [spinId, setSpinId] = useState(0);
  const [winner, setWinner] = useState<Weapon | null>(null);
  const [settingsReady, setSettingsReady] = useState(false);

  const skipNextSaveRef = useRef(true);

  useEffect(() => {
    const saved = loadRandomizerSettings();
    if (saved) {
      setTeamFilter(saved.teamFilter);
      setCategoryFilters(saved.categoryFilters);
      setBudgetInput(saved.budgetInput);
      setArmor(saved.armor);
      setExcludedIds(saved.excludedIds);
    }

    setSettingsReady(true);
  }, []);

  useEffect(() => {
    if (!settingsReady) return;

    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    const timer = window.setTimeout(() => {
      saveRandomizerSettings({
        teamFilter,
        categoryFilters,
        budgetInput,
        armor,
        excludedIds,
      });
    }, SAVE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [
    settingsReady,
    teamFilter,
    categoryFilters,
    budgetInput,
    armor,
    excludedIds,
  ]);

  const budget = useMemo(() => parseBudgetInput(budgetInput), [budgetInput]);
  const armorCost = getEffectiveArmorCost(budget, armor);
  const weaponBudget = getWeaponBudget(budget, armorCost);

  const filteredWeapons = useMemo(
    () =>
      filterWeapons({
        teamFilter,
        categoryFilters,
        budget,
        armorCost,
        excludedIds,
      }),
    [teamFilter, categoryFilters, budget, armorCost, excludedIds]
  );

  const filterKey = useMemo(
    () =>
      buildFilterKey({
        teamFilter,
        categoryFilters,
        budget,
        armor,
        excludedIds,
        filteredWeapons,
      }),
    [teamFilter, categoryFilters, budget, armor, excludedIds, filteredWeapons]
  );

  useEffect(() => {
    setWinner(null);
    setSpinning(false);
  }, [filterKey]);

  useEffect(() => {
    if (!settingsReady) return;

    const summary = buildFilterSummary({
      teamFilter,
      filteredWeapons,
      budget,
      armor,
      excludedIds,
      categoryFilters,
    });

    trackFilterChange(summary);

    if (summary.poolSize === 0) {
      trackSpinBlocked(summary, "empty_pool");
    }
  }, [settingsReady, filterKey, teamFilter, filteredWeapons, budget, armor, excludedIds, categoryFilters]);

  const canSpin = filteredWeapons.length > 0 && !spinning;

  function getSummary() {
    return buildFilterSummary({
      teamFilter,
      filteredWeapons,
      budget,
      armor,
      excludedIds,
      categoryFilters,
    });
  }

  function handleSpin() {
    const summary = getSummary();

    if (!canSpin) {
      trackSpinBlocked(summary, summary.poolSize === 0 ? "empty_pool" : "spinning");
      return;
    }

    const result = spinWeapon(filteredWeapons);
    if (!result) return;

    trackSpin(summary);
    setWinner(result);
    setSpinId((id) => id + 1);
    setSpinning(true);
  }

  function handleToggleExclusion(weaponId: string) {
    setExcludedIds((current) => {
      const next = new Set(current);
      const wasExcluded = next.has(weaponId);

      if (wasExcluded) {
        next.delete(weaponId);
      } else {
        next.add(weaponId);
      }

      trackWeaponExcluded({
        weaponId,
        excludedCount: next.size,
        action: wasExcluded ? "include" : "exclude",
      });

      return next;
    });
  }

  function handleClearExclusions() {
    setExcludedIds(new Set());
  }

  return {
    teamFilter,
    setTeamFilter,
    categoryFilters,
    setCategoryFilters,
    budgetInput,
    setBudgetInput,
    armor,
    setArmor,
    spinning,
    spinId,
    winner,
    excludedIds,
    budget,
    armorCost,
    weaponBudget,
    filteredWeapons,
    filterKey,
    canSpin,
    handleSpin,
    handleToggleExclusion,
    handleClearExclusions,
    handleSpinComplete: () => {
      setSpinning(false);
      if (winner) {
        trackSpinComplete(getSummary(), winner);
      }
    },
  };
}
