import type { Weapon } from "./types";

export function pickRandomWeapon(weapons: Weapon[]): Weapon | null {
  if (weapons.length === 0) return null;
  return weapons[Math.floor(Math.random() * weapons.length)];
}

export function resolveWeaponVariant(weapon: Weapon): Weapon {
  if (!weapon.variants?.length) return weapon;

  const variant = weapon.variants[Math.floor(Math.random() * weapon.variants.length)];

  return {
    ...weapon,
    id: variant.id,
    name: variant.name,
    imagePath: variant.imagePath,
    poolId: weapon.id,
    variants: undefined,
  };
}

export function spinWeapon(pool: Weapon[]): Weapon | null {
  const picked = pickRandomWeapon(pool);
  if (!picked) return null;
  return resolveWeaponVariant(picked);
}
