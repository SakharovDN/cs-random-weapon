export type Team = "ct" | "t" | "both";

export type WeaponCategory =
  | "pistol"
  | "smg"
  | "shotgun"
  | "sniper"
  | "rifle"
  | "lmg";

export type TeamSide = "ct" | "t";

export type TeamFilter = "all" | "ct" | "t";

export type ArmorOption = "none" | "kevlar" | "kevlar_helmet";

export type CategoryFilter = "all" | WeaponCategory;

export interface CategoryFilters {
  included: ReadonlySet<WeaponCategory>;
  excluded: ReadonlySet<WeaponCategory>;
}

export interface WeaponVariant {
  id: string;
  name: string;
  imagePath: string;
}

export interface Weapon {
  id: string;
  name: string;
  team: Team;
  category: WeaponCategory;
  price: number;
  imagePath: string;
  variants?: WeaponVariant[];
  poolId?: string;
}

export interface ArmorDefinition {
  value: ArmorOption;
  label: string;
  price: number;
  imagePath: string | null;
}
