import type { ArmorOption } from "@/domain";
import {
  CS2_ICONS_BASE_URL,
  CS2_WEAPON_CDN,
  buildWeaponImagePathMap,
  getArmorDefinition,
} from "@/domain";
import type { Weapon } from "@/domain";

const WEAPON_IMAGE_PATHS = buildWeaponImagePathMap();

export function getWeaponImageUrl(weapon: Pick<Weapon, "id">): string {
  const path = WEAPON_IMAGE_PATHS.get(weapon.id);
  if (!path) return "";
  return `${CS2_WEAPON_CDN}${path}`;
}

export function getArmorImageUrl(armor: ArmorOption): string | null {
  const definition = getArmorDefinition(armor);
  if (!definition?.imagePath) return null;
  return `${CS2_ICONS_BASE_URL}${definition.imagePath}`;
}
