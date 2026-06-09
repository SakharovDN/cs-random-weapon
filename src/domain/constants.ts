import type { ArmorDefinition, ArmorOption, WeaponCategory } from "./types";

export const WEAPON_CATEGORIES: WeaponCategory[] = [
  "pistol",
  "smg",
  "shotgun",
  "sniper",
  "rifle",
  "lmg",
];

export const ARMOR_OPTIONS: ArmorDefinition[] = [
  { value: "none", label: "No vest", price: 0, imagePath: null },
  {
    value: "kevlar",
    label: "Kevlar Vest",
    price: 650,
    imagePath: "/cs2/panorama/images/icons/equipment/kevlar.svg",
  },
  {
    value: "kevlar_helmet",
    label: "Kevlar Vest + Helmet",
    price: 1000,
    imagePath: "/cs2/panorama/images/icons/equipment/assaultsuit.svg",
  },
];

export const CS2_WEAPON_CDN = "https://cdn.cstrike.app";
export const CS2_ICONS_BASE_URL =
  "https://raw.githubusercontent.com/Juknum/counter-strike-icons/main";

export function getArmorDefinition(armor: ArmorOption): ArmorDefinition | undefined {
  return ARMOR_OPTIONS.find((option) => option.value === armor);
}
