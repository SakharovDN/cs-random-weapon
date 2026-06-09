import { getArmorDefinition } from "./constants";
import type { ArmorOption } from "./types";

export function parseBudgetInput(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === "") return null;

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed < 0) return null;

  return Math.floor(parsed);
}

export function getArmorPrice(armor: ArmorOption): number {
  return getArmorDefinition(armor)?.price ?? 0;
}

export function getWeaponBudget(
  budget: number | null,
  armorCost: number
): number | null {
  if (budget === null) return null;
  return Math.max(0, budget - armorCost);
}

export function getEffectiveArmorCost(
  budget: number | null,
  armor: ArmorOption
): number {
  if (budget === null) return 0;
  return getArmorPrice(armor);
}
